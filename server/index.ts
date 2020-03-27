import { ApolloServer, gql, PubSub } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { materialList, archivists } from "./db";
import schema from "./schema";
import cookieParser from "cookie-parser";

const app = express();

const origin = process.env.ORIGIN || "http://localhost:3000";
app.use(cors({ credentials: true, origin }));
app.use(express.json());
app.use(cookieParser());
// app.get("/_ping", (req, res) => {
//   res.send("pong");
// });

// app.get("/materials", (req, res) => {
//   res.json(materialList);
// });

const pubsub = new PubSub();
const server = new ApolloServer({
  schema,
  context: (session: any) => {
    // let req = session.connection
    //   ? session.connection.context.request
    //   : session.req;

    return {
      pubsub,
      archivist: archivists.find(a => a.id === "")
    };
  }
});

server.applyMiddleware({
  app,
  path: "/graphql",
  cors:{credentials:true,origin}
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
