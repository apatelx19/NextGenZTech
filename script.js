const SCRIPT_URL = "https://sheetdb.io/api/v1/swtc56h0sij7o";

const domainCards = document.querySelectorAll(".domain-card");
const selectedDomain = document.getElementById("selectedDomain");
const form = document.querySelector(".form");

// Domain Selection
domainCards.forEach(card => {
  card.addEventListener("click", () => {

    const domain = card.dataset.domain;
    selectedDomain.value = domain;

    domainCards.forEach(c => {
      c.classList.remove("active-domain");
    });

    card.classList.add("active-domain");

    document.getElementById("apply").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Form Submit
form.addEventListener("submit", async (e) => {

  e.preventDefault();

  if (selectedDomain.value === "") {
    alert("⚠️ Please select an internship domain.");
    return;
  }

  const formData = {
    "Full Name": document.getElementById("fullName").value,
    "Email": document.getElementById("email").value,
    "Phone": document.getElementById("phone").value,
    "College": document.getElementById("college").value,
    "Course": document.getElementById("course").value,
    "Year": document.getElementById("year").value,
    "Domain": selectedDomain.value,
    "Resume Link": document.getElementById("resumeLink").value,
    "LinkedIn": document.getElementById("linkedin").value,
    "GitHub": document.getElementById("github").value,
    "Why Join": document.getElementById("whyJoin").value
  };

  try {

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [formData]
      })
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    alert(`🎉 Thank you for applying for ${formData["Domain"]} Internship at NextGenZ Tech!\n\nWe will contact you soon. 🚀`);

    form.reset();
    selectedDomain.value = "";

    domainCards.forEach(c => {
      c.classList.remove("active-domain");
    });

  } catch (error) {

    console.error(error);
    alert("❌ Failed to submit application. Please try again.");

  }

});