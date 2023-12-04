const { chromium } = require('playwright');

let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:5000/index.html');
});

afterEach(async () => {
  await page.close();
});

describe('Pasta Tracker', () => {
  test('should display correct title', async () => {
    expect(await page.title()).toBe('🍝 Pasta Tracker');
  });

  test('should display save and load buttons', async () => {
    const saveButton = await page.$('button[onclick="encodeToString()"]');
    const loadButton = await page.$('button[onclick="decodeFromString()"]');
    expect(saveButton).not.toBeNull();
    expect(loadButton).not.toBeNull();
  });

  test('should have checkboxes for pasta types', async () => {
    const checkbox = await page.$('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
  });

  test('should display "Copy" button', async () => {
    const copyButton = await page.$('button[onclick="copyToClipboard()"]');
    expect(copyButton).not.toBeNull();
  });

  test('should display "Download Tracker Data" link', async () => {
    const downloadLink = await page.$('a[download="trackerData.txt"]');
    expect(downloadLink).not.toBeNull();
  });

  test('should display "Save Tracker" button', async () => {
    const saveButton = await page.$('button[onclick="encodeToString()"]');
    expect(saveButton).not.toBeNull();
  });

  test('should display "Load Tracker" button', async () => {
    const loadButton = await page.$('button[onclick="decodeFromString()"]');
    expect(loadButton).not.toBeNull();
  });

  // You can also test the functionality of these buttons if they have predictable behaviors
  // For example, if clicking the "Save Tracker" button changes some text on the page:
  test('should save data when "Save Tracker" button is clicked', async () => {
    await page.click('button[onclick="encodeToString()"]');
    const savedText = await page.$eval('#savedText', el => el.textContent);
    expect(savedText).toBe('Data saved!');
  });

  // Or if clicking the "Load Tracker" button changes the checkboxes:
  test('should load data when "Load Tracker" button is clicked', async () => {
    await page.click('button[onclick="decodeFromString()"]');
    const checkbox = await page.$eval('input[type="checkbox"]', el => el.checked);
    expect(checkbox).toBe(true);
  });

});