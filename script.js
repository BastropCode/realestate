// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Property card stagger animation
const propertyCards = document.querySelectorAll(".property-card");
propertyCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Stats counter animation
const stats = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const text = target.textContent;
      const hasPlus = text.includes("+");
      const isPercent = text.includes("%");
      const hasMoney = text.includes("$");
      const hasM = text.includes("M");

      let numText = text.replace(/[+%$M,]/g, "");
      let endValue = parseFloat(numText);

      animateCounter(
        target,
        0,
        endValue,
        2000,
        hasPlus,
        isPercent,
        hasMoney,
        hasM
      );
      statsObserver.unobserve(target);
    }
  });
});

stats.forEach((stat) => statsObserver.observe(stat));

function animateCounter(
  element,
  start,
  end,
  duration,
  hasPlus,
  isPercent,
  hasMoney,
  hasM
) {
  let startTime = null;

  function animate(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const currentValue = start + (end - start) * easeOutQuart(progress);

    let displayValue = "";
    if (hasMoney) {
      displayValue = "$" + Math.floor(currentValue);
      if (hasM) {
        displayValue = "$" + Math.floor(currentValue) + "M";
      }
    } else if (isPercent) {
      displayValue = Math.floor(currentValue) + "%";
    } else {
      displayValue = Math.floor(currentValue).toLocaleString();
    }

    if (hasPlus) {
      displayValue += "+";
    }

    element.textContent = displayValue;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}

if (links) {
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}
