document.addEventListener("DOMContentLoaded", () => {
  let currentPageElement = document.querySelector(".page");

  initializePageEvents(currentPageElement);

  initializePageNavigation();
});

// -------------------------------------------------------------------------------------------------------------
// Ensemble des constantes
let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");
let taskp = document.getElementById("taskp");
let taskp_true = document.getElementById("taskp_true");

const list = document.createElement("li");

let arrayChores = [];

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const tC = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
const checkbox = document.createElement("input");
const trask = document.createElement("img");
const arrayList = { value: `${taskInput.value.trim()}` };
const tCount = taskList.children.length;
const tCountMoins = tCount - 1;
let liste = document.querySelectorAll("li");

const chevronRight = document.querySelector(".chevron_right_1");
const chevronLeft = document.querySelector(".chevron_left_2");

const previousPage = document.getElementById("Page_1");

// Création d'une copie du DOM original
const currentPage = document.querySelector(".page");
let currentPageOriginal = currentPage.cloneNode(true);

// -------------------------------------------------------------------------------------------------------------
// Fonction pour incrémenter et décrémenter le nombre de tâches de checkbox.checked
function incrementCheckbox() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const tC = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  ).length;
  taskCount_true.innerText = `Nombres de tâches réalisées : ${tC}`;
}

// -------------------------------------------------------------------------------------------------------------
// Fonction pour inclure les valeurs inclusent dans le taskInout dans le taskList, ajouter un checkbox et des poubelles
function addTask() {
  const list = document.createElement("li");
  list.style.listStyle = "none";
  list.style.display = "flex";
  list.style.alignItems = "center";
  list.style.height = "33px";
  list.style.maxWidth = "70%";
  list.style.marginTop = "10px";
  list.classList.add("tache");
  list.innerText = `${taskInput.value.trim()}`;

  // Ajouter un checkbox devant chaque tâche
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  list.prepend(checkbox);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked === true) {
      Array.from(taskList.children).filter((li) => {
        const checkbox = li.querySelector("input[type='checkbox']");
        return checkbox && checkbox.checked;
      });
      list.classList.add("completed");
      console.log(`La tâche "${list.innerText.trim()}" a bien été cochée `);

      console.log(list.innerText.trim());

      incrementCheckbox();
    } else {
      list.classList.remove("completed");
      console.log(`La tâche "${list.innerText.trim()}" a bien été décochée `);

      incrementCheckbox();
    }
  });

  // Constante image de poubelle sur chaque <li> de la liste
  const trask = document.createElement("img");
  trask.src = "/pictures/trask.png";
  trask.alt = "Supprimer tâche";
  trask.classList = "poubelle";
  trask.style.alignItems = "center";
  trask.style.width = "25px";
  trask.style.height = "auto";
  trask.style.position = "absolute";
  trask.style.left = "67%";

  // Création d'un objet pour intégrer la valeur du taskInput dans la tâche qui est supprimée
  const arrayList = { value: `${taskInput.value.trim()}` };

  // Ajout d'un évènement pour supprimer un élément de la liste
  trask.addEventListener("click", () => {
    alert("Voulez-vous vraiment supprimer cette tâche ?");
    const tCount = taskList.children.length;
    const tCountMoins = tCount - 1;
    taskCount.innerText = `Nombres de tâches : ${tCountMoins}`;

    arrayChores = arrayChores.filter((item) => item !== taskInput.value.trim());
    console.log(`La tâche "${arrayList.value}" a bien été supprimée`);
    list.remove();
    incrementCheckbox();
  });

  list.appendChild(trask);

  taskList.appendChild(list);

  arrayChores.push(taskInput.value.trim());

  taskInput.value = "";
}

// -------------------------------------------------------------------------------------------------------------

// Fonction pour faire une incrémentation des différentres taches dans un p pour compter le nombre de tache PRESENTE dans le taskList
function iterateTask() {
  const tCount = taskList.children.length;
  taskCount.innerText = `Nombre de tâches : ${tCount}`;

  let liste = document.querySelectorAll("li");
  liste.innerText = `Tâche ${tCount + 1}`;
}

// -------------------------------------------------------------------------------------------------------------

