import crypto from 'crypto';
import { isAfter } from 'date-fns';
import path from 'path';
import rp from 'request-promise-native';
import url from 'url';
import xml2js from 'xml2js';
import { ParsedFeed } from '../types/types';

const hash = (str: string): string =>
  crypto.createHash('sha256').update(str, 'utf8').digest().toString('hex');

type AtomLinkType = {
  $: {
    href: string;
  };
};

type XmlPostType = {
  enclosure:
    | {
        $: {
          url: string;
          length: string;
        };
      }[]
    | undefined;
  guid: {
    _: string | undefined;
    toString: () => string;
  }[];
  pubDate: string[];
  title: string[];
  description: string[] | undefined;
};

type XmlFeedType = {
  'atom:link': AtomLinkType[] | undefined;
  'atom10:link': AtomLinkType[] | undefined;
  link: string[] | undefined;
  title: string[];
  description: string[];
  item: XmlPostType[] | undefined;
};

type FeedWithoutUrl = Omit<ParsedFeed, 'url'>;

export async function parseFeed(
  xml: string,
  ignoreOlderThan: Date
): Promise<FeedWithoutUrl> {
  try {
    const result = await xml2js.parseStringPromise(xml);
    const f: XmlFeedType = result.rss.channel[0];
    const link =
      f['atom:link']?.[0].$.href || f['atom10:link']?.[0].$.href || f.link?.[0];

    const feed = {
      title: f.title[0],
      description: f.description[0],
      id: hash(link!),
      link: link!,
      url: '',
      lastChanged: new Date().toString(),
    };

    const posts =
      f.item
        ?.filter((item) => item.enclosure)
        .map((item) => {
          const postUrl = item.enclosure![0].$.url;
          const parsedUrl = url.parse(postUrl);
          const filename = path.basename(parsedUrl.pathname!);
          const guid = item.guid?.[0]._ || item.guid?.[0].toString();

          return {
            id: hash(feed.id + guid + postUrl + item.pubDate[0]),
            feedId: feed.id,
            title: item.title[0],
            pubDate: item.pubDate[0],
            description: item.description?.[0] || '',
            url: postUrl,
            filename,
            size: parseInt(item.enclosure![0].$.length, 10),
            isRead: false,
          };
        })
        .filter((post) => isAfter(new Date(post.pubDate), ignoreOlderThan)) ||
      [];

    return {
      ...feed,
      posts,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function fetchFeed(
  feedUrl: string,
  ignoreOlderThan: Date
): Promise<ParsedFeed> {
  console.log(`Fetching url ${feedUrl}`);
  const options = {
    url: feedUrl,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.121 Safari/537.36 Vivaldi/1.95.1077.41',
    },
  };
  try {
    const response = await rp(options);
    const feedWithoutUrl = await parseFeed(response, ignoreOlderThan);
    return { ...feedWithoutUrl, url: feedUrl };
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
}
