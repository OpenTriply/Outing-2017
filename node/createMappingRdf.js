
const request = require('superagent');
const _ = require('lodash')
const fs = require('fs-promise')

const content = fs.readFileSync('mappings', 'utf8');
const rdf = content.split('\n').map(line => {
  const [polling, bag] = line.split('\t');
  if (polling && bag && bag !== 'null') {
    return `<${polling}> <https://triply.cc/vocab/bagMunicipality> <${bag}>.`
  }
})
fs.writeFileSync('mapping.nt', rdf.join('\n'))
