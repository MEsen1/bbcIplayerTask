Feature: BBC iPlayer Homepage

  Background:
    Given I am on the BBC iPlayer homepage

  @foo
  Scenario: Verify the homepage title
    Then the title should be "BBC iPlayer - Home"
  @foo
  Scenario: Verify the iPlayer navigation menu
    Then the page should have one iPlayer navigation menu
  @foo
  Scenario: Verify there are at least 4 sections with carousel
    Then the page should have at least 4 sections with carousel
  @foo
  Scenario: Verify each carousel has at least 4 programme items
    Then each carousel should have at least 4 programme items
  @foo
  Scenario: Verify more items are shown when clicking a carousel arrow
    When I click the carousel arrow in each section
    # Then more items should be shown in the carousel
  @foo1
  Scenario: Verify playback page is displayed when an episode is clicked
    When I click on an episode in the carousel
    Then the relevant playback page should be displayed
