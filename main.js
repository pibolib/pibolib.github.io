AOS.init();
///Get Distance and Direction scrolled
var scrollDistance = function (callback, refresh) {
    if (!callback || typeof callback !== 'function') return;

    var isScrolling, start, end, distance;

    window.addEventListener('scroll', function (event) {
        if (!start) {
            start = window.pageYOffset;
        }
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
      end = window.pageYOffset;
      console.log(`pageYOffset ${end}`)
      distance = end - start;

      var navbar = $(".navbar")

      // if (end == 0){
      //   navbar
      //   .removeClass("navbar-hide")
      //   .removeClass("navbar-close")
      //   .addClass("navbar-open")
      // }

      if (distance < 0) {
        if (end > 300){
          navbar
          .removeClass("navbar-open")
          .removeClass("navbar-hide")
          .addClass("navbar-close")
        } else {
          navbar
          .removeClass("navbar-hide")
          .removeClass("navbar-close")
          .addClass("navbar-open")
        }
      } else if (distance > 0) {
        if (end > 600){
          navbar
          .removeClass("navbar-open")
          .removeClass("navbar-close")
          .addClass("navbar-hide")
        } else if (end > 0 && end < 900) {
          navbar
          .removeClass("navbar-open")
          .removeClass("navbar-hide")
          .addClass("navbar-close")
        }
      }

            callback(distance, start, end);

            start = null;
            end = null;
            distance = null;

        }, refresh || 30);

    }, false);

};

scrollDistance(function (distance) {
    console.log('You travelled ' + parseInt(Math.abs(distance), 10) + 'px ' + (distance < 0 ? 'up' : 'down'));
});





/// [[  TRANSITIONS  ]]





$(".sliver").on("click", function () {
    var el = $(this)
    //sees if the "sliver" is expanded or not, if it is, exit.
    if (el.data("expanded")) {
        return
    }
    transitionHero(el)
});


$(".modal-back-nav").on("click", function () {
    transitionHeroClose()
})



function transitionHero(el) {
    //gets position data and clones the element
    var elInfo = el[0].getBoundingClientRect();
    var cln = el.clone(true)
    var elObj = {
        "top": elInfo.top,
        "left": elInfo.left,
        "width": elInfo.width,
        "height": elInfo.height,
    }

    console.log("Expanding container", elInfo.top)
    //position the cloned element
    cln.css('position', 'absolute')
    cln.data('elInfo', elObj).data('expanded', true)
        .css('top', elInfo.top)
        .css('left', elInfo.left)
        .css('width', elInfo.width)
        .css('height', elInfo.height)
        .css('margin', '0px')

        //add the cloned element to the foreground container
        .appendTo(".foreground-container-content")

    //move the foreground up in elevation
    $(".foreground").css("z-index", 10).css("display", "inline-block").css('opacity', 1).css('transition', 'opacity 1s')


    //Hide the Navbar
    var navbar = $(".navbar")
    navbar
        .removeClass("navbar-open")
        .removeClass("navbar-close")
        .addClass("navbar-hide")

    //sets body to overflow hidden so that scroll is disabled

    //Add class to move modal to top
    setTimeout(function () {
        cln.addClass('modal-expand')
        cln.find(".sliver-header").css("height", "50vh")

        $("body").css("overflow", "hidden")
    }, 300);
}


function transitionHeroClose() {
    var foreground = $(".foreground")
    var container = $(".foreground-container")
    var containerContent = $(".foreground-container-content")
    var sliver = container.find(".sliver")
    var elObj = sliver.data("elInfo")

    sliver.removeClass("modal-expand")
        .css('top', elObj.top)
        .css('left', elObj.left)
        .css('width', elObj.width)
        .css('height', elObj.height)
        .css('transition', "all 500ms")

    foreground.css('opacity', 0).css("transition", "opacity 500ms")

    $("body").css("overflow", "auto")

    setTimeout(function () {
        containerContent.empty()
        foreground.css("z-index", -10).css("display", "none")
    }, 500);
}
