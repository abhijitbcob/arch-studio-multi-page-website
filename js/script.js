import Siema from "./siema.js";

// MOBILE MENU
const header = document.querySelector(".header");
const menuToggler = document.querySelector("#menu-toggler");
const body = document.querySelector("body");
const carousel = document.querySelector(".siema");

menuToggler.addEventListener("click", function () {
  if (header.classList.contains("open")) {
    header.classList.remove("open");
    body.classList.remove("overflow-hidden");
  } else {
    header.classList.add("open");
    body.classList.add("overflow-hidden");
  }
});

/* -----------Siema carousel starts here ----------- */
// Siema doesn't come with pagination built in
// But it is very easy to add one if you want
// To get started, create new siema instance

if (carousel) {
  const mySiema = new Siema({
    startIndex: 0,
    onChange: function () {
      this.updateIndicator();
    },

    draggable: true,
    duration: 270,
    loop: true,
  });

  // Add a function that generates pagination
  Siema.prototype.addPagination = function () {
    for (let i = 0; i < this.innerElements.length; i++) {
      const btn = document.createElement("button");

      btn.classList.add("btn", "btn-tertiary");
      btn.setAttribute("data-slide-no", `${i}`);
      btn.textContent = "0" + (i + 1);
      btn.addEventListener("click", () => {
        this.goTo(i);
        this.updateIndicator();
      });
      document.querySelector(".carousel__indicators").appendChild(btn);
    }
  };

  Siema.prototype.updateIndicator = function () {
    const allIndicators = document.querySelector(".carousel__indicators").childNodes;
    let activeSlide = document.querySelector(`[data-slide-no = "${this.currentSlide}"`);

    allIndicators.forEach((indicator) => {
      indicator.classList.remove("btn-tertiary--active");
    });

    activeSlide.classList.add("btn-tertiary--active");
  };

  // Trigger pagination creator
  mySiema.addPagination();

  // Update indicator
  mySiema.updateIndicator();

  // listen for keydown event
  setInterval(() => {
    mySiema.next();
  }, 3000);
}

//////////////////////////////////////
// Indicating the active page link
const headerNavLinks = document.querySelectorAll(".header__nav-list a");

headerNavLinks.forEach((link) => {
  if (window.location.toString().includes(link.href)) {
    link.classList.add("page-active");
  }
});

////////////////////////////
// FORM VALIDATION
const form = document.querySelector(".form");
const elemsToValidate = document.querySelectorAll(".form__input");
const btnSubmit = document.querySelector(".btn-submit");

function validateForm(e) {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  elemsToValidate.forEach((element) => {
    if (element.value == "") {
      e.preventDefault();
      if (element.nextElementSibling) {
        element.parentElement.removeChild(element.nextElementSibling);
      }
      element.parentElement.insertAdjacentHTML("beforeend", "<p class='form__error'>Can't be empty</p>");
      element.classList.add("form__input-error");
    }

    if (element.id == "emailId" && element.value != "") {
      if (!element.value.match(mailformat)) {
        e.preventDefault();
        if (element.nextElementSibling) {
          element.parentElement.removeChild(element.nextElementSibling);
        }
        element.parentElement.insertAdjacentHTML(
          "beforeend",
          "<p class='form__error'>Please use a valid email address</p>"
        );
      }
    }
  });
}

if (btnSubmit) {
  btnSubmit.addEventListener("click", (e) => validateForm(e, elemsToValidate));
}

if (form) {
  form.addEventListener("keydown", function (e) {
    if (e.target.classList.contains("form__input")) {
      if (e.target.nextElementSibling) {
        e.target.parentElement.removeChild(e.target.nextElementSibling);
      }
    }
  });

  elemsToValidate.forEach((item) => {
    item.addEventListener("blur", function (e) {
      if (e.target.classList.contains("form__input-error") && !e.target.nextElementSibling) {
        console.log(e);
        e.target.classList.remove("form__input-error");
      }
    });
  });
}

//////////////////////////////
// GTM Data layer
const contact_links = document.querySelectorAll(".contact-link");
for (const link of contact_links) {
  link.addEventListener("click", () => {
    dataLayer.push({ event: "contact-link-click", value: true });
  });
}
