# Outing 2017

## Example: Amsterdam

CBS code: 0363

BAG code: 3594

BAG code (veroudert): 1024

## Article

Setting the scene: Your municipality.  Low turnout rate.
Problem: the government wants to manipulate elections by disincentivising people to vote in certain districts
Development
Solution
Glance at the future

### What messages would you like to convey?

The availability of voting locations impacts voter turnout.

### What is it newsworthy?

Dutch municipalities receive a subsidy to organize elections.  Some
municipalities choose to open fewer voting locations.

### Who are you writing for?

The general public with voting rights.

  1. Did vote.
  2. Did not vote: “Why you didn't vote”

### How knowldedgeable is your audience?

Knows what voting is.  Probably old enough to be eligible for voting
themselves.

## Data

### Kieslokalen

Mogelijke bron: [link](http://data.openstate.eu/dataset/locaties-stembureaus)

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
