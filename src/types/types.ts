export type Post = {
  id: string;
  feedId: Feed['id'];
  title: string;
  pubDate: string;
  description: string;
  url: string;
  filename: string;
  filenameOnDisk: string;
  size: number;
  isRead: boolean;
};

export type FeedWithoutPosts = {
  title: string;
  description: string;
  id: string;
  link: string;
  url: string;
  lastChanged: string;
};

export type Feed = FeedWithoutPosts & {
  posts: Post['id'][];
};

export type ParsedFeed = FeedWithoutPosts & {
  posts: Post[];
};
