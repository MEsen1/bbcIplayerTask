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
    
  for (const [index] of sections.entries()) {
    // Scroll the section into view
    let section = sections[index];
    await BrowserUtils.scrollIntoView(section);
    expect(section.$(await HomePage.carouselForwardButton)).to.exist;
    console.log(`Section ${index + 1} has a carousel button`);
  }
});
  
Then('each carousel should have at least {int} programme items', async (numberOfItems) => {
  const sections = await HomePage.section;
  expect(sections).to.exist;

  for (const [index] of sections.entries()) {
    // Scroll the section into view
    let section = sections[index];
    await BrowserUtils.scrollIntoView(section);
    const items = await section.$$(await HomePage.carouselItem);
    expect(items).to.exist;
    expect(items.length).to.be.at.least(numberOfItems);
  }
});
  
When('I click the carousel arrow I should be able to see more items', async () => {
  const sections = await HomePage.section;
  expect(sections).to.exist;
    
  for (const [index] of sections.entries()) {
    // Scroll the section into view
    let section = sections[index];
    await BrowserUtils.scrollIntoView(section);
      
    const forwardButton = await section.$("button[data-bbc-content-label='forward']");
   
    while (await forwardButton.isEnabled()) {
      await forwardButton.click();
      await browser.pause(1000); // Adjust pause as necessary
      const activeItems = await section.$$("ul li:not(.carrousel__item--inactive)");
      
      // Verify when click on forward button, more items are shown
      expect(activeItems).to.exist;
      expect(activeItems.length).to.be.at.least(1)
    }
  }
});

  
When('I click on an episode in the carousel and the playback page is should displayed', async () => {
  const sections = await HomePage.section;
  expect(sections).to.exist;

  for (const [index] of sections.entries()) {
    // Scroll the section into view
    let section = sections[index];
    await BrowserUtils.scrollIntoView(section);
    // Fetch the carousel items for the current section
    const item = await section.$("a[data-bbc-content-label='content-item']");
    expect(item).to.exist;
    // Click on the first item in the current section
    await item.click();
        
    // Adding a pause to allow the navigation to complete
    await browser.pause(2000); // Adding a pause to allow the navigation to complete
    expect(await browser.getUrl()).to.match(/https:\/\/www\.bbc\.co\.uk\/iplayer\/(episode|episodes|brand)/);
    await browser.back();
    await browser.pause(2000)
  }
}
);
