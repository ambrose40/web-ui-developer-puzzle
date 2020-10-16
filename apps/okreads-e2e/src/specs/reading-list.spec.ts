import { $, $$, browser, by, element, ExpectedConditions, protractor } from 'protractor';

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
  it('Then: I should be able to add book to reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    await browser.sleep(1000);
    let readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    let items = await $$('[data-testing="reading-list-item"]');
    const countItemsBefore = items.length;
    await browser
      .actions()
      .sendKeys(protractor.Key.ESCAPE)
      .perform();

    const button = await $$('[data-testing="want-to-read-button"]:not(:disabled)');
    await button[0].click();

    readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    items = await $$('[data-testing="reading-list-item"]');
    expect(items.length).toBeGreaterThan(countItemsBefore);
  });
  it('Then: I should be able to remove book from reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    let items = await $$('[data-testing="reading-list-item"]');
    const countItemsBefore = items.length;
    const buttonRemove = await $$('[data-testing="remove-book-button"]');
    await buttonRemove[buttonRemove.length-1].click();

    items = await $$('[data-testing="reading-list-item"]');
    expect(items.length).toBeLessThan(countItemsBefore);
  });
});
describe('When: I use the undo feature', () => {
  it('Then: I should be able to undo adding book to reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    // Open reading list
    let readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    // Get initial number of reading items
    let items = await $$('[data-testing="reading-list-item"]');
    const countItemsBefore = items.length;
    // Press ESC to close reading list
    await browser
      .actions()
      .sendKeys(protractor.Key.ESCAPE)
      .perform();
    // Perform search and get results on screen
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    await browser.sleep(1000);
    // Click first enabled Want to read button
    const button = await $$('[data-testing="want-to-read-button"]:not(:disabled)');
    await button[0].click();
    // Click on Undo in SnackBar.
    await browser.sleep(1000);
    const submit = await browser.driver.findElement(by.css('.mat-simple-snackbar-action'));
    await submit.click();
    // Open reading list
    readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    // Check number of reading list items is same as before
    items = await $$('[data-testing="reading-list-item"]');
    expect(items.length).toEqual(countItemsBefore);
  });
  it('Then: I should be able to undo book removal from reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    // Open reading list
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    // Get initial number of reading items
    let items = await $$('[data-testing="reading-list-item"]');
    const countItemsBefore = items.length;
    // Click on remove from reading list button
    const buttonRemove = await $$('[data-testing="remove-book-button"]');
    await buttonRemove[buttonRemove.length-1].click();
    // Click on Undo in SnackBar
    await browser.sleep(1000);
    const submit = await browser.driver.findElement(by.css('.mat-simple-snackbar-action'));
    await submit.click();
    // Check number of reading list items is same as before
    items = await $$('[data-testing="reading-list-item"]');
    expect(items.length).toEqual(countItemsBefore);
  });
});
