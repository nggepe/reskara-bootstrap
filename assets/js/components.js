function delay(time = 0, callback = function () { }) {
  var interval = setInterval(function () { callback(), clearInterval(interval) }, time)
}

$(document).ready(function (e) {
  $('.collapse-card').click(function (e) {
    const parent = $(this).parents('.card')
    const toCollapse = parent.find(".collapse-card-item")
    if (toCollapse.hasClass("scale-out-tr")) toCollapse.attr("style", "display: none"), toCollapse.removeClass("scale-out-tr"), delay(10, function () { toCollapse.show(200) }), $(this).html($(this).attr("data-show"))
    else toCollapse.addClass("scale-out-tr"), toCollapse.hide(200), $(this).html($(this).attr("data-hide"))
  })

  $('.close-card').click(function (e) {
    const parent = $(this).parents('.card')
    parent.addClass("scale-out-tr")
    delay(200, function () {
      parent.attr("style", "display: none")
    })
  })

  $('.collapse-card-item').each(function (e, v) {
    if ($(v).hasClass("scale-out-tr")) {
      const btn = $(v).parents(".card").find(".collapse-card")
      btn.html(btn.attr("data-hide"))
    }
    else {
      const btn = $(v).parents(".card").find(".collapse-card")
      btn.html(btn.attr("data-show"))
    }
  })

  $(".full-screen-card").click(function (e) {
    const elem = $(this).parents(".card")[0]
    if (elem.requestFullscreen) elem.requestFullscreen()
    else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  })

  $(".form-group").each(function (e) {
    emptyValidation(this)
  })

  function emptyValidation(group) {
    const formGroup = $(group)
    formGroup.find("input").on("blur", function (e) {
      validateHelper(formGroup, this)
    })
    formGroup.find("select").on("blur", function (e) {
      validateHelper(formGroup, this)
    })
    formGroup.find("textarea").on("blur", function (e) {
      validateHelper(formGroup, this)
    })
  }

  function validateHelper(formGroup, el) {
    if ($(el).val() == "") {
      if ($(formGroup).find(".text-helper").length == 0)
        formGroup.append("<small class='text-danger text-helper'>Required field!</small>"),
          formGroup.addClass("has-error")
    }
    else formGroup.find(".text-helper").remove(), formGroup.removeClass("has-error")

    $(el).on("keyup", function (e) {
      if ($(this).val() != "") formGroup.find(".text-helper").remove(), formGroup.removeClass("has-error")
    })
  }
})

$(function () {
  // open in fullscreen
  $('#fullscreen .requestfullscreen').click(function () {
    $('#fullscreen').fullscreen();
    return false;
  });
  // exit fullscreen
  $('#fullscreen .exitfullscreen').click(function () {
    $.fullscreen.exit();
    return false;
  });
  // document's event
  $(document).bind('fscreenchange', function (e, state, elem) {
    // if we currently in fullscreen mode
    if ($.fullscreen.isFullScreen()) {
      $('#fullscreen .requestfullscreen').hide();
      $('#fullscreen .exitfullscreen').show();
    } else {
      $('#fullscreen .requestfullscreen').show();
      $('#fullscreen .exitfullscreen').hide();
    }
    $('#state').text($.fullscreen.isFullScreen() ? '' : 'not');
  });
});