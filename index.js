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

    const addresses = [
        "https://www.curvedental.com/dental-charting-software/",
        "https://www.curvedental.com/dental-scheduling-software/",
        "https://www.curvedental.com/dental-billing-software",
        "https://www.curvedental.com/online-dental-forms",
        "https://www.curvedental.com/patient-portal",
        "https://www.curvedental.com/dental-report-software",
        "https://www.curvedental.com/dental-payment-processing",
        "https://www.curvedental.com/dental-image-software",
        "https://www.curvedental.com/perio-charting",
        "https://www.curvedental.com/dental-appointment-reminder-software/",
        "https://www.curvedental.com/dental-practice-management-software",
        "https://www.curvedental.com/eprescribe",
        "https://www.curvedental.com/filesletters",
        "https://www.curvedental.com/implementation",
        "https://www.curvedental.com/data-conversion",
        "https://www.curvedental.com/training",
        "https://www.curvedental.com/customer-service",
        "https://www.curvedental.com/dental-image-software#imaging-compatibility",
        "https://www.curvedental.com/hardware-requirements",
        "https://www.curvedental.com/status",
        "https://www.curvedental.com/packages",
        "https://www.curvedental.com/resources",
        "https://www.curvedental.com/resources#webinars",
        "https://www.curvedental.com/blog",
        "https://www.curvedental.com/curvecares",
        "https://www.curvedental.com/why-curve-rocks",
        "https://www.curvedental.com/about",
        "https://www.curvedental.com/leadership",
        "https://www.curvedental.com/careers",
        "https://www.curvedental.com/testimonials",
        "https://www.curvedental.com/contact",
        "https://www.curvedental.com/sitemap",
        "https://www.curvedental.com/why-curve-rocks",
        "https://go.curvedental.com/demo",
        "https://www.curvedental.com/partner-list",
        "https://www.curvedental.com/envoy",
    ]

    for (let i = 0; i < addresses.length; i++) {
        console.log(addresses[i]);
        const name = addresses[i].lastIndexOf('/');
        await page.goto(addresses[i], { "waitUntil": "networkidle2" })
        await page.screenshot({
            path: `curvedental-${name}-full.png`,
            fullPage: true
        });
    }

    for (let i = 0; i < addresses.length; i++) {
        console.log(addresses[i]);
        const name = addresses[i].lastIndexOf('/');
        await page.goto(addresses[i], { "waitUntil": "networkidle2" })
        await page.screenshot({
            path: `curvedental-${name}-fold.png`,
            fullPage: false
        });
    }

    // close the browser 
    await browser.close();
};

// run the async function
run();
