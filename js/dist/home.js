(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// All ems with platform content should be styled as platform label
function fixPlatformLabels () {
  var ems = document.querySelectorAll('em')
  Array.prototype.forEach.call(ems, function (em) {
    if (em.textContent === 'macOS' || em.textContent === 'Linux' || em.textContent === 'Windows') {
      em.classList.add('platform-label')
    }
  })
}

// Override incorrect styling of string templates and colons in objects
function fixSyntaxHighlighting () {
  var sts = document.querySelectorAll('.err')
  Array.prototype.forEach.call(sts, function (st) {
    if (st.textContent === '`' || st.textContent === ':') {
      st.classList.remove('err')
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  fixPlatformLabels()
  fixSyntaxHighlighting()
})

},{}],2:[function(require,module,exports){
<!-- Slick Carousel -->
$(document).ready(function(){
  // slickjs for events Carousel.
  $('.event-slick').slick({
    arrows: true,
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Add smooth scrolling to all links
  $("a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  // contact us email submit button
  //  https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175
  $('#contact-email-button').on('click', function(e){
    var url = 'https://script.google.com/macros/s/AKfycbzRbLY4MudDfw6rQL6VxDjPYtZ1cJ3Rct8I5GRjj-L-RQ-kGjk/exec';
    e.preventDefault();
    $.ajax({
       url: url,
       method: "GET",
       dataType: "json",
       data: $('form#contact-form').serializeObject(),
       success: function(){
        $('form#contact-form').find("input[type=text], textarea").val("");
       }
     });
  });
});

},{}]},{},[1,2]);
