const express = require("express"); // CommonJS import

const app = express();
const PORT = 3000;

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