function initializePageEvents(page) {
  const taskInput = page.querySelector("#taskInput");
  const addTaskBtn = page.querySelector("#addTaskBtn");
  const taskList = page.querySelector("#taskList");
  const taskCount = page.querySelector("#taskCount");
  const taskCountTrue = page.querySelector("#taskCount_true");

  // Fonction pour ajouter une tâche sur cette page
  function addTaskToPage() {
    const taskValue = taskInput.value.trim();
    if (taskValue === "") {
      alert("Le champ est vide");
      return;
    } else if (
      Array.from(taskList.children).some(
        (li) => li.innerText.trim() === taskValue
      )
    ) {
      alert(`La tâche "${taskInput.value.trim()}" est déjà présente`);
      taskInput.value = "";
    } else {
      const list = document.createElement("li");
      list.style.listStyle = "none";
      list.style.display = "flex";
      list.style.alignItems = "center";
      list.style.height = "33px";
      list.style.maxWidth = "70%";
      list.style.marginTop = "10px";
      list.classList.add("tache");
      list.innerText = taskValue;

      // Ajouter une case à cocher
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      list.prepend(checkbox);

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          list.classList.add("completed");
        } else {
          list.classList.remove("completed");
        }
        updateTaskCount();
      });

      // Ajouter une poubelle
      const trask = document.createElement("img");
      trask.src = "/pictures/trask.png";
      trask.alt = "Supprimer tâche";
      trask.classList = "poubelle";
      trask.style.width = "25px";
      trask.style.height = "auto";
      trask.style.position = "absolute";
      trask.style.left = "67%";

      trask.addEventListener("click", () => {
        if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
          list.remove();
          updateTaskCount();
        }
      });

      list.appendChild(trask);
      taskList.appendChild(list);
      taskInput.value = "";
      updateTaskCount();
    }
  }

  // Fonction pour mettre à jour le nombre de tâches
  function updateTaskCount() {
    const totalTasks = taskList.children.length;
    const completedTasks = Array.from(taskList.children).filter(
      (li) => li.querySelector("input[type='checkbox']").checked
    ).length;
    taskCount.querySelector("p").innerText = `Nombre de tâches : ${totalTasks}`;
    taskCountTrue.querySelector(
      "p"
    ).innerText = `Nombre de tâches réalisées : ${completedTasks}`;
  }

  // Événement pour le bouton "Ajouter"
  addTaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addTaskToPage();
  });
}

// -------------------------------------------------------------------------------------------------------------

// Fonction pour contrôler les chevrons de droite et de gauche
function initializePageNavigation() {
  const book = document.querySelector(".book");
  let currentPage = document.querySelector(".page");

  let currentPageIndex = 1;

  const currentPageOriginal = currentPage.cloneNode(true);

  // Créer de nouvelles page lorsqu'on clique sur le chevron de droite
  const chevronRight = document.querySelector(".chevron_right_1");

  chevronRight.addEventListener("click", () => {
    const previousPage = document.getElementById("Page_1");
    let newPage = document.getElementById(`Page_${currentPageIndex + 1}`);

    console.log(`Page actuelle : ${currentPageIndex + 1}`);

    if (!newPage) {
      const newPage = document.createElement("div");
      newPage.classList.add("page", "current_page");
      newPage.id = `Page_${currentPageIndex + 1}`;
      newPage.innerHTML = currentPageOriginal.innerHTML;
      book.appendChild(newPage);

      initializePageEvents(newPage);

      newPage.style.display = "flex";
      previousPage.style.display = "none";

      newPage.querySelector("h5").innerText = `Page ${currentPageIndex + 1}`;

      const specialChevronRight = newPage.querySelector(".chevron_right_1");
      const specialChevronLeft = newPage.querySelector(".chevron_left_1");

      if (specialChevronRight) {
        specialChevronRight.classList.remove("chevron_right_1");
        specialChevronRight.classList.add("chevron_right_2");
        if (specialChevronLeft) {
          specialChevronLeft.classList.remove("chevron_left_1");
          specialChevronLeft.classList.add(
            `chevron_left_${currentPageIndex + 1}`
          );
        }
      }

      if (specialChevronLeft) {
        // Retourner aux pages précédentes avec le chevron de gauche
        const chevronLeft2 = document.querySelector(".chevron_left");
        const chevronLeft = document.querySelector(".chevron_left_2");

        chevronLeft.addEventListener("click", () => {
          console.log(`Page actuelle : ${currentPageIndex}`);

          const previousPage = document.getElementById("Page_1");

          newPage.style.display = "none";
          previousPage.style.display = "flex";
        });
      }
    } else {
      newPage.style.display = "flex";
      previousPage.style.display = "none";
    }

    // currentPageIndex++;

    // let currentPage = document.querySelector(".page");

    // currentPage = newPage;
    // currentPageIndex++;
  });
}
