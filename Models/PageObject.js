
const {By, until, Builder,} = require('selenium-webdriver');

const driver =  new Builder().forBrowser("chrome").build();


 class Page {
    constructor(){
        this.driver = new Builder().forBrowser("chrome").build();
        this.pageTitle = "Cookie Clicker";
        this.url       = "https://orteil.dashnet.org/cookieclicker";
        //setting up locators for the web elements I will need access to
        this.locators = {
            bigCoookie: By.id('bigCookie'),
            productOne: By.id('product0'),
            productTwo: By.id('product1')
        }
    }

    //navigates to the url where the game is played and returns the current url for validation in the test
    async navigateToGame(){
        await this.driver.get(this.url);
        return await this.driver.getCurrentUrl();
    }

    //returns the curret URL
    async getCurrentUrl(){
        let url = await this.driver.getCurrentUrl();
        return url;
    }

    //grabs a reference to the cookie div and returns it to the caller
    async getCookie(){
        let cookie = await this.driver.findElement(this.locators.bigCoookie);
        return cookie;
    }

    //function that returns a boolean if the first option is enabled for interaction
    async optionOneEnabled(){

        let result = await this.driver.findElement(this.locators.productOne);
        result = await this.driver.wait(until.elementIsEnabled(result));

        return await result.isEnabled();

    }

    //clicks on the first option
    async clickOptionOne(){
        let option = await this.driver.findElement(this.locators.productOne);

        await option.click();
    }

    //returns a boolean if the grandma level div is enabled
    async grandmaLevelReached(){
       let element = await this.driver.findElement(this.locators.productTwo);
       element = await this.driver.wait(until.elementIsEnabled(element)); 
       return await element.isEnabled();
    }

    //clicks on the grandma level
    async selectGrandmaLevel(){
        let element = await this.driver.findElement(this.locators.productTwo);

        await element.click();
    }


}

module.exports = Page;