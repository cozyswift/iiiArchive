import { PubSub } from "apollo-server-express";
import { Archivist } from "./db";
import { Response } from "express";

export type MyContext = {
  pubsub: PubSub;
  currentArchivist: Archivist;
  res: Response;
};
