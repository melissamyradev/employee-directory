//media query
const mqSmall = window.matchMedia( "(max-width: 767px)" );

//search
const searchButton = document.querySelector(".button_search");
const searchBar = document.getElementById("search");

//directory
const main = document.querySelector('main');
const cardsContainer = document.getElementById("cards-container");

//overlay
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal_close");
const modalContainer = document.querySelector(".modal_content");
const modalLeftArrow = document.querySelector(".modal_arrow-left");
const modalRightArrow = document.querySelector(".modal_arrow-right");
const buttonLeft = document.querySelector(".modal_button-left");
const buttonRight = document.querySelector(".modal_button-right");

//nightmode
const nightMode = document.getElementById("nightMode");
//page elements
const header = document.querySelector('header');
const body = document.querySelector('body');
const label = document.querySelector('label');
const spans = document.querySelectorAll('span');
const socialIcons = document.querySelectorAll('.icon_social');


//API link
const API = `https://randomuser.me/api/?results=12&nat=US`

//employees collection of info
let employees = [];

//==========================================================
//                         FUNCTIONS
//==========================================================

// hide thing
const hide = element => element.style.display = "none";

// show thing
const show = element => element.style.display = "block";

// add animation
const animate = (element, animation) => element.style.animation = animation;

// set hidden
const setHidden = element => element.classList.add("hidden");

// set colour
const setColor = (element, color) => element.style.color = color;

// set colour
const setBGColor = (element, color) => element.style.backgroundColor = color;

// handle left and right arrows event
const handleArrowEvent = e => {
    
    if (e.target === modalLeftArrow || e.target === modalRightArrow) {
        const modal = e.target.parentNode.parentNode;
        const currentImg = modal.querySelector('.modal_avatar');
        const index = parseInt(currentImg.getAttribute('alt'));
        let next;
        
        modalContainer.innerHTML = '';

        if (e.target === modalLeftArrow) {
            next = index - 1; //traverse backwards
            displayModal(next);
        } else if (e.target === modalRightArrow) {
            next = index + 1; //traverse forwards
            displayModal(next);
        }

    }

}

// insert employee cards
const displayEmployees = (employeesJSON) => {
    let employees = employeesJSON;
    let employeesInfo = '';

    // loop through each employee and create HTML markup
    employees.forEach((employee, i) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        
        employeesInfo += `
        <div class="cards" data-index="${i}"> <!-- Employee ${i} -->
            <img class="cards_avatar" src="${picture.large}" alt="${name.first} ${name.last}">
            <div class="text-container">
                <h2 class="cards_name">${name.first} ${name.last}</h2>
                <p class="cards_email">${email}</p>
                <p class="cards_city">${city}</p>
            </div>
        </div>
        `;
    });
    cardsContainer.innerHTML = employeesInfo;
}

// display employee info in overlay
const displayModal = (index) => {
    let info = employees[index];
    let date = new Date(info.dob);

    const modalHTML = `
        <img class="modal_avatar" src="${info.picture}" alt="${index}">
        <div class="modal_info">
            <h2 class="modal_name">${info.name.first} ${info.name.last}</h2>
            <p class="modal_email">${info.email}</p>
            <p class="modal_city">${info.location.city}</p>
            <hr />
            <p>${info.phone}</p>
            <p class="modal_address">${info.location.street.number} ${info.location.street.name}, ${info.location.state} ${info.location.postcode}</p>
            <p>Birthday: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

    // if (!mqSmall.matches) { // If media query matches
        if (parseInt(index) === 0) { 
            hide(modalLeftArrow); //if showing first employee, hide left arrow
        } else if (parseInt(index) === 11) {
            hide(modalRightArrow); //if showing last employee, hide right arrow
        } else {
            show(modalLeftArrow);
            show(modalRightArrow);
        }
    // }

    if (nightMode.checked) { //night mode
        const headings = document.querySelectorAll('h2');
        const pS = document.querySelectorAll('p');

        const lighter = '#e4e4e4';
        const light = '#9e9e9e';

        headings.forEach(heading => {
            setColor(heading, lighter);
            // heading.style.fontWeight = 500;
        });
        pS.forEach(p => setColor(p, light));
    } 

}

//==========================================================
//                           FETCH
//==========================================================

fetch(API)
    .then(res => res.json()) // convert response into jSON
    .then(json => {
        json.results.map(employee => {
            const employeeInfo = {
                name: employee.name,
                dob: employee.dob.date,
                phone: employee.phone,
                email: employee.email,
                location: {
                    city: employee.location.city,
                    street: employee.location.street,
                    state: employee.location.state,
                    postcode: employee.location.postcode
                },
                picture: employee.picture.large
            };
            employees.push(employeeInfo); //get variable out of promise
        });
        return json.results;
    })
    .then(displayEmployees)
    .catch(err => console.log(err));


//==========================================================
//                         LISTENERS
//==========================================================

// Search Funtionality ------------------------------------->
searchBar.addEventListener('keyup', () => {
    let userSearch = searchBar.value.toUpperCase();
    let notFound = 0;
    const names = document.querySelectorAll('.cards_name');
    const notFoundText = document.createElement('H1');
    notFoundText.innerHTML = "<h2 class='notfound'>Whoops, looks like there's nothing here!</h2>";
    
    // remove repetition of not found text
    const whoops = document.querySelectorAll('.notfound');
    whoops.forEach(whoopsText => whoopsText.remove());
    
    names.forEach(name => {
        let employeeName = name.textContent.toUpperCase();
        let employeeCard = name.parentNode.parentNode;

        if (employeeName.indexOf(userSearch) > -1) {
            employeeCard.style.display = ''; //set back to flex
        } else {
            hide(employeeCard);
            notFound++;
        }

        if (searchBar.value.length === 0) {
            employeeCard.style.display = ''; //set back to flex
        }
    });

    if (notFound >= names.length) { //if seach & names don't match
        main.appendChild(notFoundText);
    }
});

// Search Bar & Button interactivity ----------------------->
searchButton.addEventListener('click', () => {
    if (mqSmall.matches) {
        animate(searchBar, 'showSearch .5s forwards');
        setTimeout(() => searchBar.focus(), 500);
        hide(searchButton);
     }
});

// Cards --------------------------------------------------->
 cardsContainer.addEventListener('click', e => {
    if (e.target !== cardsContainer) {
        
        const card = e.target.closest(".cards");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});
    
// Overlay ------------------------------------------------>
overlay.addEventListener('click', e => {
    if (e.target === overlay) {
        setHidden(overlay);
    }
});

// Overlay Close Button 
modalClose.addEventListener('click', () => {
    setHidden(overlay);
});

// Overlay Arrows ------------------------------------------>
buttonLeft.addEventListener('click', handleArrowEvent);
buttonRight.addEventListener('click', handleArrowEvent);