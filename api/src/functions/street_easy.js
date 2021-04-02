const MongoClient = require('mongodb').MongoClient

const url = 'mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(url, { useUnifiedTopology: true })

export const handler = async (event, context) => {
  // const search = JSON.parse(event.body).search
  // const query = search.trim() ? {$text: {$search: search} }: {}

  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // specify the DB's name

  //address: "267 Sackett Street #1"
// baths: 3
// beds: 2
// bike room: true
// board approval required: true
// cats and dogs allowed: true
// central air conditioning: true
// children's playroom: true
// cold storage: true
// community recreation facilities: true
// concierge: true
// days_on_streeteasy: "66.0"
// deck: true
// dishwasher: true
// doorman: true
// elevator: true
// full-time doorman: true
// furnished: true
// garage parking: true
// garden: true
// green building: true
// guarantors accepted: true
// gym: true
// laundry in building: true
// link: "http://streeteasy.com/building/267-sackett-street-brooklyn/1?featured=1"
// live-in super: true
// loft: true
// neighborhood: "Carroll Gardens"
// package room: true
// parking available: true
// patio: true
// per_sq_ft: null
// pets allowed: true
// price: "6950.0"
// realtor: "Corcoran"
// roof deck: true
// rooms: 7
// scrape_date: "2016-12-19"
// smoke-free: true
// sq_ft: ""
// storage available: true
// sublet: true
// terrace: true
// unit_type: "Multi-family"
// virtual doorman: true
// washer/dryer in-unit: true
// waterfront: true
// waterview: true
// _id: "602056f05cde666d17fdb182"
  const db = client.db('test') // execute find query
  let items = await (await db.collection('streeteasy').find({})
  .project({ link: 1, price: 1, address: 1, _id: 0 })
  .toArray())
  console.log(items.length)
  // console.log(items)
  //items = items.filter(d => (query, d.name, d.name.match(query) || d.categories.some(d=> d.alias.match(query))))
  // console.log(items.length)
  // TODO only return the bare minimum we need to render (no mongo _id, no health inspection data )
  // console.log(items)
  // close connection
  client.close()

  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(items)
  }
}
