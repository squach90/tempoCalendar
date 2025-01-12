const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cron = require("node-cron");
const port = 3000;
const { main } = require("./back.js");

// Servir les fichiers statiques depuis le répertoire courant
app.use(express.static(__dirname));

// Route pour servir index.html à la racine
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route pour récupérer l'historique
app.get("/getHistory", (req, res) => {
  fs.readFile("info.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Erreur lors de la lecture du fichier");
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

cron.schedule("10 6 * * *", () => {
  // -1h car serveur -> different timezone
  console.log("Exécution de main() à", new Date().toLocaleString());
  main();
});
