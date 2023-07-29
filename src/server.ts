import { app } from "./app";

const start = async () => {
  try {
  } catch (error) {}
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
  });
};

start();
