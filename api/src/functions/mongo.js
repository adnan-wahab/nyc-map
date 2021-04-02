const MongoClient = require('mongodb').MongoClient

const MONGODB_URI =
    'mongodb+srv://poop:poop@cluster0.rucmp.mongodb.net/test?retryWrites=true&w=majority'

let cachedDb = null

function connectToDatabase(uri) {
    console.log('=> connect to database')
    if (cachedDb) {
        console.log('=> using cached database instance')
        return Promise.resolve(cachedDb)
    }
    return MongoClient.connect(uri).then((db) => {
        cachedDb = db
        return cachedDb
    })
}

function queryDatabase(db, collection) {
    console.log('=> query database')
    let project = {
        id: 1,
        coordinates: 1,
        categories: 1,
        name: 1,
        image_url: 1,
        _id: 0,
    }
    return db
        .db('test')
        .collection('places')
        .find({})
        .project(project)
        .toArray()
        .then((result) => {
            return result
        })
        .catch((err) => {
            console.log('=> an error occurred: ', err)
            return { statusCode: 500, body: 'error' }
        })
}

export const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false

    let result = await connectToDatabase(MONGODB_URI)
        .then((db) => queryDatabase(db))
        .then((result) => {
            //console.log('=> returning result: ', result)
            //callback(null, result)
            return result
        })
        .catch((err) => {
            console.log('=> an error occurred: ', err)
            return err
        })

    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: result,
    }
}
