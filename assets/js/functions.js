function smoothScroll(button, navbarHeight) {
  $(button).on("click", function () {
    if ($(this).is("[data-target]")) {
      var target = $(this).attr('data-target');
    }
    if ($(this).is("[href]")) {
      var target = $(this).attr('href');
    }
    $('html, body').animate({
      scrollTop: $(target).offset().top - navbarHeight,
    }, 350);
    return false;
  });
}

function biggestHeight(item, setCount, viewport) {
  item.removeAttr('style');
  if (viewport) {
    for (var i = 0; i < item.length; i += setCount) {
      var curSet = item.slice(i, i + setCount),
        maxHeight = 0;
      curSet.each(function () {
        if ($(this).outerHeight() > maxHeight) {
          maxHeight = $(this).outerHeight();
        }
      }).css('height', maxHeight);
    }
  }
}

function getItemDetail(viewport, url, target) {
  $.ajax({
    url: url,
    dataType: 'html',
    contentType: "text/plain; charset=utf-8",
    success: function (data) {
      // clearing CDATA
      data = data.replace(/\<\!\[CDATA\[\/\/\>\<\!\-\-/gi, '');
      data = data.replace(/\/\/\-\-\>\<\!\]\]\>/gi, '');
      // extracting the the head and body tags
      var dataHead = data.match(/<\s*head.*>[\s\S]*<\s*\/head\s*>/ig).join("");
      var dataBody = data.match(/<\s*body.*>[\s\S]*<\s*\/body\s*>/ig).join("");
      var dataTitle = data.match(/<\s*title.*>[\s\S]*<\s*\/title\s*>/ig).join("");
      dataHead = dataHead.replace(/<\s*head/gi, "<div");
      dataHead = dataHead.replace(/<\s*\/head/gi, "</div");
      dataBody = dataBody.replace(/<\s*body/gi, "<div");
      dataBody = dataBody.replace(/<\s*\/body/gi, "</div");
      dataTitle = dataTitle.replace(/<\s*title/gi, "<div");
      dataTitle = dataTitle.replace(/<\s*\/title/gi, "</div");
      // comments
      var commentPattern = /\<\!\-\-([\s\S]*?)\-\-\>/ig;
      // get head comment tags
      var headComments = dataHead.match(commentPattern);
      // get body comment tags
      var bodyComments = dataBody.match(commentPattern);
      // head - body - title content
      newPageTitle = $(dataTitle).html();
      var newPageHTML = $(dataBody).find(target).html();
      $(target).empty().html(newPageHTML);
    }
  });
}
// INPUTS VALIDATION
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
