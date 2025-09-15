const express = require("express");
const cors = require("cors");
const convertRouter = require("./routes/convert");

const app = express();
const PORT = 3000;

// Autoriser toutes les origines (tous les domaines)
app.use(cors());

app.use("/convert", convertRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
