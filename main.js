AOS.init({
    once: true
});
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