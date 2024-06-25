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

  get carouselItemInViewport(){
    return $$("ul li:not(.carrousel__item--inactive)")
  }

  async isHomeLogoDisplayed() {
    return (await this.homeLogo).isDisplayed();
  }

  async acceptCookies() {
    const cookiesButton = await this.acceptCookiesButton;
    console.log(`cookie button ${await cookiesButton.isClickable()}`)
    if(await cookiesButton.isClickable()){
      (await this.acceptCookiesButton).click();
    }
  }
  
  open() {
    return super.open();
  }
}

export default new HomePage();
