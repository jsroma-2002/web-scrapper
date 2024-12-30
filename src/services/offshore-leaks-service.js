import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export const searchOffshoreLeaks = async (entity) => {
  const url = `https://offshoreleaks.icij.org/search?q=${encodeURIComponent(
    entity
  )}`;

  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true);

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
  );

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Refresca la página
    await page.reload({ waitUntil: "domcontentloaded" });

    await page.waitForSelector("table.search__results__table tbody tr");

    // Extrae los datos usando evaluate
    const results = await page.evaluate(() => {
      const rows = document.querySelectorAll(
        "table.search__results__table tbody tr"
      );
      const data = [];

      rows.forEach((row) => {
        const entity =
          row.querySelector("td:nth-child(1) a")?.textContent?.trim() || "";
        const jurisdiction =
          row.querySelector("td:nth-child(2)")?.textContent?.trim() || "";
        const linkedTo =
          row.querySelector("td:nth-child(3)")?.textContent?.trim() || "";
        const dataFrom =
          row.querySelector("td:nth-child(4) a")?.getAttribute("title") || "";

        data.push({
          entity,
          jurisdiction,
          linkedTo,
          dataFrom,
        });
      });

      return data;
    });

    return { count: results.length, results };
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
};
