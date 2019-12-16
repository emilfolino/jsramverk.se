const { exec } = require('child_process');
const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('https://jsramverk.se/', {
    stripQuerystring: false
});

// register event listeners
generator.on('done', () => {
    // sitemaps created

    console.log("sitemap generated");
    exec('rsync -av sitemap.xml efo@jsramverk.se:/var/www/jsramverk.se/html/', (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        console.log("sitemap uploaded");
    });
});

// start the crawler
generator.start();
