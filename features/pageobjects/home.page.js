import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get homeLogo() {
    return $("a[data-bbc-content-label='iplayer-home']");
  }

  get acceptCookiesButton(){
    return $("#bbccookies-continue-button");
  }

  get navigationMenu(){
    return $("ul[data-bbc-content-label='primary-nav']");
  }

  get section(){
    return $$("section.section");
  }

  get carouselForwardButton(){
    return $("button[data-bbc-content-label='forward']");
  }

  get carouselItem(){
    return $$("a[data-bbc-content-label='content-item']");
  }

  async isHomeLogoDisplayed() {
    return (await this.homeLogo).isDisplayed();
  }

  async acceptCookies() {
    try {
      await this.acceptCookiesButton.click();
    } catch (error) {
      throw new Error('Button is not visible');
    }
  }
  
  open() {
    return super.open();
  }
}

export default new HomePage();
