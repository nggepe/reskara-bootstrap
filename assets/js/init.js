document.addEventListener('DOMContentLoaded', function () {
  const sideNavItems = document.querySelectorAll("nav.side-nav")
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
})