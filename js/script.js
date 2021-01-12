// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         infinite: true,
//         speed: 1200,
//         adaptiveHeight: false,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/left.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/right.png"></button>',
//         responsive: [
//             {
//               breakpoint: 992,
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//             }
//         ]
//     });
// });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    speed: 1200
  });

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });

$(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back')  
  
  //Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
 
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  //Validate

  function validate(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format("Введите не менее {0} символов!")
        },
        phone: {
          required: "Пожалуйста, введите свой номер телефона!"
        },
        email: {
          required: "Пожалуйста, введите свою почту!",
          email: "Введите почтовый адрес почты в формате name@mail.ru"
        }
      }
    });
  };

  validate('#consultation-form');
  validate('#consultation .feed-form');
  validate('#order .feed-form');

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      // $('#consultation, #order').fadeOut().validate('#consultation-form');
      // $('.overlay, #thanks').fadeIn('slow');
    
      $('form').trigger('reset');
    });
    return false;
  }); 
}); 