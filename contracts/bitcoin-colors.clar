(impl-trait .nft-trait.nft-trait)
(use-trait commission-trait .commission-trait.commission)

(define-non-fungible-token bitcoin-colors uint)

;; Storage
(define-map token-count principal uint)
(define-map market uint {price: uint, commission: principal})
(define-map mint-address bool principal)
(define-map owners uint  {hash-bytes: (buff 32), version: (buff 1) } )

;; Variables
(define-data-var last-id uint u0)
(define-data-var contract-uri (string-ascii 80) "")
(define-data-var base-uri (string-ascii 80) "")
(define-data-var seeds uint {hashbytes: (buff 32), version: (buff 1)})
(define-data-var escrow principal tx-sender)

;; Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant MINT_PRICE 1000)

;; Errors
(define-constant ERR-FORBIDDEN (err u403))
(define-constant ERR-NOT-FOUND (err u404))
(define-constant ERR-LISTING (err u500))
(define-constant ERR-NO-OWNER (err u502))

(define-public (mint-btc (block { header: (buff 80), height: uint })
                      (proof { tx-index: uint, hashes: (list 12 (buff 32)), tree-depth: uint })
                      (mint-btc-tx {some-data: uint})
                      (recipient-btc {hashbytes: (buff 32), version: (buff 1)}))
    (begin
        (asserts! (was-minted mint-btc-tx) err-invalid-btc-tx)
        (asserts! (is-eq (get-recipient mint-btc-tx) recipient-btc) err-not-authorized)
        (asserts! (is-eq (get-mint-price mint-btc-tx) MINT_PRICE) err-not-authorized)
        (map-insert owners id recipient)
        (mint-many (var-get escrow (list recipient-btc)))))

(define-read-only (get-balance (account principal))
    (default-to u0
        (map-get? token-count account)))

;; SIP009: Get the owner of the specified token ID
(define-read-only (get-owner (id uint))
    (ok (nft-get-owner? bitcoin-colors id)))

(define-public (get-owner-2 (id uint))
  (let ((stx-owner (unwrap! (nft-get-owner? bitcoin-colors id) err-not-found)))
    (if (is-eq (var-get escrow) stx-owner)
        ;; if in escrow get real owner from map
        (merge {chain: "btc", name: none} (map-get? owners id))
        (merge {chain: "stx"} (principal-destruct? stx-owner)))))

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
    (ok (var-get last-id)))

;; SIP009: Get the token URI
(define-read-only (get-token-uri (id uint))
    (ok (some (var-get base-uri))))

(define-read-only (get-contract-uri)
    (ok (var-get contract-uri)))

(define-read-only (get-listing-in-ustx (id uint))
    (map-get? market id))

(define-private (trnsfr (id uint) (sender principal) (recipient principal))
    (begin
        (try! (nft-transfer? bitcoin-colors id sender recipient))
        (map-set token-count sender (- (get-balance sender) u1))
        (map-set token-count recipient (+ (get-balance recipient) u1))
        (ok true)))

(define-read-only (is-sender-owner (id uint))
    (match (nft-get-owner? bitcoin-colors id) owner
        (or (is-eq tx-sender owner) (is-eq contract-caller owner))
        false))

;; SIP009: Transfer token to a specified principal
(define-public (transfer (id uint) (sender principal) (recipient principal))
    (begin
        ;; Only the owner of the token can transfer it
        (asserts! (is-sender-owner id) ERR-NOT-AUTHORIZED)
        (asserts! (is-none (map-get? market id)) ERR-LISTING)
        (trnsfr id sender recipient)))

(define-public (list-in-ustx (id uint) (price uint) (comm <commission-trait>))
    (begin
        (asserts! (is-sender-owner id) ERR-NOT-AUTHORIZED)
        (map-set market id {price: price, commission: (contract-of comm)})
        (print {price: price, commission: comm, action: "list-in-ustx", id: id})
        (ok true)))

(define-public (unlist-in-ustx (id uint))
    (begin
        (asserts! (is-sender-owner id) ERR-NOT-AUTHORIZED)
        (map-delete market id)
        (print {action: "unlist-in-ustx", id: id})
        (ok true)))

(define-public (buy-in-ustx (id uint) (comm <commission-trait>))
    (let ((owner (unwrap! (nft-get-owner? bitcoin-colors id) ERR-NOT-FOUND))
        (listing (unwrap! (map-get? market id) ERR-LISTING))
        (price (get price listing)))
    (asserts! (is-eq (contract-of comm) (get commission listing)) ERR-WRONG-COMMISSION)
    (try! (stx-transfer? price tx-sender owner))
    (try! (contract-call? comm pay id price))
    (try! (trnsfr id owner tx-sender))
    (map-delete market id)
    (print {action: "buy-in-ustx", id: id})
    (ok true)))

(define-public (set-base-uri (new-base-uri (string-ascii 80)))
    (if (is-eq tx-sender CONTRACT-OWNER)
        (ok (var-set base-uri new-base-uri))
        ERR-NOT-AUTHORIZED))

(define-public (set-contract-uri (new-contract-uri (string-ascii 80)))
    (if (is-eq tx-sender CONTRACT-OWNER)
        (ok (var-set contract-uri new-contract-uri))
        ERR-NOT-AUTHORIZED))

(define-data-var ctx-new-owner principal tx-sender)

(define-private (mint-many (new-owner principal)
                           (orders (list 50 {hashbytes: (buff 32), version: (buff 1)})))
    (let
        (
            (next-nft-id (+ u1 (var-get last-id)))
            (current-balance (get-balance new-owner))
        )
        (var-set ctx-new-owner new-owner)
        (let ((id-reached (fold mint-many-iter orders next-nft-id)))
            (var-set last-id (- id-reached u1))
            (map-set token-count new-owner (+ current-balance (- id-reached next-nft-id)))
            (ok id-reached))))

(define-private (mint-many-iter (new-owner principal) (next-id uint))
    (begin
        ;; colors must be unique
        (asserts! (map-insert seed (to-hash recipient-btc)) next-id)
        (unwrap! (nft-mint? bitcoin-colors next-id (var-get ctx-new-owner)) next-id)
        (+ next-id u1)
    ))

(define-public (transfer-btc-btc (id uint)
                (sender {hashbytes: (buff 32), version: (buff 1)})
                (recipient {hashbytes: (buff 32), version: (buff 1)})
                (transfer-btc-tx {some-data: uint}))
  (begin
    (asserts! (was-minted transfer-btc-tx) err-invalid-btc-tx)
    (asserts! (is-eq (get-sender transfer-btc-tx) sender) err-not-authorized)
    (asserts! (is-eq (get-recipient transfer-btc-tx) recipient) err-not-authorized)
    (asserts! (is-eq (get-id transfer-btc-tx) id) err-not-authorized)
    ;; some asset transfers for post conditions
    (try! (nft-transfer? bitcoin-colors id escrow-contract tx-sender))
    (try! (nft-transfer? bitcoin-colors id tx-sender escrow-contract))
    (map-set owners id recipient)))

(define-public (transfer-stx-btc (id uint) (sender principal) (recipient {hashbytes: (buff 32), version: (buff 1)}))
  ;; TODO
)

(define-public (transfer-btc-stx (id uint) (sender {hashbytes: (buff 32), version: (buff 1)}) (recipient principal) (transfer-btc-tx {some-data: unit}))
  ;; TODO
)