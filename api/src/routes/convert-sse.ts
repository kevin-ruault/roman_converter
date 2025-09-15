import { Router } from "express";
const router = Router();

const { integerToRoman } = require("../utils/romanConverter");

let clients: any[] = [];

router.get("/", (req: any, res: any) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write(": connected\n\n");

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
});

router.get("/update", (req: any, res: any) => {
  const numParam = req.query.number;
  const num = parseInt(numParam, 10);

  if (isNaN(num) || num < 0 || num > 100) {
    clients.forEach((client) =>
      client.write(`data: Invalid number (0-100)\n\n`)
    );
    return res.sendStatus(400);
  }

  const result = integerToRoman(num);

  clients.forEach((client) => client.write(`data: ${result}\n\n`));

  res.sendStatus(200);
});

module.exports = router;
