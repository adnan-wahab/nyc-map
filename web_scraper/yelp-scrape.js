'use strict'

var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');

const fs = require('fs')
const _ = require('lodash')

const yelp = require('yelp-fusion')
const yelpClient = yelp.client(
  'SYDWVw8rxlk-WMby8RVKDs33KsTTWqzXTiPhj7sVb4yKvGxmxyZglcNW4B7Go7IKVhl_67bCBfS38qk7WQSWmehDpmMXuvB2cZ1dejWGzRZ1LEpsOuZokxgLWAYfYHYx'
)

const zipCodes = [
  10001,
  10002,
  10003,
  10004,
  10005,
  10006,
  10007,
  10008,
  10009,
  10010,
  10011,
  10012,
  10013,
  10014,
  10016,
  10017,
  10018,
  10019,
  10020,
  10021,
  10022,
  10023,
  10024,
  10025,
  10026,
  10027,
  10028,
  10029,
  10030,
  10031,
  10032,
  10033,
  10034,
  10035,
  10036,
  10037,
  10038,
  10039,
  10040,
  10041,
  10043,
  10044,
  10045,
  10055,
  10060,
  10065,
  10069,
  10075,
  10080,
  10081,
  10087,
  10090,
  10101,
  10102,
  10103,
  10104,
  10105,
  10106,
  10107,
  10108,
  10109,
  10110,
  10111,
  10112,
  10113,
  10114,
  10115,
  10116,
  10117,
  10118,
  10119,
  10120,
  10121,
  10122,
  10123,
  10124,
  10125,
  10126,
  10128,
  10129,
  10130,
  10131,
  10132,
  10133,
  10138,
  10150,
  10151,
  10152,
  10153,
  10154,
  10155,
  10156,
  10157,
  10158,
  10159,
  10160,
  10161,
  10162,
  10163,
  10164,
  10165,
  10166,
  10167,
  10168,
  10169,
  10170,
  10171,
  10172,
  10173,
  10174,
  10175,
  10176,
  10177,
  10178,
  10179,
  10185,
  10199,
  10203,
  10211,
  10212,
  10213,
  10242,
  10249,
  10256,
  10258,
  10259,
  10260,
  10261,
  10265,
  10268,
  10269,
  10270,
  10271,
  10272,
  10273,
  10274,
  10275,
  10276,
  10277,
  10278,
  10279,
  10280,
  10281,
  10282,
  10285,
  10286
]

const blist = {}

const queue = []

const startSearch = (zip, index) => {
  setTimeout(() => {
    queue.push([zip, 0])
  }, index * 2000)
}

let count = 0

let totals = 0
const search = async (coords, offset) => {
  coords[0] = coords[0] ||  (40.9 - (Math.random() / 2))
  coords[1] = coords[1] || (-74 + (Math.random() / 3))
  const response = await yelpClient.search({
    latitude:  coords[0],
    longitude: coords[1],
    // radius: 400,
    limit:50,
    offset: offset * 50,
  })

  const total = response.jsonBody.total
  console.log(`coords ${coords},  total ${response.jsonBody.total}, found ${response.jsonBody.businesses.length}, offset:${offset}, scraped: ${Object.keys(db).length}`)
  totals += total
  //response.jsonBody.businesses.forEach((b) => (blist[b.id] = b))
  if(! response.jsonBody.businesses.length) return
  //const result = await db.collection('places').insertMany(response.jsonBody.businesses)
  response.jsonBody.businesses.forEach(b => db[b.id] = b)
  fs.writeFileSync('yelp.json', JSON.stringify(db, null,2))

  // .bulkWrite(response.jsonBody.businesses.map(b => {
  //   return {updateOne: {filter: b, update: b, upsert: true}}
  // }))
  //console.log(totals)
//filter
//id,name,imague_url,is_closed,url, review_count, categories:[], rating, coordinates,[], price
  if ((offset*50) < total && offset < 19) queue.push([coords, offset+1])
  // if (++count === zipCodes.length) {
  //   console.log('total businesses ' + total)
  //   console.log('writing file to json')
  //   console.log(blist)
  //   fs.writeFileSync('yelp.json', JSON.stringify(Object.values(blist)))
  // }
}
function timeout (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
async function sleep (fn, ...args) {
  await timeout(3000)
  return fn(...args)
}
const makeDb = async(dbname='test') => {
  const MongoClient = require('mongodb').MongoClient

  const url = `mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority`

  //const client = new MongoClient(url, { useUnifiedTopology: true })
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  db = client.db(dbname)

//console.log('wtf')
//let n = await db.collection('neighborhoods').find({}).toArray()
// console.log('wtf')
//c//onsole.log(n)
// let flat = _.flattenDeep(n.map(d=> d.geometry.coordinates))
// let group = _.chunk(flat, 2).map(d => { return {x: d[0], y: d[1] } })
//fs.writeFileSync('neigh.json', JSON.stringify(n, null, 2))
}

let db
const start = async() => {

  db = JSON.parse(fs.readFileSync('yelp.json'))

  zipCodes.forEach((zip, index) => {
    startSearch([], index)
  })
  let id = setInterval(function () {
    if(queue.length)
      search.apply(this, queue.pop())
    else
      clearInterval(id)
  }, 2000)
}
//354356
start()

// const response = yelpClient.search({
//   longitude: -73.91922208269459,
//   latitude: 40.72185277744134,
//   radius: 2000,
// }).then(d => {
//   console.log(d.jsonBody.total)
//   //console.log(d.jsonBody.businesses[0])
// })



//makeDb('sample_restaurants')

//console.log(zipCodes.length)

// export const handler = async (event, context) => {
//   console.log(event, context)

//   let query = event.body
//   // connect to your cluster
  // const client = await MongoClient.connect(url, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
//   // specify the DB's name
//   const db = client.db('sample_restaurants')
//   // execute find query
//   const items = await db.collection('restaurants').find({}).toArray()
//   //TODO only return the bare minimum we need to render (no mongo _id, no health inspection data )
//   //console.log(items)
//   // close connection
//   client.close()

//   return {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     },
//     statusCode: 200,
//     body: JSON.stringify(items),
//   }
// }
