import { $, $$, browser, by, ExpectedConditions, protractor } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
  it('Then: I should be able to mark book as finished', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    // Search for books
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    await browser.sleep(1000);
    let readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const items = await $$('[data-testing="reading-list-item"]');
    const countItemsBefore = items.length;
    await browser
      .actions()
      .sendKeys(protractor.Key.ESCAPE)
      .perform();
    // Add some available book to reading list
    const button = await $$('[data-testing="want-to-read-button"]:not(:disabled)');
    await button[0].click();
    // Check book has been added to reading list
    readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const itemsAfter = await $$('[data-testing="reading-list-item"]');
    expect(itemsAfter.length).toBeGreaterThan(countItemsBefore);
    // Mark book as finished
    let buttonFinished = await $$('[data-testing="finished-button"]');
    expect(buttonFinished[buttonFinished.length-1].getAttribute('ng-reflect-color')).toEqual('primary');
    const finishedDetails = await browser.driver.findElements(by.css('[data-testing="reading-list-item-details-finished"]'));
    expect(finishedDetails[finishedDetails.length-1].getText()).toContain('Not yet read');
    await buttonFinished[buttonFinished.length-1].click();
    buttonFinished = await $$('[data-testing="finished-button"]');
    expect(buttonFinished[buttonFinished.length-1].getAttribute('ng-reflect-color')).toEqual('accent');
    const finishedDetailsAfter = await browser.driver.findElements(by.css('[data-testing="reading-list-item-details-finished"]'));
    expect(finishedDetailsAfter[finishedDetailsAfter.length-1].getText()).toContain('Reading complete:');
  });
});
