

'use strict';

import {classie} from './classie';

  var slider= document.querySelector('.slider'),
      slides=[].slice.call(slider.querySelectorAll('.slider__slide')),
      slidesTotal=slides.length-1,
      navRightCtrl=slider.querySelector('.btn--next'),
      navLeftCtrl=slider.querySelector('.btn--prev'),
      current;

      function init(){
        initEvent();
        navigate(current=0);
      }

      function initEvent(){
        //navigation
        navLeftCtrl.addEventListener('click',function(){navigate('left');});
        navRightCtrl.addEventListener('click', function(){navigate('right');});

        document.addEventListener('keydown', function(e){
          if(e.keyCode == 37){
            navigate('left');
          }else if(e.keyCode == 39){
            navigate('right');
          }
        });
      }

      function navigate(direction){
        if(direction==='right'){
          current= current < slidesTotal? current + 1: 0;
        }else if(direction === 'left'){
          current= current > 0? current - 1: slidesTotal;
        }else{
          current=direction;
        }
        slides.forEach(slide => {
          classie.remove(slide,'slider__slide--current');
        });
        classie.add(slides[current],'slider__slide--current');
      }



      export {init as slider};
