// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('noRegisterEmail', function() {
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
  it('noRegisterEmail', async function() {
    await driver.get("https://armchair-athletes-live-sports-c-ofsyvtifhq-uc.a.run.app/home")
    await driver.manage().window().setRect({ width: 1492, height: 997 })
    await driver.findElement(By.css("button:nth-child(4)")).click()
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.css(".form-floating:nth-child(2) > .form-control")).click()
    await driver.findElement(By.css(".user-form")).click()
    await driver.findElement(By.css(".alert:nth-child(5)")).click()
    {
      const elements = await driver.findElements(By.css(".alert:nth-child(5) > div"))
      assert(elements.length)
    }
    await driver.close()
  })
})
