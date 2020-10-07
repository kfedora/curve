const puppeteer = require("puppeteer");

// we're using async/await - so we need an async function, that we can run
const run = async () => {
  // open the browser and prepare a page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // set the size of the viewport, so our screenshot will have the desired size
  await page.setViewport({
      width: 1920,
      height: 1080
  });

  await page.goto('https://www.curvedental.com/packages', {"waitUntil" : "networkidle2"})
  await page.screenshot({
      path: 'curvedental.png',
      fullPage: true
  });
  
  // Gather assets page urls for all the blockchains
  const assetUrls = await page.$$eval(
    '.',
    assetLinks => assetLinks.map(link => link.href)
  );

  const results = [];

  // Visit each assets page one by one
  for (let assetsUrl of assetUrls) {
    await page.goto(assetsUrl);

    // Now collect all the ICO urls.
    const icoUrls = await page.$$eval(
      'a',
      links => links.map(link => link.href)
    );

    // Visit each ICO one by one and collect the data.
    for (let icoUrl of icoUrls) {
      await page.goto(icoUrl);

      const icoImgUrl = await page.$eval('#asset-logo-wrapper img', img => img.src);
      const icoName = await page.$eval('h1', h1 => h1.innerText.trim());
      // TODO: Gather all the needed info like description etc here.

      results.push([{
        icoName,
        icoUrl,
        icoImgUrl
      }]);
    }
  }
  
  // Results are ready
  console.log(results);
  
  // close the browser 
  await browser.close();
};

// run the async function
run();
