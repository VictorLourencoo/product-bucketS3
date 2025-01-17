import express from 'express';
import { BuildBucket } from './Infraestructure/Bucket/buckets';
import { Dependencies } from './dependences';
import { setupRoutes } from './Infraestructure/events/root';


export function createApp() {
  const app = express();
  app.use(express.json())

  const BUCKET = BuildBucket()
  const DEPENDENCIES: Dependencies = {
    BUCKET
  }

  setupRoutes(app, DEPENDENCIES);
  return app;
}
