$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  });

  // Subscribe form submission handling (fake for demo)
  $('#subscribeForm').submit(function (e) {
    e.preventDefault();
    const email = $('#email').val();
    if (email) {
      $('#subscribeMessage').text('Thank you for subscribing!');
      $('#email').val('');
    }
  });
});


// Replace with your actual WhatsApp business number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '919555319530'; // Example: 91 for India + your 10-digit number

function inquireWhatsApp(productName, category, material, price) {
    const message = `Hi! I'm interested in:%0A%0AProduct: ${productName}%0ACategory: ${category}%0AMaterial: ${material}%0APrice: ₹${price.toLocaleString()}%0A%0AI would like to know more details.`;
    
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappURL, '_blank');
}


$('#banner-carousel .owl-carousel').owlCarousel({
  loop: true,
  margin: 0,
  nav: false,
  dots: true,
  responsive: {
    0:    { items: 1 },
    480:  { items: 1 },
    768:  { items: 1 },
    992:  { items: 1 },
    1200: { items: 1 }
  }
});
