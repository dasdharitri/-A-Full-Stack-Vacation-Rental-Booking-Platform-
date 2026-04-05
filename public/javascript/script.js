 (() => {
  "use strict";

  // Bootstrap validation
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  
  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  });

  // 🔥 NAVBAR SCROLL ANIMATION
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });


  // 🔥 PAYMENT BUTTON ANIMATION
  const payBtn = document.getElementById("payBtn");
  const loader = document.getElementById("loader");
  // const popup = document.getElementById("successPopup");

  if (payBtn) {
    payBtn.addEventListener("click", () => {
      if (loader) loader.style.display = "inline";
      payBtn.innerText = "Processing...";


       // simulate payment delay
    setTimeout(() => {
      loader.style.display = "none";
      popup.style.display = "flex";

      // auto redirect after 3 sec (optional)
      setTimeout(() => {
        window.location.href = "/listings";
      }, 3000);

    }, 1500);
     
    });
  }

})();


