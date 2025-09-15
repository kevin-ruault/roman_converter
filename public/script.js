const input = document.getElementById("numberInput");
const button = document.getElementById("convertBtn");
const resultSpan = document.getElementById("result");

button.addEventListener("click", () => {
  const number = input.value;

  fetch(`http://localhost:3000/convert?number=${number}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        resultSpan.textContent = data.error;
      } else {
        resultSpan.textContent = data.result;
      }
    })
    .catch((err) => {
      resultSpan.textContent = "Erreur serveur";
      console.error(err);
    });
});
