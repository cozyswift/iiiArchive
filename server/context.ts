import { PubSub } from 'apollo-server-express';
import { Archivist } from './db';
export type MyContext = {
  pubsub: PubSub;
  currentArchhivist: Archivist;
};
