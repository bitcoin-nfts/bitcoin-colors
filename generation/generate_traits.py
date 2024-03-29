from bitcoinaddress import Wallet
import hashlib
import json
import pandas as pd
import sys
from tqdm import tqdm

'''
Script usage summary:

python generate_traits.py test
  - Returns a test using 8,000 Bitcoin addresses of
      different types to ensure that distributions of
      traits match the provided specification.

python generate_traits.py [string]
  - Returns JSON of attributes from hash of string
      (further details on generation process below)
'''

class TraitGenerator():
  '''
  __init__(self, trait_specification)
  ===================================
  Before running the trait generation, we must specify a trait specification,
  which specifies the trait types and values that we expect to generate.

  This should be an object which looks like, for example:
  { "specification":
    [ { "trait_type": "Eyes", "value": "Laser Eyes", "weight": 0.01 },
      { "trait_type": "Eyes", "value": "Normal Eyes", "weight": 0.79 },
      { "trait_type": "Eyes", "value": "Glasses", "weight": 0.20 },
      { "trait_type": "Shirt Color", "value": "Red", "weight": 0.30 },
      { "trait_type": "Shirt Color", "value": "Green", "weight": 0.40 },
      { "trait_type": "Shirt Color", "value": "Blue", "weight": 0.30 } ]
  }

  The final output of the generation, for a single address, will be something like: 
  [ { "trait_type": "Eyes", "value": "Laser Eyes" },
    { "trait_type": "Shirt Color", "value": "Blue" } ]
  
  Lower weights will be generated less frequently, in proportion to their value relative to
  the other weights in the same trait_type. For example, laser eyes is expected to appear in 
  1% of the samples, and a red shirt color in 30% of the samples.

  You can also add exclusions to the traits, to prevent one trait from being added to another.
  Note this WILL affect the distributions of the outputs and may cause them to be shifted from
  the intended specification.
    { "trait_type": "Eyes", "value": "Glasses", "weight": 0.20,
      "exclusions": { "trait_type": "Q2 Background", "value": "Orange" } },

  If you want to be explicit about how many characters correspond to which traits, these can be
  explicitly specified in the definition.
    { "character_allocation": { "Q1 Background": 4, "Q2 Background": 4,
                                "Q3 Background": 4, "Q4 Background": 4 },
    "specification": [ ... ] }
  '''
  def __init__(self, trait_specification, verbose=True):
    self.trait_specification = pd.DataFrame(trait_specification['specification'])
    self.preprocess_exclusions()
    
    self.character_allocation = trait_specification.get('character_allocation') 
    self.verbose = verbose

  def preprocess_exclusions(self):
    for i, s in self.trait_specification.iterrows():
      reverse = { 'trait_type': s['trait_type'], 'value': s['value'] }
      if type(s['exclusions']) is list:
        for e in s['exclusions']:
          for j, t in self.trait_specification.iterrows():
            if (e['trait_type'] == t['trait_type'] and e['value'] == t['value']):
              if type(t['exclusions']) is not list:
                self.trait_specification.at[j, 'exclusions'] = [reverse]
              elif reverse not in t['exclusions']:
                self.traits_specification.at[j, 'exclusions'] = self.trait_specification.at[j, 'exclusions'] + [reverse]

  '''
  generate_traits(addr)
  =================
  This function accepts a string of variable length, and selects traits
  deterministically based on the hash of that string and the trait specification
  provided in the initalizer.

  input: raw_addr [bytearray]
  output: list<dict<str, str>>
  '''
  def generate(self, raw_addr):
    addr = self.hash_address(raw_addr)
    if self.verbose:
      print('-------------------------')
      print(f'Address: {raw_addr}')
      print(f'Address hash: {addr.hex()}')

    df = self.trait_specification
    traits = sorted(df['trait_type'].unique())

    # naively spilt the string length by the number of traits 
    if self.character_allocation:
      chunk_lengths = []
      for trait in traits:
        chunk_lengths.append(self.character_allocation[trait])
    else:
      chunk_lengths = [len(addr) // len(traits) for _ in range(len(traits))]

    if sum(chunk_lengths) > len(raw_addr):
      raise ValueError(f'Input string is too short; needs at least {sum(chunk_lengths)} characters')

    # convert string into array of "probabilities"
    ps = []
    curr = 0
    for trait, chunk_size in zip(traits, chunk_lengths):
      ss = addr[curr : curr + chunk_size]
      p = self.get_probability(ss)
      if p is None: 
        return
      if self.verbose:
        print(f'Substring {i}: {ss.hex()} - {p}')
      curr += chunk_size
      ps.append(p)

    result = []
    exclusions = []
    for i, trait in enumerate(traits):
      if self.verbose:
        print(f'\nWorking on trait: {trait}')
      matching = df[df['trait_type'] == trait].sort_values(by='value')

      # Remove exclusions
      relevant_exclusions = set([d['value'] for d in exclusions if d['trait_type'] == trait])
      matching = matching[~matching['value'].isin(relevant_exclusions)]

      matching['normalized'] = matching['weight'] / matching['weight'].sum()
      rolling_sum = 0.0
      for j, row in matching.iterrows():
        rolling_sum += row.weight
        if rolling_sum > ps[i]:
          if self.verbose:
            print(f'\tSelected trait value {row.value} with sum {rolling_sum:.2f}, exceeding threshold {ps[i]:.2f}')
          result.append({
            'trait_type': row.trait_type,
            'value': row.value
          })
          if type(row.exclusions) is list:
            exclusions += row.exclusions
          break
    return result

  '''
  get_probabilty(s)
  =================
  This function accepts a bytearray of variable length, and calculates
  a "weight" of that bytearray, which is used to deterministically select
  a trait to use.

  Under the universal hashing assumption, these values should be uniformly
  distributed from 0.0 to 1.0.

  input: s [bytearray]
  output: int | None
  '''
  def get_probability(self, s):
    return int.from_bytes(s, 'big') / 2 ** (len(s) * 8)

  '''
  hash_address(self, addr)
  ========================
  Generates the SHA1 hash for addr

  input: addr [str]
  output: bytes
  '''
  def hash_address(self, addr):
    H = hashlib.sha512(bytes(addr, 'UTF-8'))
    return H.digest()

def flatten(s):
   return [item for sublist in s for item in sublist]

def test(gen):
  # Generate 8,000 Bitcoin addresses
  #   Use 2,000 P2PKH Legacy addresses (e.g., 1Bu6YxH64nfvhdDsYNEP8PftoBMqgusdPS)
  #   Use 2,000 P2SH-P2WSH Wrapped Segwit addresses (e.g., 3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy)
  #   Use 2,000 P2WSH Native Segwit addresses (e.g., bc1qdveuf0egtfdnd2fnsp0lzfukn2e58czf8323ky6xt8ydew4ecfcqv3ettx)
  #   Use 2,000 P2WPKH Native Segwit addresses (e.g., bc1q2jxe5azr6zmhk3258av7ul6cqtu4eu4mps8f4p)
  gen.verbose = False
  ws = [Wallet() for _ in tqdm(list(range(2000)))]
  p2pkh_addr = [w.address.mainnet.pubaddr1 for w in ws]
  p2sh_p2wsh_addr = [w.address.mainnet.pubaddr3 for w in ws]
  p2wsh_addr = [w.address.mainnet.pubaddrbc1_P2WPKH for w in ws]
  p2wpkh_addr = [w.address.mainnet.pubaddrbc1_P2WSH for w in ws]
  g1 = [gen.generate(a) for a in tqdm(p2pkh_addr)]
  g2 = [gen.generate(a) for a in tqdm(p2sh_p2wsh_addr)]
  g3 = [gen.generate(a) for a in tqdm(p2wsh_addr)]
  g4 = [gen.generate(a) for a in tqdm(p2wpkh_addr)]
  g = flatten(g1 + g2 + g3 + g4)

  df = pd.DataFrame(g)
  s_df = gen.trait_specification

  results = []
  traits = sorted(df['trait_type'].unique())
  for t in traits:
    matching = df[df['trait_type'] == t]
    matching_spec = s_df[s_df['trait_type'] == t]

    value_counts = matching.groupby('value').count()
    value_p = value_counts / value_counts.sum()

    spec_value_counts = matching_spec.groupby('value').count()
    spec_value_p = spec_value_counts / spec_value_counts.sum()

    for i, row in matching_spec.iterrows():
      try:
        actual_p = value_p.loc[row.value][0]
      except Exception as e:
        actual_p = 0.0
      results.append({
        'trait_type': row.trait_type,
        'value': row.value,
        'expected': row.weight,
        'actual': actual_p,
      })
  print(pd.DataFrame(results).sort_values('trait_type'))
      
def main():
  spec = json.loads(open('trait_specification.json').read())
  gen = TraitGenerator(spec, verbose=False)
  if sys.argv[1] == 'test':
    test(gen)
  else:
    print(json.dumps(gen.generate(sys.argv[1]), indent=2))
      
if __name__ == '__main__':
  main()
