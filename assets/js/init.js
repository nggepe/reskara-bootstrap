const sideNavItems = document.querySelectorAll("nav.side-nav")
const sideNavMinify = document.querySelectorAll(".minify-sidenav")
const mediaQuery = window.matchMedia('(max-width: 768px)')
const desktopQuery = window.matchMedia('(min-width: 769px)')
document.addEventListener('DOMContentLoaded', function () {
  sideNavItems.forEach(function (e) {
    const items = e.querySelectorAll("a.has-child")
    items.forEach(function (e2) {
      e2.addEventListener("click", function (e3) {
        e3.preventDefault()
        // if (!e.classList.contains("mini")) {
        if (e2.classList.contains("active")) e2.classList.remove("active")
        else e2.classList.add("active")
        // }
      })
    })
    sideNavMinifyButton(e)
  })

  function sideNavMinifyButton(sideNavItem) {
    sideNavMinify.forEach(function (e) {
      e.addEventListener("click", function (e1) {
        e1.preventDefault()
        sideNavItems.forEach(function (e2) {
          if (e2.classList.contains("mini")) {
            e2.classList.remove("mini")
            changeButtonMinifyContent("", e)
          }
          else {
            changeButtonMinifyContent("mini", e)
            e2.classList.add("mini")
          }
        })
      })
      if (sideNavItem.classList.contains("mini")) changeButtonMinifyContent("mini", e)
      else changeButtonMinifyContent("", e)
    })
  }

  function changeButtonMinifyContent(state, e) {
    if (state === "mini") {
      e.innerHTML = `<i class="fa fa-align-justify"></i>`
    }
    else e.innerHTML = `<i class="fa fa-align-right"></i>`
  }

  mediaQuery.addEventListener('change', function (e) {
    if (e.matches) {
      sideNavItems.forEach(function (e1) {
        e1.classList.remove("mini")
        e1.classList.add("hide")
        reskaraDebounce(200, function () {
          e1.setAttribute("style", "display: none")
        })
      })
    }
  })

  desktopQuery.addEventListener('change', function (e) {
    if (e.matches) {
      sideNavItems.forEach(function (e1) {
        e1.classList.remove("hide")
        reskaraDebounce(200, function () {
          e1.setAttribute("style", "display: block")
        })
      })
    }
  })
})

function reskaraDebounce(time = 0, callback = function () { }) {
  var interval = setInterval(function () {
    callback()
    clearInterval(interval)
  }, time)
}