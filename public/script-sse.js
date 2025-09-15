const input = document.getElementById("sseNumberInput");
const resultSpan = document.getElementById("sseResult");

// Ouvrir la connexion SSE
const evtSource = new EventSource("http://localhost:3000/convert-sse");

// Mettre à jour le résultat à chaque message reçu
evtSource.onmessage = function (event) {
  resultSpan.textContent = event.data;
};

// Envoyer le nombre au serveur à chaque changement
input.addEventListener("input", () => {
  const number = input.value;
  fetch(`http://localhost:3000/convert-sse/update?number=${number}`).catch(
    (err) => console.error(err)
  );
});
