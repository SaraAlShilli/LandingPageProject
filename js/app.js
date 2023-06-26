/**
 * This code snippet dynamically creates sections by utilizing the createSection function
 * and appends them to the <main> tag.
 * Written in ES6.
 */

// A counter variable used to specify attributes and track the number of sections
let counter = 0;
const createSection = () => {
  counter++;

// The HTML content of each section
  const content = `<section id="section${counter}" data-nav="Section ${counter}">
    <div class="landing__container">
    <h2>Section ${counter}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    
    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>
    </section>`;
  document.querySelector("main").insertAdjacentHTML("beforeend", content);
};


// Create four sections initially
for (let i = 1; i < 5; i++) {
    createSection();
}


// Button click event to create more sections and navigation items
document.getElementById("btn").addEventListener("click", () => {
    createSection();
    createNavItems();
});


/**
 * Updates the list items in the navigation bar to match the number of sections by iterating over them.
 * However, all items should be removed to prevent duplication.
 */
const navBar = document.getElementById("navbar__list");
const createNavItems = () => {
  navBar.innerHTML = "";
  document.querySelectorAll("section").forEach((section) => {
    const listItem = `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    navBar.insertAdjacentHTML("beforeend", listItem);
  });
};


//*** using Element.getBoundingClientRect() ***//
window.onscroll = function() {
    document.querySelectorAll("section").forEach(function(active) {
    let activeLink = navBar.querySelector(`[data-nav=${active.id}]`);
	if(active.getBoundingClientRect().top >= -400 && active.getBoundingClientRect().top <= 150){

    active.classList.add("your-active-class");
    activeLink.classList.add("active-link");

    }
    else{
         active.classList.remove("your-active-class");
         activeLink.classList.remove("active-link");
    }
	});
}


// Call the function to create initial navigation items
createNavItems();


// Smooth scrolling for navigation links
navBar.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.dataset.nav) {
      document.getElementById(`${event.target.dataset.nav}`).scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        location.hash = `${event.target.dataset.nav}`;
      }, 200);
    }
});


// Scroll to top functionality
const toTop = document.getElementById("to-top");
const header = document.querySelector(".page__header");

toTop.addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});


// Header visibility and to-top icon behavior - 4sec
let isScrolling;
document.onscroll = () => {
    header.style.display = "block";
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      header.style.display = "none";
    }, 4000);
    
    window.scrollY > 800
      ? (toTop.style.display = "block")
      : (toTop.style.display = "none");
};