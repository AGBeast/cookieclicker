
const {expect}                                     = require('chai');

const Page                                       = require('../Models/PageObject');

require("chromedriver");


const page = new Page();

//handy function to handle clicking on the cookie automatically 
function clickOnCookie(cookie){
    setInterval(()=>{
        page.driver.executeScript("arguments[0].click()",cookie);
        }, 400)
}


//listening for the unhandledRejection event since this is node
process.on("unhandledRejection",()=>{});

    //start of the test suite
    describe("Interacting with CookieClicker ", function(){


        it("should allow me to navigate to the cookie clicker game", async function(){
            try {

                await page.navigateToGame();

                let url = await page.getCurrentUrl();

                page.driver.sleep(2000);
                expect(url).to.equal('https://orteil.dashnet.org/cookieclicker/',"correct URL reached");
                

                
            } catch (error) {
                console.log("The following error has occured: " + error);
            }
        })

        it("after 15 cookies, first prize is acquired", async function(){
            let firstPrizeEnabled;
            try{

            
            let cookie = await page.getCookie()

           
           clickOnCookie(cookie);
        
           await page.driver.sleep(20000).then(async ()=>{

            let option1 = await page.optionOneEnabled();
            if(option1)
                await page.clickOptionOne();
            
                expect(option1).equals(true);
           })
        }catch(error){
            console.log("The following error occured in test case 2: "+ error);
        }

           
        });

          it("grandma level should be available after 100 cookies have been reached", async function(){

            try{
            await page.driver.sleep(40000).then(async ()=>{
                let result = await page.grandmaLevelReached();
                if(result)
                    await page.selectGrandmaLevel();
                
                expect(result).equals(true);
            })
        }catch(error){
            console.log("The following error occured in test case 3: "+ error);
        }
 
            
            after(function(){
                 
                    clearInterval(clickOnCookie);
         
                    //end the test
                     page.driver.quit(); 
         
            })
            
        })

      
             
        
 
        
       

    });//end of test suite

    
