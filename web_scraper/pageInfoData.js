// Script will grab each peace of data from that page individually
const zillowJSONData = require('./zillow-urls.json')

// console.log(zillowJSONData)

// We will send it to this page where we can play around with the data
const DESTINATION_PATH = 'page-info.json'

const puppeteer = require('puppeteer')
const fs = require('fs')

// To individually have each page in an array
let individualEl = []
zillowJSONData.forEach((el) => individualEl.push(el))

// Sleep so we don't get caught
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sleep(fn, ...args) {
    await timeout(3000)
    return fn(...args)
}

;(async () => {
    const browser = await puppeteer.launch({ headless: false })
    // This variable will hold each url starting from first to last and will iterate over
    const url = individualEl.forEach((el) => el + 1)

    // All the info in this array
    const allInfo = []
    async function getData(i) {
        const page = await browser.newPage()

        await page.goto(url)
        // This selector should only aim for the pricing for now
        const selector = '.units-table__text--sectionheading'
        // To extract the pricing
        const pricePage = await page.$$eval(selector, (nodes) =>
            nodes.map((el) => el.href)
        )
        pricePage.forEach((url) => allInfo.push(url))

        await page.waitFor(1500)

        await page.close()

        await browser.close()
        // To write it in our file declared aboce
        fs.writeFileSync(DESTINATION_PATH, JSON.stringify(pricePage))

        sleep(getData, 0)
    }
})()

// Below are all the div and spand we will take from zillow

// source_url: xxx,  price: units-table__text--sectionheading,

// bedrooms: units-table__text--smallbody bdp-home-dna-val

// bathrooms: units-table__text--smallbody bdp-home-dna-val

// type: tbd,

// address: Text-c11n-8-15-1__aiai24-0 sc-hHKmLs jyTAcy bpSmhb,

// image_url: tbd
// }
