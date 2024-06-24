import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
   async open(path = "") {
    await browser.url(`https://www.bbc.co.uk/iplayer/${path}`);
  }
}
