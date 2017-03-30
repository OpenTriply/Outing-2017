# Outing 2017

## Data

De volgende data hebben we over de kielokalen:

```
kieslokaal
  geo:hasGeometry/geo:asWKT
  pdok:naamStemlokaal NAAMPJE
  schema:addressLocality ex:Municipality
  schema:postalCode ####XX
  schema:streetAddress STREET [NUMBER] [TOEVOEGING]
```

## TODO

  1. welke verkiezingen?  Wouter vindt uit over welke verkiezingen we
     het hebben.

  2. story?  Welk verhaal willen we vertellen?  Overleg nadat we de
     verkiezingen weten (punt 1).

  3. Verkiezingsdata van long/lat naar WKT:
  
     ```
     KIESLOKAAL geo:hasGeometry/geo:asWKT "Point (XXX YYY)"^^ geo:wktLiteral
     ```
     
  4. Link kieslokalen met hun gemeente o.p.v. WKT punt.


  5. Link CBS aan BAG (op gemeente niveau).  Hierdoor hebben we de
     statistieken.

  6. Uitslagen van de verkizingen.  Hangt af van welke verkiezingen (punt 1).
