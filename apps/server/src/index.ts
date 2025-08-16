import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./database";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { createContext } from "./middleware/context";

// Load environment variables
dotenv.config();

async function startServer() {
  try {
    // Connect to MongoDB Atlas
    await connectDatabase();
    console.log("📊 Database connection established");

    // Create Express app
    const app = express();
    const httpServer = createServer(app);

    // Create executable GraphQL schema
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Create WebSocket server for subscriptions
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/graphql",
    });

    // Use graphql-ws to handle subscriptions
    const serverCleanup = useServer({ schema }, wsServer);

    // Create Apollo Server instance
    const server = new ApolloServer({
      introspection: true,
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    });

    // Start Apollo Server
    await server.start();
    // Enable CORS and JSON body parsing before Apollo middleware
    app.use(
      "/graphql",
      cors(),
      express.json(), // parse req.body before Apollo middleware
      expressMiddleware(server, {
        context: async ({ req }) => createContext({ req }),
      })
    );

    // Health check endpoint
    app.get("/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        database: "Connected",
        timestamp: new Date().toISOString(),
      });
    });

    // Start the HTTP server
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
      console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
      console.log(`💚 Health check at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Start server
startServer();
