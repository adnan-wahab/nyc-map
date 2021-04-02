const StellarSdk = require('stellar-sdk')
const fetch = require('node-fetch')

// Create a new keypair.
const pair = StellarSdk.Keypair.random()

async function createTestAccount() {
    try {
        console.log(
            'Funding a new account on the test network (takes a few seconds)…'
        )
        const response = await fetch(
            `https://friendbot.stellar.org?addr=${pair.publicKey()}`
        )
        const data = await response.json()

        console.log(`Public Key: ${pair.publicKey()}`)
        console.log(`Secret Key: ${pair.secret()}`)
        return 'Success! You have a funded Testnet account :)'
    } catch (e) {
        console.error('Oh no! Something went wrong:', e)
    }
}

createTestAccount()
