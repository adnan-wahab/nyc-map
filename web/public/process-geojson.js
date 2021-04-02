const fs = require('fs')
const h3 = require('geojson2h3')
const neigh = JSON.parse(fs.readFileSync('./neigh.geojson.json'))

const result = []

setInterval( () => {
  if (! neigh.length) {
    console.log('done')
    return fs.writeFileSync('wow', JSON.stringify(result))
  }

  let feat = neigh.pop()
  feat.type = 'Feature'
  console.log(result.length)
  result.push(
    h3.featureToH3Set(feat, 10)
  )

}, 1000)