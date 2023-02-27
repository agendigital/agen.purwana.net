'use strict';

(function () {

    /* hasClass */
    var hasClass = function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    };

    /* hasAttr */
    var hasAttr = function hasAttr(el, attrName, val) {
        var attrVal = void 0,
            toreturn = void 0;
        attrVal = el.getAttribute(attrName);
        if (val === null || val === undefined) {
            if (attrVal) {
                toreturn = true;
            } else {
                toreturn = false;
            }
        } else {
            if (attrVal === val) {
                toreturn = true;
            } else {
                toreturn = false;
            }
        }
        return toreturn;
    };

    /* addClass */
    var addClass = function addClass(el, className, callback) {
        if (el.classList) el.classList.add(className);else if (!hasClass(el, className)) el.className += ' ' + className;
        if (callback) {
            callback();
        }
    };

    /* removeClass */
    var removeClass = function removeClass(el, className, callback) {
        if (el) {
            if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        }
        if (callback) {
            callback();
        }
    };

    /* toggleClass */
    var toggleClass = function toggleClass(el, className, callback) {
        if (el.classList) {
            el.classList.toggle(className);
        } else {
            var classes = el.className.split(' ');
            var existingIndex = classes.indexOf(className);
            if (existingIndex >= 0) classes.splice(existingIndex, 1);else classes.push(className);
            el.className = classes.join(' ');
        }
        if (callback) {
            callback();
        }
    };

    var removeActive = function removeActive() {
        var active = document.querySelectorAll('.is-active');
        window.addEventListener('click', function () {
            for (var i = 0; i < active.length; i++) {
                removeClass(active[i], 'is-active');
            }
        });

        window.addEventListener('keyup', function (e) {
            if (e.keyCode == 27) {
                for (var i = 0; i < active.length; i++) {
                    removeClass(active[i], 'is-active');
                }
            }
        });
    };

    function countScroll(){
        $('.count').each(function(i){
            var bottom_of_object = $(this).offset().top + 50;
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_object ){
              animateCount()
            }
        });
    }countScroll();

    var burger = function burger(el, navId, header, main, footer) {
        var elm = document.querySelector(el);
        var nav = document.getElementById(navId);
        var hdr = document.getElementById(header);
        var man = document.getElementById(main);
        var ftr = document.getElementById(footer);
        if (elm) {
            elm.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleClass(this, 'is-active');
                toggleClass(nav, 'is-active');
                toggleClass(hdr, 'is-active');
                toggleClass(man, 'is-active');
                toggleClass(ftr, 'is-active');
                removeActive();
            });
        }

        if (nav) {
            nav.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }
    };

    $('.header-sleekr__menu').each(function () {
      var $t = $(this),
        $link = $t.find('.nav-item.has-sub'),
        $linkNoSub = $t.find('.nav-item:not(.has-sub)'),
        $dropdown = $t.find('.nav-dropdown'),
        $block = $dropdown.find('.block');

      $link.each(function () {
        var $el = $(this),
          $target = $el.data('target'),
          $link = $el.find('.nav-link'),
          $linkWidht = $link.width(),
          $linkLeft = $link.offset().left,
          $targetWidth = $($target).outerWidth(),
          $targetHeight = $($target).outerHeight() + 10,
          $targetPos = $linkLeft + ($linkWidht / 2) - ($targetWidth / 2);

        $el.on('mouseover', function () {
          window.setTimeout(function () {
            $dropdown.addClass('initial')
          }, 200);
          $dropdown.addClass('show');
          $dropdown.removeClass('hidden');
          $dropdown.css({
            'top': 'calc(100% - 10px)',
            'left': $targetPos,
            'width': $targetWidth,
            'height': $targetHeight,
            'transform': 'none'
          });
          $block.removeClass('active');
          $($target).addClass('active');
        });
        $t.on('mouseleave', function () {
          $dropdown.addClass('hidden');
        });
        $linkNoSub.on('mouseover', function () {
          $dropdown.addClass('hidden');
        });
      })
    });

    $('.mobile-menu').click(function () {
      $('body').toggleClass('menu-open');
    });

    $('header.header-sleekr li.has-sub > a').unbind('click').click(function (e) {
      if ($(window).width() < 992) {
        if ($(this).parent().hasClass('expand')) {
          $(this).parent().removeClass('expand');
          $('.header-sleekr').removeClass('sub-menu-open');
          return false;
        } else {
          $('.header-sleekr').find('.has-sub').not(this).removeClass('expand');
          $(this).parent().toggleClass('expand');
          $('.header-sleekr').addClass('sub-menu-open');
          return false;
        }
      }
    });

    function scrollDetect() {
      var lastScrollTop = 0;

      // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
      document.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop){
          if(!$('.header-sleekr').hasClass('scroll-down')) {
            $('.header-sleekr').addClass('scroll-down');
          }
        } else {
          if($('.header-sleekr').hasClass('scroll-down')) {
            $('.header-sleekr').removeClass('scroll-down');
          }
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      }, false);
    }
    scrollDetect();

    var prevScrollpos = window.pageYOffset;
    var tabAnchor = document.querySelectorAll('.c-tab--header_item');
    var sectionTarget = document.querySelectorAll('.jl-scroll');
    var scrollFunction = function scrollFunction() {

        /* back on top */
        var b = document.querySelector('.c-backtotop');
        if (b) {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                if (!hasClass(b, 'is-show')) b.classList.add('is-show');
            } else {
                if (hasClass(b, 'is-show')) b.classList.remove('is-show');
            }
        }
        /* end back on top */

        /* sticky tab */
        var t = document.querySelector('.jc-sticky');
        var el = document.querySelectorAll('.jl-scroll');
        if (t) {
            if (el) {
                if (sectionTarget.length > 0 && sectionTarget != null && sectionTarget != undefined) {
                    var _scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

                    if (_scrollTop > sectionTarget[0].offsetTop && _scrollTop < sectionTarget[1].offsetTop + sectionTarget[1].offsetHeight) {
                        if (!hasClass(t, 'is-sticky')) t.classList.add('is-sticky');
                    } else {
                        if (hasClass(t, 'is-sticky')) t.classList.remove('is-sticky');
                    }
                }
            }
        }
        /* end sticky tab */

        /* sticky header */
        var h = document.querySelector('.e-header');
        if (h) {
            var currentScrollPos = window.pageYOffset;
            var headerHeight = h.getBoundingClientRect();
            var headerTop = h.querySelector('.e-header--top').getBoundingClientRect();
            // debugger
            if (prevScrollpos < currentScrollPos && headerHeight.height < currentScrollPos) {
                h.style.top = 0 - headerHeight.height - 30 + 'px';
                removeClass(h, 'is-down');
                if (t) {
                    if (hasClass(t, 'is-sticky')) {
                        if (hasClass(t, 'on-bottom')) t.classList.remove('on-bottom');
                    }
                }
            } else if (currentScrollPos < headerHeight.height) {
                h.style.top = '0';
                removeClass(h, 'is-down');
                if (t) {
                    if (!hasClass(t, 'is-sticky')) {
                        if (hasClass(t, 'on-bottom')) t.classList.remove('on-bottom');
                    }
                }
            } else {
                h.style.top = 0 - headerTop.height + 7 + 'px';
                addClass(h, 'is-down');
                if (t) {
                    if (hasClass(t, 'is-sticky')) {
                        if (!hasClass(t, 'on-bottom')) t.classList.add('on-bottom');
                    }
                }
            }
            prevScrollpos = currentScrollPos;
        }
        /* end sticky header */

        /* change tab link state */
        if (sectionTarget.length > 0 && sectionTarget != null && sectionTarget != undefined) {
            var index = sectionTarget.length;

            while (--index && window.scrollY + 50 < sectionTarget[index].offsetTop) {}

            tabAnchor.forEach(function (tabAnchor) {
                return tabAnchor.classList.remove('on-target');
            });
            tabAnchor[index].classList.add('on-target');
        }
        /* end change tab link state */
    };

    // When the user clicks on the button, scroll to the top of the document
    var topFunction = function topFunction() {
        var b = document.querySelector('.c-backtotop');
        if (b) {
            b.addEventListener('click', function (e) {
                event.preventDefault();
                !window.requestAnimationFrame ? window.scrollTo(0, 0) : scrollTop(700);
            });
        }
    };

    var scrollTop = function scrollTop(duration) {
        var start = window.scrollY || document.documentElement.scrollTop,
            currentTime = null;

        var animateScroll = function animateScroll(timestamp) {
            if (!currentTime) currentTime = timestamp;
            var progress = timestamp - currentTime;
            var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
            window.scrollTo(0, val);
            if (progress < duration) {
                window.requestAnimationFrame(animateScroll);
            }
        };

        window.requestAnimationFrame(animateScroll);
    };

    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    /* end scroll header & back to top */

    /* smooth scroll anchor link */
    var smoothScrollLink = function smoothScrollLink() {
        var navTrigger = document.querySelectorAll('.c-tab--header_item a');
        if (navTrigger.length > 0 && navTrigger != null && navTrigger != undefined) {
            for (var i = 0; i < navTrigger.length; i++) {
                navTrigger[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    doScrolling(this.getAttribute('href'), 1000);
                });
            }
        }        
    };

    var getElementY = function getElementY(query) {
        return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top;
    };    

    var doScrolling = function doScrolling(element, duration) {
        var startingY = window.pageYOffset;
        var elementY = getElementY(element);
        var elTarget = element;
        // If element is close to page's bottom then window will scroll only to some position above the element.

        var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;

        if (element == "#feature") {
            if (window.screen.availWidth > 768) {
                if (startingY > elementY) {
                    targetY = targetY - 120;
                } else {
                    targetY = targetY - 50;
                }
            } else if (window.screen.availWidth <= 768) {
                if (startingY > elementY) {
                    targetY = targetY - 150;
                } else {
                    targetY = targetY - 80;
                }
            }
        } else {
            if (window.screen.availWidth > 768) {
                if (startingY > elementY) {
                    targetY = targetY - 30;
                } else {
                    targetY = targetY;
                }
            } else if (window.screen.availWidth <= 768) {
                if (startingY > elementY) {
                    targetY = targetY - 45;
                } else {
                    targetY = targetY - 20;
                }
            }
        }

        var diff = targetY - startingY;
        // Easing function: easeInOutCubic
        // From: https://gist.github.com/gre/1650294
        var easing = function easing(t) {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        var start = void 0;

        if (!diff) return;

        // Bootstrap our animation - it will get called right before next frame shall be rendered.
        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            // Elapsed miliseconds since start of scrolling.
            var time = timestamp - start;
            // Get percent of completion in range [0, 1].
            var percent = Math.min(time / duration, 1);
            // Apply the easing.
            // It can cause bad-looking slow frames in browser performance tool, so be careful.
            percent = easing(percent);

            window.scrollTo(0, startingY + diff * percent);

            // Proceed with animation as long as we wanted it to.
            if (time < duration) {
                window.requestAnimationFrame(step);
            }
        });
    };
    /* end smooth scroll anchor link */

    /* tab click active status */
    var tabOnClick = function tabOnClick() {
        var tabItem = document.querySelectorAll('.c-tab--header_item');
        if (tabItem) {
            for (var i = 0; i < tabItem.length; i++) {
                tabItem[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    var tabParent = this.closest('.c-tab');
                    if (tabParent) {
                        var t = tabParent.querySelectorAll('.c-tab--header_item');
                        if (t) {
                            for (var j = 0; j < t.length; j++) {
                                if (hasClass(t[j], 'on-target')) t[j].classList.remove('on-target');
                            }
                        }
                        if (!hasClass(this, 'on-target')) this.classList.add('on-target');
                    }
                });
            }
        }
    };

    /* end tab click active status */

    /* modal */
    var modalTrigger = function modalTrigger(trigger) {
        var mt = document.querySelectorAll(trigger);
        if (mt) {
            for (var i = 0; i < mt.length; i++) {
                mt[i].addEventListener('click', function (e) {
                    e.stopPropagation();
                    var tm = this.getAttribute('data-target');
                    var id = this.getAttribute('data-id');
                    var tm_ = document.querySelector(tm);
                    var cm = tm_.getAttribute('class');
                    var cm_ = tm_.querySelector('.' + cm + '__close');
                    var tl = this.querySelector('label').innerText;
                    if (tm_) {
                        if (!hasClass(tm_, 'is-active')) tm_.classList.add('is-active');
                    }
                    removeActive();
                    modalCloseTrigger(cm_, cm);
                    replaceContentSendinBlue(id, tm_, tl);

                    tm_.addEventListener('click', function (e) {
                        e.stopPropagation();
                    });
                });
            }
        }
    };

    var modalCloseTrigger = function modalCloseTrigger(trigger, target) {
        trigger.addEventListener('click', function (e) {
            e.stopPropagation();
            var tp = this.closest('.' + target);
            if (tp) {
                if (hasClass(tp, 'is-active')) tp.classList.remove('is-active');
            }
        });
    };
    /* end modal */

    // SendinBlue Hacking Script
    var removeSendinBlue = function removeSendinBlue(target) {
        var el = document.querySelector(target);
        if (el) {
            var metas = el.getElementsByTagName('meta');
            var links = el.getElementsByTagName('link');
            var styles = el.getElementsByTagName('style');

            removeTagSendinBlue(metas);
            removeTagSendinBlue(links);
            removeTagSendinBlue(styles);
        }
    };

    var removeTagSendinBlue = function removeTagSendinBlue(target) {
        if (target.viewport) target.viewport.remove();
        for (var i = 0; i < target.length; i++) {
            target[i].remove();
        }
    };

    var replaceContentSendinBlue = function replaceContentSendinBlue(id, target, heading) {
        var form = target.querySelector('form');
        if (form) {
            var urlAction = form.action;
            var value = urlAction.substring(urlAction.lastIndexOf('/') + 1);
            var url = urlAction.replace(value, id);
            target.querySelector('form').setAttribute('action', url);
            form.querySelector('#company-name').innerText = heading;
        }
    };

    /* Smooth scroll to spesific element after load complete */
    var hashChecker = function hashChecker(){
        if(window.location.hash) {
            window.scrollTo(0, 0);
            var target = window.location.hash.split('#');
            doScrolling('#'+target[1], 1000);
        } 
    }

    var headerScript = function headerScript(){
      var header = $('header');
      var lastScroll = 0;
      $(window).scroll(function () {

        var scroll = $(window).scrollTop();
        if (scroll > 5) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
        if (scroll > lastScroll) {
            header.removeClass('show-top');
        } else {
            header.addClass('show-top');
        }
        lastScroll = scroll;

        countScroll();
        // animation();
      });

      $('.header .header__main .main-menu .main-menu__item.has-child .main-menu__link').each(function(){
        //console.log(this);
        this.addEventListener('click', function() {
          //console.log('sini');
          if($(window).width() < 992) {
            var target = $('.header .header__left .header__back span');
            if(target) {
              target.html($(this).html());
            }
          }
        })
        /*$(this).on('click',function(){
          console.log('sini');
          if($(window).width() < 992) {
            var target = $('.header .header__left .header__back span');
            if(target) {
              target.html($(this).html());
            }
          }
        })*/
      });
  
  
      $('.header .header__left .header__back').on('click',function(){
        //console.log('sini 2');
        $('.main-menu__item.has-child').each(function(){
          if($(this).hasClass('expand')) {
            $(this).removeClass('expand');
          }
        });
  
        if($('.header').hasClass('sub-open')) {
          $('.header').removeClass('sub-open');
        }
      });

      if ($(window).scrollTop() > 0) {
        $('header').addClass('fixed');
      }
      
      $('.burger-menu').unbind('click').click(function () {
        $('body').toggleClass('menu-open');
        if ($(this).attr('id') == 'show_burger_menu') {
          $(this).attr('id', 'hide_burger_menu');
        } else {
          $(this).attr('id', 'show_burger_menu');
        }
      });
  
      $('body').on('click', '.header_bg', function () {
        $('body').removeClass('menu-open');
      });
  
      $('header .has-child > a').unbind('click').click(function (e) {
        if ($(window).width() < 992) {
          var $par = $(this).parent();
          if($par.hasClass('expand')){
            $par.removeClass('expand');
            // $('header').removeClass('sub-open');
          } else {
            // $('header .has-child').removeClass('expand');
            $par.addClass('expand');
            $('header').addClass('sub-open');
          }
          // $(this).parent().toggleClass("expand");
          return false;
        }
      })
    }

    var init = function init() {
        burger('.l-burger', 'nav-xs', 'header', 'main', 'footer');
        modalTrigger('.jc-modal');
        removeSendinBlue('.c-modal__body');
        tabOnClick();
        topFunction();
        smoothScrollLink();
        headerScript();

        window.onscroll = function () {
            scrollFunction();
        };

        window.onload = function() {
            hashChecker();
        }

        function slidermobile() {
          var w = $(window).width(),
            slider = $('.slider-xs');
          if (w < 760) {
            slider.addClass('owl-carousel').removeClass('ns');
            slider.each(function () {
              var t = $(this),
                item = t.attr('data-items') ? t.attr('data-items') : 1,
                navs = t.attr('data-nav') && t.attr('data-nav') == "no" ? false : true,
                dot = t.attr('data-dot') && t.attr('data-dot') == "yes" ? true : false,
                centers = t.attr('data-center') && t.attr('data-center') == "yes" ? true : false,
                sP = t.attr('data-sp') ? t.attr('data-sp') : 0,
                loops = t.attr('data-loop') && t.attr('data-loop') == "no" ? false : true,
                itemtab = item > 3 ? 3 : item,
                itemltab = item > 4 ? 4 : item;
              t.owlCarousel({
                loop: loops,
                dots: dot,
                nav: false,
                autoplay: true,
                autoHeight: true,
                autoplayTimeout: 10000,
                autoplaySpeed: 800,
                stagePadding: parseInt(sP),
                center: centers,
                rewind: true,
                responsive: {
                  0: {
                    items: item
                  },
                  992: {
                    items: 3
                  },
                }
              })
            })
    
    
          } else {
            slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            slider.find('.owl-stage-outer').children().unwrap();
          }
        }
        slidermobile();

        $('.slider').each(function () {
          var t = $(this),
            item = t.attr('data-items') ? t.attr('data-items') : 1,
            navs = t.attr('data-nav') && t.attr('data-nav') == "yes" ? true : false,
            centers = t.attr('data-center') && t.attr('data-center') == "yes" ? true : false,
            dot = t.attr('data-dot') && t.attr('data-dot') == "yes" ? true : false,
            auto = t.attr('data-auto') && t.attr('data-auto') == "no" ? false : true,
            loops = t.attr('data-loop') && t.attr('data-loop') == "no" ? false : true,
            child = t.children().length,
            ah = t.attr('data-height') && t.attr('data-height') == "auto" ? true : false,
            itemtab = item > 1 ? 2 : 1;
    
          if (child >= item && child > 1) {
    
            t.addClass('owl-carousel').each(function () {
              var t = $(this);
              t.owlCarousel({
                loop: loops,
                dots: dot,
                nav: navs,
                navText: ["<span class='prev'></span>", "<span class='next'></span>"],
                autoplay: auto,
                autoplayTimeout: 8000,
                autoplaySpeed: 800,
                navSpeed: 800,
                dotsSpeed: 800,
                center: centers,
                autoHeight: ah,
                items: item,
                rewind: !loops,
                responsive: {
                  0: {
                    items: 1
                  },
                  768: {
                    items: itemtab
                  },
                  992: {
                    items: item
                  }
                }
              })
            })
          } else {
            t.addClass('no-slider slider-xs slider-tab').attr('data-items', 1);
            slidermobile();
          }
        });

        $('.accordion').each(function () {
          var t = $(this),
            c = t.find('.card');
    
          c.each(function () {
            var ct = $(this),
              ch = ct.find('.card__header'),
              cb = ct.find('.collapse');
    
            ch.click(function () {
              //console.log('s')
              if (!$(this).hasClass('collapsed')) {
                ct.removeClass('open');
                ch.addClass('collapsed');
                cb.slideUp();
                //console.log('close')
              } else {
                c.not(this).removeClass('open');
                c.not(this).find('.card__header').addClass('collapsed');
                c.not(this).find('.collapse').slideUp();
                ct.addClass('open');
                ch.removeClass('collapsed');
                cb.slideDown();
                //console.log('open')
              }
            })
    
          })
        });
    };
    init();
})();