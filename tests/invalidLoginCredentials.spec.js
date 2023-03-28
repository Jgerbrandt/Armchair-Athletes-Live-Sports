// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Invalid Login Credentials', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Invalid Login Credentials', async function() {
    await driver.get("https://armchair-athletes-live-sports-c-ofsyvtifhq-uc.a.run.app/home")
    await driver.manage().window().setRect({ width: 1060, height: 815 })
    await driver.findElement(By.css("div:nth-child(1) > .mainButtons > button")).click()
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("email@email.com")
    await driver.findElement(By.css(".ng-untouched")).click()
    await driver.findElement(By.css(".ng-untouched")).sendKeys("email123")
    await driver.findElement(By.css(".btn")).click()
    assert(await driver.switchTo().alert().getText() == "Incorrect Email or Password")
    await driver.findElement(By.css("login-form > div")).click()
  })
})
