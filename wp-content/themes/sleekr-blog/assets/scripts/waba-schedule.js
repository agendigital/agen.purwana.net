document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    function checkWabaSchedule(){
      const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      var d = new Date(),
          day = days[d.getDay()],
          time = d.getHours(),
          minutes = d.getMinutes();

      var waba = document.querySelectorAll('.cta-waba'),
          scroll_top = document.querySelector('#scroll-top');

      if(waba.length > 0) {
        if(day != 'sat') {
          if(day == 'fri') {
            if(time > 14) {
              for(var i = 0; i < waba.length; i++) {
                if(!waba[i].classList.contains('waba-fix')){
                  if(waba[i].getAttribute('href').includes('wa.me') || waba[i].getAttribute('href').includes('api.whatsapp.com')) {
                    if(waba[i].classList.contains('ic-wa')) {
                      waba[i].classList.add('hidden');
                      if(scroll_top) {
                        scroll_top.classList.add('alt');
                      }
                    } else {
                      waba[i].classList.remove('cta-waba');
                      waba[i].setAttribute('href',inquiry_url);
                      waba[i].setAttribute('target','_self');
                      waba[i].innerHTML = inquiry_label;
                    }
                  }  
                }                         
              }
            } 
          } 
          else if(day == 'sun') {
            if(time < 19) {
              for(var i = 0; i < waba.length; i++) {
                if(!waba[i].classList.contains('waba-fix')){
                  if(waba[i].getAttribute('href').includes('wa.me') || waba[i].getAttribute('href').includes('api.whatsapp.com')) {
                    if(waba[i].classList.contains('ic-wa')) {
                      waba[i].classList.add('hidden');
                      if(scroll_top) {
                        scroll_top.classList.add('alt');
                      }
                    } else {
                      waba[i].classList.remove('cta-waba');
                      waba[i].setAttribute('href',inquiry_url);
                      waba[i].setAttribute('target','_self');
                      waba[i].innerHTML = inquiry_label;
                    }
                  }  
                }  
              }
            } 
          }
        } 
        else {
          for(var i = 0; i < waba.length; i++) {
            if(!waba[i].classList.contains('waba-fix')){
              if(waba[i].getAttribute('href').includes('wa.me') || waba[i].getAttribute('href').includes('api.whatsapp.com')) {
                if(waba[i].classList.contains('ic-wa')) {
                  waba[i].classList.add('hidden');
                  if(scroll_top) {
                    scroll_top.classList.add('alt');
                  }
                } else {
                  waba[i].classList.remove('cta-waba');
                  waba[i].setAttribute('href',inquiry_url);
                  waba[i].setAttribute('target','_self');
                  waba[i].innerHTML = inquiry_label;
                }
              }  
            }  
          }
        }
      } 
    }
    checkWabaSchedule();
  }
};