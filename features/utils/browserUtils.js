class BrowserUtils {

  async scrollIntoView(element) {
    await element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    await browser.pause(500);
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
}

export default new BrowserUtils();