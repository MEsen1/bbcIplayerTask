import { Given, When, Then } from "@wdio/cucumber-framework";

import HomePage from "../pageobjects/home.page.js";
import BrowserUtils from "../utils/browserUtils.js";

import { expect } from "chai";


Given('I am on the BBC iPlayer homepage', async () => {
    await HomePage.open();
    await BrowserUtils.waitUntilPageLoaded();
    expect(await HomePage.isHomeLogoDisplayed()).to.be.equal(
      true,
      "Failed to land on home page"
    );
    await HomePage.acceptCookies();
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
      // Scroll the section into view
      let section = await sections[index];
      await section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await browser.pause(500);
      expect(section.$(await HomePage.carouselForwardButton)).to.exist;
      console.log(`Section ${index + 1} has a carousel button`);
    }
  });
  
  Then('each carousel should have at least {int} programme items', async (numberOfItems) => {
    const sections = await HomePage.section;
    expect(sections).to.exist;

    for (const [index, section] of sections.entries()) {
      // Scroll the section into view
      let section = await sections[index];
      await section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await browser.pause(500);
      console.log(`Section ${index + 1} has a carousel button`);
      const items = await section.$$(await HomePage.carouselItem);
      expect(items).to.exist;
      expect(items.length).to.be.at.least(numberOfItems);
      const elem = await section.$('h2');
      console.log(`Carousel ${index + 1} with name ${await elem.getText()} has ${items.length} items`);
    }

  });
  
  When('I click the carousel arrow in each section and verify more items are shown', async function () {
    const sections = await HomePage.section;
    expect(sections).to.exist;
    
    for (const [index] of sections.entries()) {
      // Scroll the section into view
      let section = await sections[index];
      await section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await browser.pause(5000); // Adjust pause as necessary to ensure section is in view
      
      const forwardButton = await section.$("button[data-bbc-content-label='forward']");
      //const isEnabled = await forwardButton.isEnabled();
      console.log(`Enabled outside of while loop: ${await forwardButton.isEnabled()}`);


      while (await forwardButton.isEnabled()) {
        await forwardButton.click();
        
        console.log(`enabled insidee of while loop ${await forwardButton.isEnabled()}`);
        
          await browser.pause(1000); // Adjust pause as necessary
          const elem = await section.$('h2');
          const activeItems = await section.$$("ul li:not(.carrousel__item--inactive)");
          console.log(`Section ${index} with name ${await elem.getText()}Active items length ${activeItems.length}`);
          
          // Verify when click on forward button, more items are shown
          expect(activeItems).to.exist;
      }
    }});

  
  When('I click on an episode in the carousel and the playback page is should displayed', async () => {

    const sections = await HomePage.section;
    expect(sections).to.exist;

    for (const [index, section] of sections.entries()) {
      console.log(`Section ${index + 1} has an item`);
      let section = await sections[index];
      await section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await browser.pause(500);
      // Fetch the carousel items for the current section
      const items = await section.$("a[data-bbc-content-label='content-item']");

      
        // Click on the first item in the current section
        await items.click();
        
        // Assuming there is a wait or some mechanism to ensure page navigation
        await browser.pause(2000); // Adding a pause to allow the navigation to complete
        expect(await browser.getUrl()).to.match(/https:\/\/www\.bbc\.co\.uk\/iplayer\/(episode|episodes|brand)/);
        await browser.back();
        await browser.pause(2000)
        
    }
  }
  );
