const sideNavItems = document.querySelectorAll("nav.side-nav"), sideNavMinify = document.querySelectorAll(".minify-sidenav")
var sidebarState, windowState
const mobileQuery = window.matchMedia('(max-width: 768px)')
const appBarMenu = document.querySelectorAll("nav.appbar .appbar-menu")
const body = document.querySelector("body")

class RB {
  constructor(e) {
    if (e instanceof HTMLElement) this.el = [e]
    else this.el = document.querySelectorAll(e);
  }

  all(cb = function (e) { }) { this.el.forEach(function (e) { cb(e) }) }

  click(cb = function (event) { }) {
    this.el.forEach(function (e) {
      e.addEventListener("click", function (ev) {
        cb(ev)
      })
    })
  }

  listen(ev, cb) {
    this.el.forEach(function (e) { e.addEventListener(ev, cb) })
  }

  hasClass(className) {
    var state = false
    this.el.forEach(function (e) {
      state = e.classList.contains(className)
    })
    return state
  }
  load(url, success = function () { }) {
    const xmlHttp = new XMLHttpRequest(), element = this.el

    xmlHttp.open("GET", url);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function (st) {
      element.forEach(function (e) {
        e.innerHTML = xmlHttp.responseText
      })
      if (typeof success !== "undefined")
        success()
    }
  }

  attr(getter, setter = null) {
    this.el.forEach(function (e) {
      if (setter === null || typeof setter === "undefined")
        e.getAttribute(getter)
      else e.setAttribute(getter, setter)
    })
  }

  addClass(className) {
    this.el.forEach(function (e) { if (!e.classList.contains(className)) e.classList.add(className) })
  }
  removeClass(className) {
    this.el.forEach(function (e) { if (e.classList.contains(className)) e.classList.remove(className) })
  }

  find(elem, cb) {
    this.el.forEach(function (e) {
      e.querySelectorAll(elem).forEach(function (e1) {
        cb(e1)
      })
    })
  }
  static delay(time = 0, callback = function () { }) {
    var interval = setInterval(function () {
      callback()
      clearInterval(interval)
    }, time)
  }

  static ready(cb = function () { }) { document.addEventListener('DOMContentLoaded', cb) }
}

const rb = function (elem) { return new RB(elem) }
RB.ready(function () {
  if (window.innerWidth > 768) sidebarEvents("show", "hide"), windowState = "desktop", appBarState("show")
  else sidebarEvents("hide", "show"), windowState = "mobile", appBarState("hide")


  const sideNavItems2 = rb('nav.side-nav')

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
    sideNavItems2.all(function (e2) {
      if (!e2.innerHTML.includes(e.target.innerHTML) && windowState === "mobile") {
        sidebarEvents("hide", '')
      }
    })

    appBarMenu.forEach(function (e2) {
      if (!e2.innerHTML.includes(e.target.innerHTML) && windowState === "mobile") appBarMenuState("mobile")
    })
  })

  sideNavItems2.find("a", function (a) {
    rb(a).click(function () {

      if (rb(a).hasClass("has-child") && rb(a).hasClass("active")) rb(a).removeClass("active")
      else rb(a).addClass("active")
      sideNavItems2.find("a", function (a1) {
        if (a !== a1 && !rb(a1).hasClass("has-child") && rb(a1).hasClass("active")) rb(a1).removeClass("active")
      })
    })
  })
  sideNavItems2.all(function (e) {
    if (e.clientHeight < body.clientHeight) e.setAttribute("style", "height: " + body.clientHeight + "px")
    sideNavMinifyButton(e)
  })
  rb(".sidebar-btn-mobile").click(function (e) {
    if (sidebarState === "show") sidebarEvents("hide", '')
    else sidebarEvents("show", '')
  })

  function sidebarEvents(state, btn) {
    if (state === "hide") {
      sideNavItems.forEach(function (e1) {
        e1.classList.remove("mini")
        e1.classList.add("hide")
        RB.delay(200, function () {
          e1.setAttribute("style", "display: none")
          setMarginFromSideBar(0)
        })
      })
      sidebarState = "hide"
    }
    if (state === "show") {
      sideNavItems.forEach(function (e1) {
        e1.classList.remove("hide")
        RB.delay(100, function () {
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
    if (state === "hide") rb(".sidebar-btn-mobile").attr("style", "display: none;")
    else if (state === "show") rb(".sidebar-btn-mobile").attr("style", "display: flex;")
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
            sideNavItem.setAttribute("style", "min-height: " + body.clientHeight + "px")
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
    rb("footer.r-footer, .r-container, nav.appbar").attr("style", "margin-left: " + margin)
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
})