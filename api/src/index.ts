const express = require("express");
const cors = require("cors");
const convertRouter = require("./routes/convert");
const convertSseRouter = require("./routes/convert-sse");

const app = express();
const PORT = 3000;

app.use(cors());

app.use("/convert", convertRouter);
app.use("/convert-sse", convertSseRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
