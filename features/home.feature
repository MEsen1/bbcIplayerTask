Feature: BBC iPlayer Homepage

  Background:
    Given I am on the BBC iPlayer homepage

  Scenario: Verify the homepage title
    Then the title should be "BBC iPlayer - Home"

  Scenario: Verify the iPlayer navigation menu
    Then the page should have one iPlayer navigation menu

  Scenario: Verify there are at least 4 sections with carousel
    Then the page should have at least 4 sections with carousel

  Scenario: Verify each carousel has at least 4 programme items
    Then each carousel should have at least 4 programme items
  
  Scenario: Verify more items are shown when clicking a carousel arrow
    When I click the carousel arrow I should be able to see more items
  
  Scenario: Verify playback page is displayed when an episode is clicked
    When I click on an episode in the carousel and the playback page is should displayed
