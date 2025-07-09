// Custom JavaScript for Carlo Agan Portfolio

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar background change on scroll
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Progress bar animation on scroll
  const progressBars = document.querySelectorAll(".progress-bar")

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (isVisible && !bar.classList.contains("animated")) {
        bar.classList.add("animated")
        const width = bar.style.width
        bar.style.width = "0%"
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      }
    })
  }

  window.addEventListener("scroll", animateProgressBars)

  // Scroll to top button
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top")
  document.body.appendChild(scrollToTopBtn)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("show")
    } else {
      scrollToTopBtn.classList.remove("show")
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Contact form handling
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = this.querySelector('input[placeholder="Your Name"]').value
      const email = this.querySelector('input[placeholder="Your Email"]').value
      const subject = this.querySelector('input[placeholder="Subject"]').value
      const message = this.querySelector("textarea").value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...'
      submitBtn.disabled = true

      setTimeout(() => {
        alert("There was a problem on sending email. Please contact me directly on my socials and contacts listed.")
        this.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Typing effect for hero section
  const heroTitle = document.querySelector(".hero-content h1")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""

    let i = 0
    function typeWriter() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    // Start typing effect after page load
    setTimeout(typeWriter, 1000)
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".stat-card, .skill-badge, .education-card, .experience-card, .project-card, .contact-item",
  )
  animateElements.forEach((el) => {
    observer.observe(el)
  })

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]")

  function highlightNavLink() {
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`)

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        if (navLink) {
          navLink.classList.add("active")
        }
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  // Mobile menu close on link click
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click()
      }
    })
  })

  // Preloader (optional)
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  // Console message for developers
  console.log(`
    ╔══════════════════════════════════════╗
    ║          Carlo Agan Portfolio        ║
    ║      Built with HTML, CSS, JS        ║
    ║         & Bootstrap Framework        ║
    ║                                      ║
    ║    Contact: carloagan123@gmail.com   ║
    ╚══════════════════════════════════════╝
    `)
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Smooth reveal animations
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal")

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight
    const elementTop = reveal.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active")
    }
  })
}

window.addEventListener("scroll", debounce(revealOnScroll, 10))

// Initialize AOS (Animate On Scroll) alternative
function initScrollAnimations() {
  const elements = document.querySelectorAll("[data-animate]")

  elements.forEach((element) => {
    const animationType = element.getAttribute("data-animate")
    const delay = element.getAttribute("data-delay") || 0

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animated", animationType)
          }, delay)
        }
      })
    })

    observer.observe(element)
  })
}

// Call initialization functions
document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations()
})
