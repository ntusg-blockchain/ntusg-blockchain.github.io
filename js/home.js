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
    adaptiveHeight: false,
    centerMode: true,
    initialSlide: 3,
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
        // TODO: add more beautiful message/notification on successful form submission
        alert('We have successfully received your request! Thank you for your email.');
        $('form#contact-form').find("input[type=text], textarea").val("");
       }
     });
  });
});
