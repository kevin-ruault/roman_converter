const input = document.getElementById("sseNumberInput");
const resultSpan = document.getElementById("sseResult");

const evtSource = new EventSource("http://localhost:3000/convert-sse");

evtSource.onmessage = function (event) {
  resultSpan.textContent = event.data;
};

input.addEventListener("input", () => {
  const number = input.value;
  fetch(`http://localhost:3000/convert-sse/update?number=${number}`).catch(
    (err) => console.error(err)
  );
});
