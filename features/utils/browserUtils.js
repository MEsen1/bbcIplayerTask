class BrowserUtils {

  async scroll(element) {
    while (!(await element.isDisplayedInViewport())) {
      await browser.scroll(0, 300);
      await browser.pause(100); // Wait between scrolls
    }
  }

  async waitUntilPageLoaded() {
    await browser.waitUntil(
      async () => {
        const readyState = await browser.execute(() => document.readyState);
        return readyState === "complete";
      },
      {
        timeout: 10000, // Maximum time to wait in milliseconds
        timeoutMsg: "Page did not finish loading within 10 seconds",
      }
    );
  }

  async getElementText(element, timeout = 10000) {
    await this.waitForElementToBeDisplayed(element, timeout);
    return await element.getText();
  }

  async waitForElementToBeDisplayed(element, timeout = 10000) {
    await this.isElementDefined(element);
    await element.waitForDisplayed({
      timeout: timeout,
      timeoutMsg: `Element '${element.selector}' is not displayed after ${timeout} milliseconds`,
    });
  }

  async isElementDefined(element) {
    if (!element)
      throw new Error(`'element' was not initialized and is 'undefined'`);
    return element;
  }

  async getElementText(element, timeout = 10000) {
    await this.waitForElementToBeDisplayed(element, timeout);
    return await element.getText();
  }
  async getElementValue(element, timeout = 10000) {
    await this.waitForElementToBeDisplayed(element, timeout);
    return await element.getValue();
  }

  async getAllVisibleTexT() {
    return await browser.execute(() => document.body.textContent);
  }
}

export default new BrowserUtils();
