const { test, expect } = require("@playwright/test");

test.describe("Pasta Tracker", () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/index.html");
  });

  test("should display correct title", async () => {
    expect(await page.title()).toBe("🍝 Pasta Tracker");
  });

  test("should display save and load buttons", async () => {
    const saveButton = await page.$('button[onclick="encodeToString()"]');
    const loadButton = await page.$('button[onclick="decodeFromString()"]');
    expect(saveButton).toBeTruthy();
    expect(loadButton).toBeTruthy();
  });

  test("should have checkboxes for pasta types", async () => {
    const checkbox = await page.$('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
  });

  test('should display "Copy" button', async () => {
    const copyButton = await page.$('button[onclick="copyText()"]');
    expect(copyButton).toBeTruthy();
  });

  test('should display "Download Tracker Data" link', async () => {
    const downloadLink = await page.$('a[id="blob-file-download"]');
    expect(downloadLink).toBeTruthy();
  });

  test('should display "Save Tracker" button', async () => {
    const saveButton = await page.$('button[onclick="encodeToString()"]');
    expect(saveButton).not.toBeNull();
  });

  test('should display "Load Tracker" button', async () => {
    const loadButton = await page.$('button[onclick="decodeFromString()"]');
    expect(loadButton).not.toBeNull();
  });
});
