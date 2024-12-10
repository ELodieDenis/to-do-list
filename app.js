// Constantes
const newOtherButton = document.querySelector(".new_other_button");
const choiceIcon = document.getElementById("choice_icon");
const nameInput = document.querySelector(".new_other_button input");
const addButton = document.querySelector(".add_button");
const taskListContainer = document.querySelector(".task_list_container");

let index = 0;

// Charger les boutons sauvegardées dans le localStorage
function loadButtons() {
  const buttons = JSON.parse(localStorage.getItem("taskButtons")) || [];
  buttons.forEach((task) => {
    addTaskToDOM(task.icon, task.name);
  });
}

// Ajouter un bouton dans la liste DOM
function addTaskToDOM(icon, name) {
  const newTaskList = document.createElement("div");
  newTaskList.classList = `numberTask_${index} numberTask`;
  newTaskList.setAttribute("data-url", `/html/task_list_${index}.html`);
  newTaskList.innerHTML = `
    <button>
      ${icon}
      <span>${name}</span>
    </button>
  `;
  taskListContainer.appendChild(newTaskList);

  index++;
}

// Ajouter un bouton au clic sur add_button
addButton.addEventListener("click", () => {
  const icon =
    choiceIcon.value === "shopping"
      ? "🛒"
      : choiceIcon.value === "work"
      ? "💼"
      : "🏠";

  const name = nameInput.value.trim();
  let arrayNameButton = [];

  if (!name) {
    alert("Veuillez entrer un nom de liste valide !");
    return;
  } else {
    const nameButtons = JSON.parse(localStorage.getItem("nomBoutons")) || [];
    nameButtons.push(name);
    localStorage.setItem("nomBoutons", JSON.stringify(nameButtons));

    console.log(`Valeur enregistrée : ${name}`);
  }

  const newButton = { icon, name };

  addTaskToDOM(icon, name);

  const savedButtons = JSON.parse(localStorage.getItem("taskButtons")) || [];
  savedButtons.push(newButton);
  localStorage.setItem("taskButtons", JSON.stringify(savedButtons));

  nameInput.value = "";
});

loadButtons();

// -------------------------------------------------------------------------------------------------------------

//Ajouter page task list au clic sur les boutons

// numberTask.forEach((numberTasks) => {
//   numberTasks.addEventListener("click", (event) => {
//     const taskName = event.target.textContent.trim();

//     window.location.href = `/html/task_list.html`;
//   });
// });

// -------------------------------------------------------------------------------------------------------------

// Supprimer toute la liste des tâches avec le bouton clear button
const clearButton = document.querySelector(".clear_button img");

clearButton.addEventListener("click", () => {
  localStorage.clear("taskButtons");
  taskListContainer.innerHTML = "";
});

// Lier chaque bouton à une page taskList
document.addEventListener("DOMContentLoaded", () => {
  const numberTask = document.querySelectorAll(".numberTask");

  numberTask.forEach((numberTasks) => {
    numberTasks.addEventListener("click", (event) => {
      const url = event.currentTarget.getAttribute("data-url");
      console.log(url);

      if (url) {
        window.location.href = url;
      } else {
        console.error("Aucune URL définie pour ce bouton");
      }
    });
  });
});
