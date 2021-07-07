const sideNavItems = document.querySelectorAll("nav.side-nav")
const sideNavMinify = document.querySelectorAll(".minify-sidenav")
document.addEventListener('DOMContentLoaded', function () {
  sideNavItems.forEach(function (e) {
    const items = e.querySelectorAll("a.has-child")
    items.forEach(function (e2) {
      e2.addEventListener("click", function (e3) {
        e3.preventDefault()
        if (!e.classList.contains("mini")) {
          if (e2.classList.contains("active")) e2.classList.remove("active")
          else e2.classList.add("active")
        }
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
      sideNavItems.forEach(function (e) {
        const items = e.querySelectorAll("a.has-child")
        items.forEach(function (e2) {
          e2.classList.remove("active")
        })
      })
    }
    else e.innerHTML = `<i class="fa fa-align-right"></i>`
  }
})