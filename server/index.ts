import { ApolloServer, gql, PubSub } from "apollo-server-express";
import { archivists } from "./db";
import schema from "./schema";
import cookie from "cookie";
import http from "http";
import { app } from "./app";
import { origin, port, secret } from "./env";
import jwt from "jsonwebtoken";

const pubsub = new PubSub();
const server = new ApolloServer({
  schema,
  context: (session: any) => {
    //요청객체에 엑세스
    let req = session.connection
      ? session.connection.context.request
      : session.req;

    //구독

    if (session.connection) {
      req.cookies = cookie.parse(req.headers.cookie || "");
    }
    let cookies = req.cookies;

    let currentArchivist;
    if (req.cookies.authToken) {
      const archivistId = jwt.verify(req.cookies.authToken, secret) as string;
      currentArchivist =
        archivistId && archivists.find(a => a.archivistId === archivistId);
    }

    console.log({currentArchivist})

    return {
      pubsub,
      currentArchivist,
      res: session.res
    };
  },

  subscriptions: {
    onConnect(params, ws, ctx) {
      // 요청객체를 콘텍스트로 넘긴다.
      return {
        request: ctx.request
      };
    }
  }
});

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: { credentials: true, origin }
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
