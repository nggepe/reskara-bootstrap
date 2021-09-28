const sideNavMinify = document.querySelectorAll(".minify-sidenav")
var sidebarState, windowState, sidebarHideState = false
const mobileQuery = window.matchMedia('(max-width: 768px)')
const appBarMenu = document.querySelectorAll("nav.appbar .appbar-menu")
const body = document.querySelector("body")
$(".appbar-menu").find(".dropdown").each(function (i, e) {
  if ($(e).hasClass("active")) $(e).find("ul").show()
  else $(e).find("ul").hide()
})

class RB {
  static delay(time = 0, callback = function () { }) {
    var interval = setInterval(function () { callback(), clearInterval(interval) }, time)
  }

  static ready(cb = function () { }) { document.addEventListener('DOMContentLoaded', cb) }
}

RB.hideSidebar = function () {
  sideNav.hide(150)
  setMarginFromSideBar(0)
  $(".sidebar-btn-hide").html("<i class='fa fa-arrow-right'></i>")
  sidebarHideState = true
}

RB.showSideBar = function () {
  sideNav.show(150)
  $(".sidebar-btn-hide").html("<i class='fa fa-arrow-left'></i>")
  if (sideNav.hasClass("mini")) setMarginFromSideBar("60px")
  else setMarginFromSideBar("240px")
  sidebarHideState = false
}

const sideNav = $('nav.side-nav'), sideNavMinifyBtn = $('.minify-sidenav'), sidebarBtnMobile = $(".sidebar-btn-mobile")
$(document).ready(function () {
  if (window.innerWidth > 768) sidebarEvents("show", "hide"), windowState = "desktop", appBarState("show")
  else sidebarEvents("hide", "show"), windowState = "mobile", appBarState("hide")
  if (sideNav.hasClass("mini")) changeButtonMinifyContent("mini")
  else changeButtonMinifyContent("")

  $(".appbar-menu").find(".dropdown").click(function (e) {
    $(this).find("ul").show(200)
    $(this).addClass("active")
  })

  if (sideNav.height() < body.clientHeight) {
    sideNav.attr("style", "height: " + body.clientHeight + "px")
  }

  $(".sidebar-btn-hide").click(function (e) {
    console.log(sidebarState);
    if (!sidebarHideState) {
      RB.hideSidebar()
    } else {
      RB.showSideBar()
    }
  })

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

    $(".appbar-menu").find(".dropdown").each(function (i, e1) {
      if ($(e1).hasClass("active")) {
        if ($(e1).find(e.target).length < 1 && e.target != $(this)) {
          $(this).removeClass("active")
          $(this).find("ul").hide(200)
        }
      }
    })

    if (sideNav.find(e.target).length < 1 && sideNav.html() !== $(e.target).html() && sidebarState === "show" && windowState === "mobile") sidebarEvents("hide", "")

    appBarMenu.forEach(function (e2) {
      if (!e2.innerHTML.includes(e.target.innerHTML) && windowState === "mobile") appBarMenuState("mobile")
    })
  })
  sideNav.find("a").click(function (e) {
    if ($(this).hasClass("has-child") && $(this).hasClass("active")) $(this).removeClass("active")
    else $(this).addClass("active")
    const el = this
    if (!$(this).hasClass("has-child")) sideNav.find("a").each(function () {
      if (!$(this).hasClass("has-child") && el !== this) $(this).removeClass("active")
    })
  })

  sidebarBtnMobile.click(function (e) {
    if (sidebarState === "show") sidebarEvents("hide", '')
    else sidebarEvents("show", '')
  })

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

  sidenavInit(sideNav.children("ul"), 30)

})

function sidenavInit(params, padding) {
  const li = $(params).children("li")
  if ($(li).has("a.has-child").length > 0) {
    $(li).children("ul").children("li").children("a").attr("style", "padding-left: " + padding + "px")
    sidenavInit($(li).children("ul"), padding + 10)
  }
}

function sidebarEvents(state, btn) {
  if (state === "hide") {
    sideNav.removeClass("mini"), sideNav.addClass("hide")
    RB.delay(200, function () {
      sideNav.attr("style", "display: none"), setMarginFromSideBar(0), sidebarState = "hide"
    })
  }
  else if (state === "show") {
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


function changeButtonMinifyContent(state = "") {
  if (state === "mini") sideNavMinifyBtn.html(`<i class="fa fa-align-justify"></i>`), setMarginFromSideBar("60px")
  else sideNavMinifyBtn.html(`<i class="fa fa-align-right"></i>`), setMarginFromSideBar("240px")
}

function setMarginFromSideBar(margin = "0px") {
  $("footer.r-footer, .r-container, nav.appbar").attr("style", "margin-left: " + margin)
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