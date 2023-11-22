import { load } from 'cheerio';
import SiteRepositorie from './repositories/site.repositorie';
import instance from './config/axios.config';
import LinkRepositorie from './repositories/link.repositorie';

async function getSiteByURL(url: string) {
  const { data } = await instance.get(url);
  return data;
}

function isValidURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

async function createSite(url: string, content: any, origin: any) {
  const $ = load(content);
  const links = $('a');
  const title = $('title').text();
  const description =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    'Não identificada.';
  let favicon_url =
    $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');

  if (favicon_url && !favicon_url.includes('http') && !favicon_url.includes('//')) {
    favicon_url = url + favicon_url;
  }

  const originSite = await SiteRepositorie.create({
    url,
    favicon_url: favicon_url as string,
    title,
    description: description as string,
  });

  if (origin) {
    await LinkRepositorie.create({
      origin_id: origin.id,
      destiny_id: originSite.id,
    });
  }

  for (let j = 0; j <= links.length - 1; j++) {
    const destinyURL = $(links[j]).attr('href');
    const regexURL = new RegExp(title, 'i');
    const regexTitle = new RegExp(url, 'i');

    if (
      destinyURL &&
      !regexTitle.test(destinyURL) &&
      !regexURL.test(destinyURL) &&
      isValidURL(destinyURL)
    ) {
      const destinySiteContent = await getSiteByURL(destinyURL);
      await createSite(destinyURL, destinySiteContent, originSite);
    }
  }
}

export default async function crawler() {
  try {
    console.log('🕐 Crawler is working...');

    const storageSites = await SiteRepositorie.findAll();

    const urls: string[] = [
      'https://pt.semrush.com/blog/top-100-sites-mais-visitados/',
      'https://www.nuvemshop.com.br/blog/site-de-compras/',
      'https://www.oficinadanet.com.br/tecnologia/26279-os-10-maiores-sites-de-torrents-em-2019',
      'https://www.facebook.com',
      'https://www.instagram.com',
      'https://myanimelist.net',
      'https://www.youtube.com',
      'https://www.amazon.com.br',
      'https://pt.aliexpress.com',
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

    const promises: Promise<any>[] = sites.map(getSiteByURL);
    const sitesContent = await Promise.all(promises);

    for (let i = 0; i <= sitesContent.length - 1; i++) {
      try {
        await createSite(sites[i], sitesContent[i], null);
      } catch {
        continue;
      }
    }

    console.log('✅ Web sites registered with success!');
  } catch (error: any) {
    console.log('❗ CRAWLER ERROR:', error);
  }
}
