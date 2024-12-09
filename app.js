// // Sélecteurs
// const addButton = document.getElementById('add_button');
// const choiceIcon = document.getElementById('choice_icon');
// const nameInput = document.querySelector('.new_other_button input');
// const taskListContainer = document.getElementById('task_list_container');

// // Charger les boutons sauvegardés
// function loadButtons() {
//     const savedButtons = JSON.parse(localStorage.getItem('taskButtons')) || [];
//     savedButtons.forEach(buttonData => {
//         createTaskButton(buttonData.icon, buttonData.name);
//     });
// }

// // Créer un bouton de tâche et l'ajouter au DOM
// function createTaskButton(icon, name) {
//     const buttonDiv = document.createElement('div');
//     buttonDiv.classList.add('task-button');
//     buttonDiv.innerHTML = `
//         <button>
//             ${icon} ${name}
//         </button>
//     `;
//     taskListContainer.appendChild(buttonDiv);
// }

// // Ajouter un nouveau bouton lors du clic sur "add_button"
// addButton.addEventListener('click', () => {
//     const icon = choiceIcon.value === "shopping" ? "🛒" :
//                  choiceIcon.value === "work" ? "💼" : "🏠";
//     const name = nameInput.value.trim();

//     if (!name) {
//         alert("Veuillez entrer un nom pour la liste !");
//         return;
//     }

//     // Créer un objet pour le nouveau bouton
//     const newButton = { icon, name };

//     // Ajouter dans le DOM
//     createTaskButton(icon, name);

//     // Ajouter au localStorage
//     const savedButtons = JSON.parse(localStorage.getItem('taskButtons')) || [];
//     savedButtons.push(newButton);
//     localStorage.setItem('taskButtons', JSON.stringify(savedButtons));

//     // Réinitialiser le champ texte
//     nameInput.value = '';
// });

// // Charger les boutons existants au démarrage
// loadButtons();

// // Sélectionner button pour ajouter une task
// const addButton = document.querySelectorAll(".add_button");

// let index = 0;

// addButton.forEach((button) => {
//   button.addEventListener("click", () => {
//     const arrayTaskListAccueil = document.querySelector(
//       ".array_task_list_accueil"
//     );

//     const otherButton = document.createElement("div");
//     otherButton.classList.add("other_button");
//     otherButton.classList.add(`other_button_${index}`);

//     const button = document.createElement("button");

//     const select = document.createElement("select");
//     select.name = "choice_icon";
//     select.id = "choice_icon";

//     const options = [
//       { value: "work", emoji: "💼" },
//       { value: "shopping", emoji: "🛒" },
//       { value: "house", emoji: "🏠" },
//     ];

//     options.forEach((optionData) => {
//       const option = document.createElement("option");
//       option.value = optionData.value;
//       option.textContent = optionData.emoji;
//       select.appendChild(option);
//     });

//     const input = document.createElement("input");
//     input.type = "text";
//     input.placeholder = "Nom de la liste...";
//     input.required = true;

//     const valid = document.createElement("div");
//     valid.classList = "valid";
//     valid.textContent = "✔️";
//     valid.style.paddingLeft = "10px";

//     button.appendChild(select);
//     button.appendChild(input);
//     button.appendChild(valid);

//     otherButton.appendChild(button);

//     arrayTaskListAccueil.appendChild(otherButton);

//     select.addEventListener("change", () => {
//       console.log(`Icône sélectionnée : ${select.value}`);
//     });

//     input.addEventListener("input", () => {
//       console.log(`Nom de la liste : ${input.value}`);
//     });

//     // Au clic sur le valid une nouvelle page html s'ouvre pour créer la liste
//     valid.addEventListener("click", () => {
//       window.location.href = "/html/task_list.html";
//     });

//     index++;
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const arrayContainer = document.getElementById("task_list_container");
//   const addButton = document.getElementById("add_button");

//   // Charger les boutons sauvegardés
//   function loadButtons() {
//     const options = [
//       { value: "work", emoji: "💼" },
//       { value: "shopping", emoji: "🛒" },
//       { value: "house", emoji: "🏠" },
//     ];

//     const optionsJSON = JSON.stringify(options);

//     localStorage.setItem("options", optionsJSON);

//     console.log(localStorage.getItem("options"));

//     // let buttons = JSON.parse(localStorage.getItem("buttons") || "[]");
//     // arrayContainer.innerHTML = "";
//     // buttons.forEach((buttonData, index) => {
//     //   const button = document.createElement("button");
//     //   button.innerHTML = `Bouton ${index + 1}`;

//     //   button.onclick = () => {
//     //     // Action du bouton ici
//     //     alert(`Vous avez cliqué sur Bouton ${index + 1}`);
//     //   };
//     //   arrayContainer.appendChild(button);
//     // });
//   }

//   // Ajouter un nouveau bouton
//   addButton.addEventListener("click", () => {
//     let buttons = JSON.parse(localStorage.getItem("buttons") || "[]");
//     buttons.push({ text: `Bouton ${buttons.length + 1}` }); // Ajout simple
//     localStorage.setItem("buttons", JSON.stringify(buttons));
//     loadButtons(); // Rafraîchir l'affichage
//   });

//   loadButtons();
// });

// Constantes
const newOtherButton = document.querySelector(".new_other_button");
const choiceIcon = document.querySelector(".choice_icon");
const nameInput = document.querySelector(".new_other_button input");
const addButton = document.querySelector(".add_button");
const taskListContainer = document.querySelector(".task_list_container");

// Charger les boutons sauvegardées dans le localStorage
function loadButtons() {
  const buttons = JSON.parse(localStorage.getItem("tasks")) || [];
  buttons.forEach((task) => {
    addTaskToDOM(task.icon, task.name);
  });
}

// Ajouter un bouton dans la liste DOM
function addTaskToDOM(icon, name) {
  const newTaskList = document.createElement("div");
  newTaskList.innerHTML = `
    <button>
      ${icon}
      <span>${name}</span>
    </button>
  `;
  taskListContainer.appendChild(newTaskList);
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

  if (!name) {
    alert("Veuillez entrer un nom de liste valide !");
    return;
  }

  const newButton = { icon, name };

  addTaskToDOM(icon, name);

  const savedButton = JSON.parse(localStorage.getItem("taskButtons"));
});
