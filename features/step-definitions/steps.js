import { Given, When, Then } from "@wdio/cucumber-framework";

import HomePage from "../pageobjects/home.page.js";
import BrowserUtils from "../utils/browserUtils.js";

import { expect } from "chai";


Given('I am on the BBC iPlayer homepage', async () => {
    await HomePage.open();
    expect(await HomePage.isHomeLogoDisplayed()).to.be.equal(
      true,
      "Failed to land on home page"
    );
    //await HomePage.acceptCookies();
  });
  
  Then('the title should be {string}', async (expectedTitle) => {
    const title = await browser.getTitle();
    expect(title).to.equal(expectedTitle);
  });
  
  Then('the page should have one iPlayer navigation menu', async () => {
    expect(await HomePage.navigationMenu).to.exist;
  });
  
  Then('the page should have at least {int} sections with carousel', async (numberOfSections) => {
    const sections  = await HomePage.section;
    expect(sections).to.exist;
    expect(sections.length).to.be.at.least(numberOfSections);
    
    for (const [index, section] of sections.entries()) {
      expect(section.$(await HomePage.carouselForwardButton)).to.exist;
      console.log(`Section ${index + 1} has a carousel button`);
    }
  });
  
  Then('each carousel should have at least {int} programme items', async (numberOfItems) => {
    const sections = await HomePage.section;
    expect(sections).to.exist;

    for (const [index, section] of sections.entries()) {
      console.log(`Section ${index + 1} has a carousel button`);
      const items = await section.$$(await HomePage.carouselItem);
      expect(items).to.exist;
      expect(items.length).to.be.at.least(numberOfItems);
      console.log(`Carousel ${index + 1} has ${items.length} items`);
    }

  });
  
  When('I click the carousel arrow in each section', async function () {
    const sections = await HomePage.section;
    expect(sections).to.exist;
    
    for (const [index, section] of sections.entries()) {
      let isForwardButtonEnabled = true;
      while (isForwardButtonEnabled) {
        (await section.$(await HomePage.carouselForwardButton)).click();
        await browser.pause(1000);
        if(!!(await HomePage.carouselForwardButton).isEnabled()){
          isForwardButtonEnabled = false
        }
      }
    }
    browser.executeAsync("arguments[0].scrollIntoView({  block: 'end'  });", element);
});
    
  Then('more items should be shown in the carousel', async function () {
    const carousels = await driver.findElements(By.css('.carousel'));
    for (let carousel of carousels) {
      const items = await carousel.findElements(By.css('.programme-item'));
      expect(items.length).to.be.greaterThan(4); // Assuming initial load shows 4 items
    }
  });
  
  When('I click on an episode in the carousel', async () => {

    const sections = await HomePage.section;
    expect(sections).to.exist;

    for (const [index, section] of sections.entries()) {
      console.log(`Section ${index + 1} has a carousel button`);
      let section = await sections[index];
      
      // Fetch the carousel items for the current section
      const items = await section.$("a[data-bbc-content-label='content-item']");

      
        // Click on the first item in the current section
        await items.click();
        
        // Assuming there is a wait or some mechanism to ensure page navigation
        await browser.pause(2000); // Adding a pause to allow the navigation to complete
        
       
    }
  }
  );
  
  Then('the relevant playback page should be displayed', async () => {
     // Verify the playback page is displayed
     expect(await browser.getUrl()).to.include('/iplayer/episode');
        
     // Navigate back to the homepage
     await browser.back();

      // Wait for the homepage to reload (adjust the selector to something unique on the homepage)
      await browser.waitUntil(
       async () => (await browser.getTitle()) === 'BBC iPlayer - Home',
       {
           timeout: 5000,
           timeoutMsg: 'Expected to be back on the BBC iPlayer homepage'
       }
   );

  });