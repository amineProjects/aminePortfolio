
(function(global){

  var work=document.querySelector(".home__work"),
      cards=[].slice.call(work.querySelectorAll(".card__link"));

    cards.forEach(card => {
      card.addEventListener('click', function(e){
        console.log(e.target);
        setSlide(e.target);
      } ,false);
    });
    function setSlide(target){
      var slidNumber= parseInt(target.id);
      global.localStorage.setItem('current',slidNumber);
    }
})(window);
