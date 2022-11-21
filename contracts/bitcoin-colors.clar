(impl-trait .nft-trait.nft-trait)
(use-trait commission-trait .commission-trait.commission)

(define-non-fungible-token bitcoin-colors uint)

;; Storage
(define-map token-count principal uint)
(define-map market uint {price: uint, commission: principal})
(define-map mint-address bool principal)

;; Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant MAX-SUPPLY u1000000)
(define-constant WALLET 'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S)

;; Errors
(define-constant ERR-SOLD-OUT (err u300))
(define-constant ERR-WRONG-COMMISSION (err u301))
(define-constant ERR-NOT-AUTHORIZED (err u401))
(define-constant ERR-NOT-FOUND (err u404))
(define-constant ERR-LISTING (err u405))
(define-constant ERR-MINT-FROZEN (err u406))
(define-constant ERR-NO-OWNER (err u407))

;; Variables
(define-data-var last-id uint u0)
(define-data-var contract-uri (string-ascii 80) "")
(define-data-var base-uri (string-ascii 80) "")

(define-public (claim (block { header: (buff 80), height: uint })
                      (proof { tx-index: uint, hashes: (list 12 (buff 32)), tree-depth: uint })
                      (recipient principal))
  (mint-many recipient (list recipient))
)

(define-read-only (get-balance (account principal))
    (default-to u0
        (map-get? token-count account)))

;; SIP009: Get the owner of the specified token ID
(define-read-only (get-owner (id uint))
    (ok (nft-get-owner? bitcoin-colors id)))

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

(define-private (mint-many (new-owner principal) (orders (list 50 principal)))
    (let
        (
            (next-nft-id (+ u1 (var-get last-id)))
            (enabled (asserts! (< (var-get last-id) MAX-SUPPLY) ERR-SOLD-OUT))
            (id-reached (fold mint-many-iter orders next-nft-id))
            (payment (* u50000000 (- id-reached next-nft-id)))
            (current-balance (get-balance new-owner))
        )
        (begin
            (var-set last-id (- id-reached u1))
            (map-set token-count new-owner (+ current-balance (- id-reached next-nft-id)))
            (try! (stx-transfer? payment new-owner WALLET))
        )
        (ok id-reached)))

(define-private (mint-many-iter (new-owner principal) (next-id uint))
    (if (or (is-eq MAX-SUPPLY u0) (<= next-id MAX-SUPPLY))
        (begin
            (unwrap! (nft-mint? bitcoin-colors next-id new-owner) next-id)
            (+ next-id u1)
        )
        next-id))
