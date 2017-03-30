const PDOK = 'https://data.pdok.nl/sparql'
const VIRTUOSO = 'https://virtuoso.lod.labs.vu.nl/sparql'

const request = require('superagent');
const _ = require('lodash')
const fs = require('fs-promise')
function getPollingStations() {
  return request.post(VIRTUOSO)
    .type('form')
    .set('Accept', 'application/sparql-results+json')
    .send({
      query: `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX geo: <http://www.opengis.net/ont/geosparql#>
      prefix bag: <http://bag.basisregistraties.overheid.nl/def/bag#>
      PREFIX geof: <http://www.opengis.net/def/function/geosparql/>
      SELECT DISTINCT * WHERE {

        ?x a <http://data.pdok.nl/linkhub/def#Stembureau> ;
        	geo:hasGeometry/geo:asWkt ?wkt .
      }

      `
    }).then(result => {
      return result.body.results.bindings.map(binding => {
        return {
          pollingStation: binding.x.value,
          wkt: binding.wkt.value
        }
      })
      // console.log(result.body)
    })
}
function getBagMunicipalityCode(pollingStation, forWkt) {
  return request.post(PDOK)
    .type('form')
    .set('Accept', 'application/sparql-results+json')
    .send({
      query: `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX geo: <http://www.opengis.net/ont/geosparql#>
        prefix bag: <http://bag.basisregistraties.overheid.nl/def/bag#>
        PREFIX geof: <http://www.opengis.net/def/function/geosparql/>
        SELECT DISTINCT ?woonplaats WHERE {
          BIND(strdt("${forWkt}", <http://www.opengis.net/ont/geosparql#wktLiteral>) as ?wkt)
             ?woonplaats geo:hasGeometry/geo:asWKT ?woonplaatsShape ;
                                       bag:naamWoonplaats ?woonplaatsNaam .
          FILTER NOT EXISTS {?woonplaats bag:status <http://bag.basisregistraties.overheid.nl/id/begrip/WoonplaatsIngetrokken>}
          FILTER (geof:sfContains( ?woonplaatsShape,?wkt))
        }
        LIMIT 10
      `
    }).then(result => {
      const bindings = result.body.results.bindings;
      if (bindings.length === 0) {
        console.warn('No BAG match found for', pollingStation)
        return null
      } else if (bindings.length > 1) {
        console.warn('More than 1 BAG match found for', pollingStation)
        return null;
      } else {
        return bindings[0].woonplaats.value;

      }
    }, console.error)
}
const currentMappings = fs.readFileSync('mappings', 'utf8');
const writeStream = fs.createWriteStream('mappings', {flags:'a'})
async function run() {
  const pollingStations = await getPollingStations();
  var i = 0;
  var length = pollingStations.length;
  for (var station of pollingStations) {
    if (currentMappings.indexOf(station.pollingStation) >= 0) {
      i++;
      continue
    }
    process.stdout.write(`${i}/${length}\r`)
    const woonplaats = await getBagMunicipalityCode(station.pollingStation, station.wkt)
    writeStream.write(station.pollingStation + '\t' + woonplaats + '\n')
    i++;
  }
  console.log();
}

run();
