const express = require("express");


const app = express();
const port = 8080

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {

  console.log(`[Server]: Server is running at http://localhost:${port}`);
});
