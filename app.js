// Sélectionner button pour ajouter une task
const newOtherButton = document.querySelectorAll(".new_other_button");

let index = 0;

newOtherButton.forEach((button) => {
  button.addEventListener("click", () => {
    const arrayTaskListAccueil = document.querySelector(
      ".array_task_list_accueil"
    );

    const otherButton = document.createElement("div");
    otherButton.classList.add("other_button");
    otherButton.classList.add(`other_button_${index}`);

    const button = document.createElement("button");

    const select = document.createElement("select");
    select.name = "choice_icon";
    select.id = "choice_icon";

    const options = [
      { value: "work", emoji: "💼" },
      { value: "shopping", emoji: "🛒" },
      { value: "house", emoji: "🏠" },
    ];

    options.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.emoji;
      select.appendChild(option);
    });

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nom de la liste...";
    input.required = true;

    const valid = document.createElement("div");
    valid.classList = "valid";
    valid.textContent = "✔️";
    valid.style.paddingLeft = "10px";

    button.appendChild(select);
    button.appendChild(input);
    button.appendChild(valid);

    otherButton.appendChild(button);

    arrayTaskListAccueil.appendChild(otherButton);

    select.addEventListener("change", () => {
      console.log(`Icône sélectionnée : ${select.value}`);
    });

    input.addEventListener("input", () => {
      console.log(`Nom de la liste : ${input.value}`);
    });

    // Au clic sur le valid une nouvelle page html s'ouvre pour créer la liste
    valid.addEventListener("click", () => {
      window.location.href = "/html/task_list.html";
    });

    index++;
  });
});
