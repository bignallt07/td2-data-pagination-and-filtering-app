/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*************
 * List of selected elements and variable delcarations
 ************/
const header = document.querySelector(".header");
let searchDiv = document.createElement("div");
searchDiv.id = "searchBarDiv";
searchDiv.innerHTML = `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;
header.appendChild(searchDiv);
const button = header.querySelector("#searchBarDiv button");
const input = header.querySelector("#search");

// Created this UL because "student-list" used in more than one function
let ulOfStudents = document.querySelector(".student-list");

const itemsPerPage = 9;

/*************
 * Functions
 ************/

/**
 * `showPage` function
 * 
 * Description: This function will create and insert/append the elements needed to display a "page" of nine students.
 * 
 * @param { Array } list - Of data to display
 * @param { Number } page - A provided page number to perform Math and provide correct amount of cards
 * 
 * @returns { output } - Performs task of displaying elements to the page. 
*/

function showPage(list, page) {
   const startIndex = (page * itemsPerPage ) - itemsPerPage; 
   const endIndex = page * itemsPerPage;
   ulOfStudents.innerHTML = "";
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let li = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
         ulOfStudents.insertAdjacentHTML("beforeend", li);
      }    
   }
}

/** 
 * `addPagination` function
 * 
 * Description: This function will create and insert/append the elements needed for the pagination buttons.
 *              Displays all buttons to the page, and then adds and removes an active class
 *              Note: Event Listner used on the created UL to update the buttons
 * 
 * @param { array } list - Data, specifically length of data to create required buttons
 * 
 * @returns { output } - Reloads the showPage function update display. IMPORTANT sends an updated second param
 * 
*/

function addPagination(list) {
   // Math.ciel because we will need a page for remainder (spillover) data
   const numOfButtons = Math.ceil( list.length / itemsPerPage );           
   let ulPagination = document.querySelector(".link-list");
   ulPagination.innerHTML = "";

   // Loop through the required number of buttons, to create buttons
   for (let i = 0; i < numOfButtons; i++) {
      let li = `
         <li>
            <button type="button">${i + 1}</button>
         </li>
      `;
      ulPagination.insertAdjacentHTML("beforeend", li);  
   }
   
   /*
   Traverse to the UL to get to the first button and add an active
   ONLY IF there is more than one character entered
   */
   if (list.length > 0) {
      let liList = ulPagination.firstElementChild;
      let firstButton = liList.firstElementChild;
      firstButton.className = "active";
   } else {
      ulOfStudents.innerHTML = "<h1 class='no-results'>No Results to Display</h1>";
   }
    
   // Function Event Listener: - Listening for button clicks, remove active class and reassign to clicked button
   ulPagination.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
         let clickedButton = e.target;
         for (let i = 0; i < numOfButtons; i++) {
            let button = ulPagination.children[i].firstElementChild;
            button.classList.remove("active")
         }
         clickedButton.className = "active";

         // Reload the 'showPage' function to update page display
         showPage(list, clickedButton.textContent);
         }
   });
}

/**
 *  EXTRA CREDIT
 * `performSearch` function
 * 
 * Description: Accept input from the user to match it to data.js
 *             Everytime function is executed, it creates a local array that stores names that match the input
 * 
 * @param { string } inputValue - Letter(s) entered by the user in the searchbox 
 * @param {*} names - List of data from data.js
 */

function performSearch(inputValue, names) {
   let arrayAccept = [];
   for (let i = 0; i < names.length; i++) {
      let fullName = `${names[i].name.first.toLowerCase()} ${names[i].name.last.toLowerCase()}`;
      if (fullName.includes(inputValue) ) {
         arrayAccept.push(names[i]);
      }
   }

   // Run both showPage and addPagination functions with the new, local array
   showPage(arrayAccept, 1);
   addPagination(arrayAccept);
}

/*************
 * Event Listeners 
 * 1 x every key press
 * 1 x when the button in pressed (or enter clicked)
*************/

input.addEventListener("keyup", () => {
   performSearch(input.value.toLowerCase(), data);
});

button.addEventListener("submit", () => {
   performSearch(input.value.toLowerCase(), data);
});

/*************
 * Function calls to set up the page
 ************/
showPage(data, 1);
addPagination(data);
