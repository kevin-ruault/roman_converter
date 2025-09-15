import { Router } from "express";
const router = Router();

const { integerToRoman } = require("../utils/romanConverter");

// Tableau pour stocker les clients connectés
let clients: any[] = [];

// SSE : ouvrir connexion
router.get("/", (req: any, res: any) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Envoyer un commentaire pour initialiser
  res.write(": connected\n\n");

  // Ajouter le client à la liste
  clients.push(res);

  // Supprimer le client à la fermeture
  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
});

// Route pour recevoir le nouveau nombre
router.get("/update", (req: any, res: any) => {
  const numParam = req.query.number;
  const num = parseInt(numParam, 10);

  if (isNaN(num) || num < 0 || num > 100) {
    // Envoyer l'erreur à tous les clients
    clients.forEach((client) =>
      client.write(`data: Invalid number (0-100)\n\n`)
    );
    return res.sendStatus(400);
  }

  const result = integerToRoman(num);

  // Envoyer le résultat à tous les clients connectés
  clients.forEach((client) => client.write(`data: ${result}\n\n`));

  res.sendStatus(200);
});

module.exports = router;
