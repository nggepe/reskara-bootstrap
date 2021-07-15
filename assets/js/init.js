const sideNavItems = document.querySelectorAll("nav.side-nav"), sideNavMinify = document.querySelectorAll(".minify-sidenav"), sideBarButtonMobile = document.querySelectorAll(".sidebar-btn-mobile")
var sidebarState
var windowState
const mobileQuery = window.matchMedia('(max-width: 768px)')
const appBar = document.querySelectorAll("nav.appbar"), appBarMenu = document.querySelectorAll("nav.appbar .appbar-menu")
const container = document.querySelectorAll(".r-container"), footer = document.querySelectorAll("footer.r-footer")
const body = document.querySelector("body")

body.addEventListener("resize", function (ev) {
  sideNavItems.forEach(function (e) {
    if (e.clientHeight < body.clientHeight) e.setAttribute("style", "height: " + body.clientHeight + "px")
  })
})

class RB { }

RB.load = function (url, success = function () { }) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url);
  xmlHttp.send(null);
  xmlHttp.onreadystatechange = function (st) {
    content.innerHTML = xmlHttp.responseText
    if (typeof success !== "undefined")
      success()
  }
}
document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth > 768) {
    sidebarEvents("show", "hide")
    windowState = "desktop"
    appBarState("show")
  } else {
    sidebarEvents("hide", "show")
    windowState = "mobile"
    appBarState("hide")
  }

  mobileQuery.addEventListener('change', function (e) {
    if (e.matches) {
      sidebarEvents("hide", "show")
      windowState = "mobile"
      appBarState("hide")
    } else {
      sidebarEvents("show", "hide")
      windowState = "dekstop"
      appBarState("show")
    }
  })

  window.addEventListener("click", function (e) {
    sideNavItems.forEach(function (e2) {
      if (!e2.innerHTML.includes(e.target.innerHTML) && windowState === "mobile") {
        sidebarEvents("hide", '')
      }
    })
    appBarMenu.forEach(function (e2) {
      if (!e2.innerHTML.includes(e.target.innerHTML) && windowState === "mobile") appBarMenuState("mobile")
    })
  })
  sideNavItems.forEach(function (e) {
    const items = e.querySelectorAll("a.has-child"), a = e.querySelectorAll("a")
    if (e.clientHeight < body.clientHeight) e.setAttribute("style", "height: " + body.clientHeight + "px")
    items.forEach(function (e2) {
      e2.addEventListener("click", function (e3) {
        e3.preventDefault()
        if (e2.classList.contains("active")) e2.classList.remove("active")
        else e2.classList.add("active")
      })
    })
    a.forEach(function (e2) {
      e2.addEventListener("click", function (event) {
        if (!e2.classList.contains("has-child")) {
          e2.classList.add("active")
          a.forEach(function (e3) {
            if (e3 !== e2 && !e3.classList.contains("has-child") && e3.classList.contains("active")) e3.classList.remove("active")
          })
        }
      })
    })
    sideNavMinifyButton(e)
  })

  sideBarButtonMobile.forEach(function (e) {
    e.addEventListener("click", function (e) {
      e.preventDefault()
      if (sidebarState === "show") sidebarEvents("hide", '')
      else sidebarEvents("show", '')
    })
  })

  function sidebarEvents(state, btn) {
    if (state === "hide") {
      sideNavItems.forEach(function (e1) {
        e1.classList.remove("mini")
        e1.classList.add("hide")
        reskaraDebounce(200, function () {
          e1.setAttribute("style", "display: none")
          setMarginFromSideBar(0)
        })
      })
      sidebarState = "hide"
    }
    if (state === "show") {
      sideNavItems.forEach(function (e1) {
        e1.classList.remove("hide")
        reskaraDebounce(100, function () {
          e1.setAttribute("style", "display: block")
          if (windowState === "dekstop")
            setMarginFromSideBar("240px")
        })
      })
      sidebarState = "show"
    }
    if (btn !== "")
      sidebarBtnMobileCollapse(btn)
  }

  function sidebarBtnMobileCollapse(state) {
    sideBarButtonMobile.forEach(function (e) {
      reskaraDebounce(200, function () {
        if (state === "hide") e.setAttribute("style", "display: none")
        if (state === "show") e.setAttribute("style", "display: flex")
      })

    })
  }

  function sideNavMinifyButton(sideNavItem) {
    sideNavMinify.forEach(function (e) {
      e.addEventListener("click", function (e1) {
        if (sideNavItem.classList.contains("mini")) {
          sideNavItem.classList.remove("mini")
          changeButtonMinifyContent("", e)
        }
        else {
          if (windowState === "mobile") sidebarEvents("hide", "show")
          else {
            changeButtonMinifyContent("mini", e)
            sideNavItem.classList.add("mini")
          }
        }

      })
      if (sideNavItem.classList.contains("mini")) changeButtonMinifyContent("mini", e)
      else changeButtonMinifyContent("", e)
    })
  }

  function changeButtonMinifyContent(state, e) {
    if (state === "mini") {
      e.innerHTML = `<i class="fa fa-align-justify"></i>`
      setMarginFromSideBar("60px")
    }
    else {
      e.innerHTML = `<i class="fa fa-align-right"></i>`
      setMarginFromSideBar("240px")
    }
  }

  function setMarginFromSideBar(margin = "0px") {
    appBar.forEach(function (e) {
      e.setAttribute("style", "margin-left: " + margin)
    })

    container.forEach(function (e) {
      e.setAttribute("style", "margin-left: " + margin)
    })

    footer.forEach(function (e) {
      e.setAttribute("style", "margin-left: " + margin)
    })
  }

  function appBarState(state = "show") {
    const el = document.createElement("button"), elIn = document.createElement("i")
    el.setAttribute("class", "appbar-menu-mobile")
    el.setAttribute("style", "height: 100%;")
    elIn.classList.add("fas"), elIn.classList.add("fa-ellipsis-v")
    el.appendChild(elIn)
    el.addEventListener("click", function (e) {
      e.preventDefault()
      appBarMenuState("mobile", "", true)
    })
    appBarMenuState(state, el)
  }

  function appBarMenuState(state = "show", button, collapse = false) {
    appBarMenu.forEach(function (e) {
      if (state === "show") {
        const clasEL = e.parentElement.querySelectorAll(".appbar-menu-mobile")
        clasEL.forEach(function (e) {
          e.remove()
        })
        if (e.classList.contains("mobile")) {
          e.classList.remove("mobile")
        }
      }
      else if (state === "hide") {
        e.classList.add("mobile")
        e.parentElement.appendChild(button)
      }
      else if (state === "mobile" && collapse) {
        if (e.classList.contains("show")) e.classList.remove("show")
        else if (!e.classList.contains("show") && e.classList.contains("mobile")) e.classList.add("show")
      }
      else if (state === "mobile" && !collapse) if (e.classList.contains("show")) e.classList.remove("show")
    })
  }

  function reskaraDebounce(time = 0, callback = function () { }) {
    var interval = setInterval(function () {
      callback()
      clearInterval(interval)
    }, time)
  }
})