const fs = require('fs');

const csv = fs.readFileSync('../data/bag_cbs.csv', 'utf8').split('\n');
csv.shift();//remove header
const fw = fs.createWriteStream('../data/bag_cbs.nt');
csv.forEach(row => {
  const [bag,cbs] = row.split(',');
  if (bag && cbs) {
    fw.write(`<http://bag.basisregistraties.overheid.nl/bag/id/woonplaats/${bag.trim()}> <http://www.w3.org/2002/07/owl#sameAs> <https://cbs.nl/id/gemeente/GM${cbs.trim()}> .\n`);
  }
})
