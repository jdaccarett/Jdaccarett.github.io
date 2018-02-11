
/* HAMBURGER MENU */

// Settin up variables
var bars = document.getElementById("nav-action");
var nav = document.getElementById("nav");
var navbtn = document.getElementById("navbtn");

// Set up the listener
bars.addEventListener("click", barClicked, false);
// Set up the listener
navbtn.addEventListener("click", barClicked, false);

//settin up the clicked Effect
function barClicked(){
    bars.classList.toggle('active');
    nav.classList.toggle('visible');
}

//nav links clicked scroll down animation.
$( document ).ready(function() {
    // Nav-bar Scroll Function
    $(".nav-link").click(function(){
        barClicked();
        if($(this.hash).height() > $(window).height()) {
            $('html,body').animate({
                scrollTop: $(this.hash).offset().top-25
            }, 1000);
        } else {
            $('html,body').animate({
                scrollTop: $(this.hash).offset().top-(($(window).height() - $(this.hash).innerHeight())/2)
            }, 1000);
        }
        return false;
    });
});

//MAILER
$(document).ready(function(){
  $('.flip').click(function(){
    $('.cont-flip').toggleClass('flipped');
    return false;
  });
});