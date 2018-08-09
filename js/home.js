// run homejs-dev.sh to run browserify to enable require keyword.
// more info: https://spapas.github.io/2015/05/27/using-browserify-watchify/
const mailgun = require('mailgun.js');
var mg = mailgun.client({
  username: 'api',
  key: '2adb321302cbd62e0d33b8c2edc20b10-7efe8d73-508f911e' // should use process.env.MAILGUN_API_KEY in production
})

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
  $('#contact-email-button').on('click', function(event){
    var name = document.getElementById('name').value;
    var from = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var content = document.getElementById('email-content').value;

    mg.messages.create('sandbox3a02021e7df84480992fcd9d55aa3e24.mailgun.org',{
      from: name+ " < "+from+" >",
      to: ["alex.xiong.tech@gmail.com"],
      subject: subject,
      text: content,
      html: "<h1>" + subject+ "</h1><br><p>"+content+"</p>"
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
  });
});
