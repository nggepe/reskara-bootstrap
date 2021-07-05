document.addEventListener('DOMContentLoaded', function () {
  const sideNavItems = document.querySelectorAll("nav.side-nav")
  const sideNavMinify = document.querySelectorAll(".minify-sidenav")
  sideNavItems.forEach(function (e) {
    const items = e.querySelectorAll("a.has-child")
    items.forEach(function (e2) {
      e2.addEventListener("click", function (e) {
        e.preventDefault()
        if (e2.classList.contains("active")) e2.classList.remove("active")
        else e2.classList.add("active")
      })
    })
  })

  sideNavMinify.forEach(function (e) {
    e.addEventListener("click", function (e) {
      e.preventDefault()
      sideNavItems.forEach(function (e2) {
        if (e2.classList.contains("mini")) e2.classList.remove("mini")
        else e2.classList.add("mini")
      })
    })
  })
})