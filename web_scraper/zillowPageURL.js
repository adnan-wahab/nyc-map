// Script will go to zillow and move from page 1 => Last page

const puppeteerExtra = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')
const fs = require('fs')

const DESTINATION_PATH = 'zillow-urls.json'

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sleep(fn, ...args) {
  await timeout(3000)
  return fn(...args)
}


// Use a serverless package or npm

//Below will grab the captcha infro from the env file
// const dotenv = require('dotenv')
// dotenv.config()
;(async () => {
  // Use the reCaptcha plugin
  // puppeteerExtra.use(
  //   RecaptchaPlugin({
  //     provider: { id: '2captcha', token: process.env.captchaToken },
  //     visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
  //   })
  // )

    puppeteerExtra.use(pluginStealth())
    const browser = await puppeteerExtra.launch({ headless: false })
    const url =
    'https://www.zillow.com/new-york-ny/rentals/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-74.52109309667969%2C%22east%22%3A-73.43481990332032%2C%22south%22%3A40.452448550058705%2C%22north%22%3A40.958396868536724%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A6181%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22price%22%3A%7B%22min%22%3A400000%7D%2C%22mp%22%3A%7B%22min%22%3A1308%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22pmf%22%3A%7B%22value%22%3Afalse%7D%2C%22pf%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%7D'

  // const breaking
    const allUrls = []
    async function  getUrls(i) {
      // wrap it into a function
      console.log('starting attempt:', i)
      const page = await browser.newPage()

      await page.goto(url)

      // try {
      //   await page.waitForSelector('.error-content-block', { timeout: 1500 })
      //   console.log('we found a recaptcha on attempt:', i)

      //   //   await (<any>page).solveRecaptchas();
      //   await Promise.all([
      //     page.waitForNavigation(),
      //     page.click('[type="submit"]'),
      //   ])
      // } catch (e) {
      //   console.log('no recaptcha found on attempt:', i)
      // }
      let selector = '.list-card-top a'
      //let links = await page.$(selector)
      let urls = await page.$$eval(selector, nodes => nodes.map(el => el.href));
      urls.forEach(url => allUrls.push(url))

      await page.waitFor(1500)

      await page.close()

      await browser.close()

      console.log(`Writing ${urls.length} Urls  to disk...`)

      fs.writeFileSync(DESTINATION_PATH, JSON.stringify(allUrls))
    }

    sleep(getUrls, 0)






})()
