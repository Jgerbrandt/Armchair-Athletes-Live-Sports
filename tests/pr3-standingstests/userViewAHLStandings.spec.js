// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('userViewAHLStandings', function() {
  //this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('userViewAHLStandings', async function() {
    await driver.get("https://armchair-athletes-live-sports-c-ofsyvtifhq-uc.a.run.app/home")
    await driver.manage().window().setRect({ width: 1492, height: 997 })
    await driver.findElement(By.css("div:nth-child(1) > .mainButtons > button")).click()
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("josh@test.test")
    await driver.findElement(By.css(".ng-untouched")).click()
    await driver.findElement(By.css(".ng-untouched")).sendKeys("test")
    await driver.findElement(By.css(".btn")).click()
    await new Promise((r) => setTimeout(r, 1000));
    await driver.findElement(By.css(".drop:nth-child(3) .dropbtn")).click()
    await driver.findElement(By.css(".dropitem:nth-child(2)")).click()
    await driver.findElement(By.css("html")).click()
    await new Promise((r) => setTimeout(r, 2000));
    {
      const elements = await driver.findElements(By.css(".wg_league"))
      assert(elements.length)
    }
    await driver.close()
  })
})
