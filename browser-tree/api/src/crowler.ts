import { load } from 'cheerio';
import SiteRepositorie from './repositories/site.repositorie';
import instance from './config/axios.config';

export default async function crawler() {
  try {
    console.log('🕐 Crawler is working...');

    const storageSites = await SiteRepositorie.findAll(['url']);

    const urls: string[] = [
      'https://www.facebook.com/',
      'https://www.instagram.com/',
      'https://stackoverflow.com/',
      'https://myanimelist.net',
      'https://www.youtube.com/',
      'https://www.amazon.com.br/',
      'https://pt.aliexpress.com/',
      'https://www.google.com',
      'https://www.wikipedia.org',
      'https://twitter.com',
      'https://www.microsoft.com',
      'https://www.netflix.com',
      'https://www.linkedin.com',
      'https://github.com',
      'https://about.gitlab.com',
      'https://www.apple.com',
      'https://www.reddit.com',
      'https://wordpress.org',
      'https://www.tumblr.com',
      'https://edition.cnn.com',
      'https://www.bbc.com',
      'https://www.craigslist.org',
      'https://www.oracle.com',
      'https://www.mozilla.org',
      'https://www.quora.com',
      'https://www.dropbox.com',
      'https://www.salesforce.com',
      'https://www.weather.com',
      'https://www.flickr.com',
      'https://www.imgur.com',
      'https://www.duckduckgo.com',
      'https://www.ebay.com',
      'https://www.bing.com',
      'https://www.accenture.com',
      'https://www.wix.com',
      'https://www.pandora.com',
      'https://www.myspace.com',
      'https://www.groupon.com',
    ];

    const sites = urls.filter((url) => storageSites.every((site) => url !== site.url));

    const promises: Promise<any>[] = sites.map(async (url) => {
      const { data } = await instance.get(url);
      return data;
    });
    const sitesContent = await Promise.all(promises);

    for (let i = 0; i <= sitesContent.length - 1; i++) {
      const site = sitesContent[i];
      const url = sites[i];
      const $ = load(site);

      const title = $('title').text();
      const description =
        $('meta[name="description"]').attr('content') ||
        $('meta[property="og:description"]').attr('content');
      const favicon_url =
        $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');

      await SiteRepositorie.create({
        url,
        favicon_url: favicon_url as string,
        title,
        description: description as string,
      });
    }

    console.log('✅ Web sites registered with success!');
  } catch (error: any) {
    console.log('❗ CRAWLER ERROR:', error);
  }
}
