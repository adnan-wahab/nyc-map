// Script will grab each peace of data from that page individually
const puppeteer = require('puppeteer')
const fs = require('fs')
const zillowJSONData = require('./zillow-urls.json')
// const testUrl = 'https://www.zillow.com/b/the-alexander-rego-park-ny-65b5Xv/'
const DESTINATION_PATH = 'page-info.json'

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sleep(fn, ...args) {
  await timeout(3000)
  return fn(...args)
}

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  let price
  while (zillowJSONData) {
    let url = zillowJSONData.pop()
    const page = await browser.newPage()
    await page.goto(url) // for now, it works with the 1 val
    const pricingSelector = '.units-table__text--sectionheading'

    // Getting value from any element https://stackoverflow.com/a/61077067/6859827
    // Docs: https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pageevalselector-pagefunction-args-1
    price = await page.$eval(pricingSelector, (el) => el.textContent)
    await page.waitFor(1500)

    await page.close()

    await browser.close()
  }

  fs.writeFileSync(DESTINATION_PATH, JSON.stringify(price))
})()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Below are all the div and spand we will take from zillow

// // source_url: xxx,  price: units-table__text--sectionheading,

// // bedrooms: units-table__text--smallbody bdp-home-dna-val

// // bathrooms: units-table__text--smallbody bdp-home-dna-val

// // type: tbd,

// // address: Text-c11n-8-15-1__aiai24-0 sc-hHKmLs jyTAcy bpSmhb,

// // image_url: tbd
// // }
