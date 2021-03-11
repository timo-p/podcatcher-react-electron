import faker from 'faker';
import { Feed, Post } from '../types/types';

export default function generatePost(feedId: Feed['id']): Post {
  return {
    id: faker.random.uuid(),
    feedId,
    title: faker.lorem.words(),
    pubDate: faker.date.past().toString(),
    description: faker.lorem.sentence(),
    url: faker.fake('{{internet.url}}/{{lorem.word}}.mp3'),
    filename: faker.lorem.word(),
    size: faker.random.number(),
    isRead: false,
  };
}
