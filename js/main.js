//scrolling window
function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);

    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

var scroll1 = document.querySelector('.scroll1');
var scroll2 = document.querySelector('.scroll2');
var scroll3 = document.querySelector('.scroll3');
var scroll4 = document.querySelector('.scroll4');
scroll1.addEventListener('click', function () {
    smoothScroll('#showcase', 1000);
});
scroll2.addEventListener('click', function () {
    smoothScroll('#new', 1000);
});
scroll3.addEventListener('click', function () {
    smoothScroll('#feature', 1000);
});
scroll4.addEventListener('click', function () {
    smoothScroll('#acc', 1000);
});

//cart
