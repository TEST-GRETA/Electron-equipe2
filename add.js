document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const { value } = document.querySelector("input");
  api.send("todo:add", value);
});
