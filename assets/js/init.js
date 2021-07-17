const sideNavMinify = document.querySelectorAll(".minify-sidenav")
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

  parents(query) {
    var state = false;
    this.el.forEach(function (e) {
      state = getParent(query, e)
    })

    function getParent(p, c) {
      const parent = p instanceof HTMLElement ? p : document.querySelectorAll(p)[0]
      const child = c instanceof HTMLElement ? c : document.querySelectorAll(c)[0]

      if (parent.contains(child)) return true
      else return false
    }

    return state
  }

  hasChild(child) {
    child = child instanceof HTMLElement ? child : document.querySelector(child)
    var state = false
    this.el.forEach(function (e) {
      state = e.contains(child)
    })
    return state
  }

  html(el) {
    this.el.forEach(function (e) {
      e.innerHTML = el
    })
  }

  static delay(time = 0, callback = function () { }) {
    var interval = setInterval(function () { callback(), clearInterval(interval) }, time)
  }

  static ready(cb = function () { }) { document.addEventListener('DOMContentLoaded', cb) }
}

const rb = function (elem) { return new RB(elem) }
const sideNav = rb('nav.side-nav'), sideNavMinifyBtn = rb('.minify-sidenav'), sidebarBtnMobile = rb(".sidebar-btn-mobile")
RB.ready(function () {
  if (window.innerWidth > 768) sidebarEvents("show", "hide"), windowState = "desktop", appBarState("show")
  else sidebarEvents("hide", "show"), windowState = "mobile", appBarState("hide")
  if (sideNav.hasClass("mini")) changeButtonMinifyContent("mini")
  else changeButtonMinifyContent("")

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
    if (!sideNav.hasChild(e.target) && sidebarState === "show" && windowState === "mobile") sidebarEvents("hide", "")

    appBarMenu.forEach(function (e2) {
      if (!e2.innerHTML.includes(e.target.innerHTML) && windowState === "mobile") appBarMenuState("mobile")
    })
  })

  sideNav.find("a", function (a) {
    rb(a).click(function () {

      if (rb(a).hasClass("has-child") && rb(a).hasClass("active")) rb(a).removeClass("active")
      else rb(a).addClass("active")
      sideNav.find("a", function (a1) {
        if (a !== a1 && !rb(a1).hasClass("has-child") && rb(a1).hasClass("active")) rb(a1).removeClass("active")
      })
    })
  })

  sideNav.all(function (e) { if (e.clientHeight < body.clientHeight) e.setAttribute("style", "height: " + body.clientHeight + "px") })
  sidebarBtnMobile.click(function (e) {
    if (sidebarState === "show") sidebarEvents("hide", '')
    else sidebarEvents("show", '')
  })

  function sidebarEvents(state, btn) {
    if (state === "hide") {
      sideNav.removeClass("mini"), sideNav.addClass("hide")
      RB.delay(200, function () {
        sideNav.attr("style", "display: none"),
          setMarginFromSideBar(0), sidebarState = "hide"
      })
    }
    if (state === "show") {
      sideNav.removeClass("hide")
      RB.delay(200, function () {
        sideNav.attr("style", "display: block")
        if (windowState === "dekstop") setMarginFromSideBar("240px")
        sidebarState = state
      })
    }
    if (btn !== "") sidebarBtnMobileCollapse(btn)
  }

  function sidebarBtnMobileCollapse(state) {
    if (state === "hide") sidebarBtnMobile.attr("style", "display: none;")
    else if (state === "show") sidebarBtnMobile.attr("style", "display: flex;")
  }
  sideNavMinifyBtn.click(function (ev) {
    ev.preventDefault()
    if (sideNav.hasClass("mini")) {
      sideNav.removeClass("mini")
      changeButtonMinifyContent()
    }
    else {
      if (windowState === "mobile") sidebarEvents("hide", "show")
      else {
        changeButtonMinifyContent("mini")
        sideNav.addClass("mini")
        sideNav.attr("style", "min-height: " + body.clientHeight + "px")
      }
    }
  })

  function changeButtonMinifyContent(state = "") {
    if (state === "mini") sideNavMinifyBtn.html(`<i class="fa fa-align-justify"></i>`), setMarginFromSideBar("60px")
    else sideNavMinifyBtn.html(`<i class="fa fa-align-right"></i>`), setMarginFromSideBar("240px")
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