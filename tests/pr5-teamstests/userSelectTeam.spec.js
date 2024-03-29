// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('userSelectTeam', function() {
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
  it('userSelectTeam', async function() {
    await driver.get("https://armchair-athletes-live-sports-c-ofsyvtifhq-uc.a.run.app/home")
    await driver.manage().window().setRect({ width: 1492, height: 997 })
    await driver.findElement(By.css("div:nth-child(1) > .mainButtons > button")).click()
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("favteam@test.com")
    await driver.findElement(By.css(".ng-untouched")).click()
    await driver.findElement(By.css(".ng-untouched")).sendKeys("test")
    await driver.findElement(By.css(".btn")).click()
    await new Promise((r) => setTimeout(r, 500));
    await driver.findElement(By.css("div:nth-child(2) button")).click()
    await new Promise((r) => setTimeout(r, 500));
    await driver.findElement(By.css("tr:nth-child(1) .btn")).click()
    await driver.findElement(By.css(".confirm-button")).click()
    await new Promise((r) => setTimeout(r, 500));
    await driver.findElement(By.css(".home > div > div > .data-column")).click()
    await new Promise((r) => setTimeout(r, 1500));
    {
      const elements = await driver.findElements(By.css("h2"))
      assert(elements.length)
    }
    await driver.close()
  })
})
