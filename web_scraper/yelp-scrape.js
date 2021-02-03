'use strict'

const fs = require('fs')

const yelp = require('yelp-fusion')
const client = yelp.client(
  '0QCQsubRVAbIPNJFPBVSb-Ykx6rrYUZnYhD4d8wHJqK-fsVpawFkD5hdG54i2qrRUE7M_rcAv3m63xPK6VGUb5MSpR0PtuaCC75KNq8Yd-cHc0Z_85UxaRV_OQQGYHYx'
)

let zipCodes = [
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
  10286,
]

let blist = {}

let startSearch = (zip, index) => {
  setTimeout(() => {
    search(zip, index)
  }, index * 1000)
}

let count = 0

let search = async (zip, index) => {
  let response = await client.search({
    location: 'new york ' + zip,
    limit: 50,
    //offset: index * 50,
  })

  response.jsonBody.businesses.forEach((b) => (blist[b.id] = b))

  console.log(count, zipCodes.length)
  if (++count === zipCodes.length) {
    console.log('writing file to json')
    console.log(blist)
    fs.writeFileSync('yelp.json', JSON.stringify(Object.values(blist)))
  }
  // .then((response) => {
  //   //master = master.concat.apply(master, response.jsonBody.businesses)
  //   //console.log(response.jsonBody.businesses)
  //   console.log(index, 'counted ' + Object.keys(blist).length)
  //   count++
  //   //if (count === i) console.log('done')
  // })
  // .catch((e) => {
  //   console.log(e)
  // })
}
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
async function sleep(fn, ...args) {
  await timeout(3000)
  return fn(...args)
}

// while (goOn) {
//   // other code
//   var [parents] = await Promise.all([
//       listFiles(nextPageToken).then(requestParents),
//       timeout(5000)
//   ]);
//   // other code
// }
//for (var i = 0; i < 1000; i++) startSearch(i)
// zipCodes = zipCodes.slice(0, 5)
zipCodes.forEach((zip, index) => {
  startSearch(zip, index)
})

//const MongoClient = require('mongodb').MongoClient

// const url = `mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority`

// const client = new MongoClient(url, { useUnifiedTopology: true })

// export const handler = async (event, context) => {
//   console.log(event, context)

//   let query = event.body
//   // connect to your cluster
//   const client = await MongoClient.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
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