function delay(time = 0, callback = function () { }) {
  var interval = setInterval(function () { callback(), clearInterval(interval) }, time)
}

$(document).ready(function (e) {
  $('.collapse-card').click(function (e) {
    const parent = $(this).parents('.card')
    const toCollapse = parent.find(".card-body, .card-footer")
    toCollapse.addClass("scale-out-tr")
    delay(200, function () {
      toCollapse.attr("style", "display: none")
    })
  })

  $('.close-card').click(function (e) {
    const parent = $(this).parents('.card')
    parent.addClass("scale-out-tr")
    delay(200, function () {
      parent.attr("style", "display: none")
    })
  })
})