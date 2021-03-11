import faker from 'faker';
import { Feed } from '../types/types';

export default function generateFeed(): Feed {
  return {
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    id: faker.random.uuid(),
    link: faker.fake('{{internet.url}}/{{lorem.word}}.mp3'),
    url: faker.internet.url(),
    lastChanged: faker.date.past().toString(),
    posts: [],
  };
}
