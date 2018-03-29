import {Injectable} from '@angular/core';

declare var HTMLElement: any;
declare var window: any;
declare var document: any;
declare var navigator: any;

@Injectable()
export class InitJsService {




    constructor() {
    }


    static initRules() {
        setTimeout(function () {
            (function () {
                var arrow: any = document.getElementsByClassName('all-rules--green')[0],
                    contents: any = document.getElementsByClassName('all-rules--contents')[0];

                arrow.onclick = function (e) {
                    var isOpen = false;
                    for (var i = 0; i < arrow.classList.length; i++) {
                        if ('open' == arrow.classList[i]) {
                            isOpen = true;
                            break;
                        }
                    }

                    if (isOpen) {
                        arrow.classList.remove('open');
                        contents.style.height = '0';
                    } else {
                        arrow.classList.add('open');
                        contents.style.height = contents.getElementsByClassName('container')[0].clientHeight + 'px';
                    }
                };
            })();
        }, 0);
    }

    static initEscape() {
        setTimeout(function () {
            (function () {
                var elements: any = document.getElementsByClassName('escape');

                for (var i = 0; i < elements.length; i++) {
                        var element = document.getElementsByClassName('escape')[i];
                        element.onmouseover = function (e) {
                            element.innerHTML = 'Coming Soon';
                            element.setAttribute('aria-disabled', 'true');
                            element.setAttribute('href', '#');
                        };
                        element.onmouseout = function (e) {
                            element.innerHTML = 'Escape Rooms';
                        };
                    }


            })();
        }, 0);
    }


    static initMenu() {
        setTimeout(function () {
            (function () {
                var UID: any = {
                    _current: 0,
                    getNew: function () {
                        this._current++;
                        return this._current;
                    }
                };
                HTMLElement.prototype.pseudoStyle = function (element: any, prop: any, value: any) {
                    var _this: any = this;
                    var _sheetId: any = 'pseudoStyles';
                    var _head: any = document.head || document.getElementsByTagName('head')[0];
                    var _sheet: any = document.getElementById(_sheetId) || document.createElement('style');
                    _sheet.id = _sheetId;
                    var className = 'pseudoStyle' + UID.getNew();

                    _this.className += ' ' + className;

                    _sheet.innerHTML += ' .' + className + ':' + element + '{' + prop + ':' + value + '}';
                    _head.appendChild(_sheet);
                    return this;
                };

                var active: any = document.getElementsByClassName('menu-active')[0],
                    // locList: any = document.getElementsByClassName('loc-list')[0],
                    askContain: any = document.getElementById('ask-contain'),
                    askNo: any = document.getElementById('ask-no'),
                    // menuLoc: any = document.getElementsByClassName('menu-loc')[0],
                    header: any = document.getElementsByTagName('header')[0],
                    // locs: any = document.getElementsByClassName('loc-list--item'),
                    menu: any = document.getElementsByClassName('menu')[0],
                    menuLinks: any = document.getElementsByTagName('a'),

                    menuAbout: any = document.getElementsByClassName('menu-about')[0],
                    aboutList: any = document.getElementsByClassName('about-list')[0],
                    abouts: any = document.getElementsByClassName('about-list--item'),

                    menuLocations: any = document.getElementsByClassName('menu-locations')[0],
                    locationsList: any = document.getElementsByClassName('location-list')[0],
                    locations: any = document.getElementsByClassName('location-list--item'),

                    menuTramp: any = document.getElementsByClassName('menu-tramp')[0],
                    trampList: any = document.getElementsByClassName('tramp-list')[0],
                    tramps: any = document.getElementsByClassName('tramp-list--item');

                //menuTramp.style.paddingBottom = "4px";

              // active.pseudoStyle("after", "width", active.clientWidth + 22 + "px");
              // active.pseudoStyle("after", "left", "-11px");
              // menuLoc.onmouseover = function (ev) {
              //     locList.style.display = 'block';
              //     locList.style.width = menuLoc.clientWidth + 44 + 'px';
              //     locList.style.left = '-20px';
              // };

              if(menuAbout) {
                menuAbout.onmouseover = function (ev) {
                  aboutList.style.display = 'block';
                  //aboutList.style.width = menuAbout.clientWidth + 44 + 'px';
                  aboutList.style.left = '-20px';
                  if (trampList) { trampList.style.display = 'none'; }
                  if (locationsList) { locationsList.style.display = 'none'; }
                };
              }

              if(menuLocations) {
                menuLocations.onmouseover = function (ev) {
                  locationsList.style.display = 'block';
                  locationsList.style.width = menuLocations.clientWidth + 44 + 'px';
                  locationsList.style.left = '-26px';
                  if (trampList) { trampList.style.display = 'none'; }
                  if (aboutList) { aboutList.style.display = 'none'; }
                };
              }

              if(menuTramp) {
                menuTramp.onmouseover = function (ev) {
                  trampList.style.display = 'block';
                  trampList.style.width = menuTramp.clientWidth + 44 + 'px';
                  trampList.style.left = '-20px';
                  if (aboutList) { aboutList.style.display = 'none'; }
                  if (locationsList) { locationsList.style.display = 'none'; }
                };
              }

              header.onmouseout = function (ev) {
                // locList.style.display = 'none';
                if(trampList){trampList.style.display = 'none';}
                if(aboutList){aboutList.style.display = 'none';}
                if(locationsList){locationsList.style.display = 'none';}
              };
                // for (var i = 0; i < locs.length; i++) {
                //     locs[i].onclick = function (ev: any) {
                //         askContain.getElementsByTagName('h3')[0].innerHTML = 'Go to Adrenaline ' + ev.target.innerHTML + '?';
                //         askContain.getElementsByTagName('a')[0].setAttribute('href', ev.target.getAttribute('link'));
                //         var toggle: any = document.getElementsByClassName('toggle-mnu')[0];
                //         if (toggle && toggle.classList.contains('on')) {
                //             toggle.classList.remove('on');
                //             menu.style.display = 'none';
                //         }
                //         locList.style.display = 'none';
                //         askContain.classList.add('slideDown');
                //     };
                // }
              askNo.onclick = function (ev: any) {
                askContain.classList.remove('slideDown');
              };

                for (var i = 0; i < tramps.length; i++) {
                    tramps[i].onclick = function (ev: any) {
                        var toggle: any = document.getElementsByClassName('toggle-mnu')[0];
                        if (toggle && toggle.classList.contains('on')) {
                            toggle.classList.remove('on');
                            menu.style.display = 'none';
                        }
                        if(aboutList){aboutList.style.display = 'none';}
                      if(locationsList){locationsList.style.display = 'none';}
                        // locList.style.display = 'none';
                    };
                }

              for (var i = 0; i < locations.length; i++) {
                locations[i].onclick = function (ev: any) {
                  var toggle: any = document.getElementsByClassName('toggle-mnu')[0];
                  if (toggle && toggle.classList.contains('on')) {
                    toggle.classList.remove('on');
                    menu.style.display = 'none';
                  }
                  if(aboutList){aboutList.style.display = 'none';}
                  if(trampList){trampList.style.display = 'none';}
                  // locList.style.display = 'none';
                };
              }

                for (var i = 0; i < abouts.length; i++) {
                    abouts[i].onclick = function (ev: any) {
                        var toggle: any = document.getElementsByClassName('toggle-mnu')[0];
                        if (toggle && toggle.classList.contains('on')) {
                            toggle.classList.remove('on');
                            menu.style.display = 'none';
                        }
                      if(trampList){trampList.style.display = 'none';}
                      if(locationsList){locationsList.style.display = 'none';}
                    };
                };

                for (i = 0; i < menuLinks.length; i++) {
                    menuLinks[i].onclick = function (ev: any) {
                        var toggle: any = document.getElementsByClassName('toggle-mnu')[0];
                        if (toggle && toggle.classList.contains('on')) {
                            toggle.classList.remove('on');
                            menu.style.display = 'none';
                        }
                        // locList.style.display = 'none';
                        if(trampList){trampList.style.display = 'none';}
                        if(aboutList){aboutList.style.display = 'none';}
                    };
                }

            })();
        }, 0);
    }

  static afterViewMenuTramp(){
    setTimeout(function () {
      (function () {

        var active: any = document.getElementsByClassName('menu-active')[0],
          // locList: any = document.getElementsByClassName('loc-list')[0],
          askContain: any = document.getElementById('ask-contain'),
          askNo: any = document.getElementById('ask-no'),
          // menuLoc: any = document.getElementsByClassName('menu-loc')[0],
          header: any = document.getElementsByTagName('header')[0],
          // locs: any = document.getElementsByClassName('loc-list--item'),
          menu: any = document.getElementsByClassName('menu')[0],
          menuLinks: any = document.getElementsByTagName('a'),

          menuAbout: any = document.getElementsByClassName('menu-about')[0],
          aboutList: any = document.getElementsByClassName('about-list')[0],
          abouts: any = document.getElementsByClassName('about-list--item'),

          menuLocations: any = document.getElementsByClassName('menu-locations')[0],
          locationsList: any = document.getElementsByClassName('location-list')[0],
          locations: any = document.getElementsByClassName('location-list--item'),

          menuTramp: any = document.getElementsByClassName('menu-tramp')[0],
          trampList: any = document.getElementsByClassName('tramp-list')[0],
          tramps: any = document.getElementsByClassName('tramp-list--item');

        if(menuTramp) {
          menuTramp.onmouseover = function (ev) {
            trampList.style.display = 'block';
            //trampList.style.width = menuTramp.clientWidth + 44 + 'px';
            //trampList.style.left = '-20px';
            if (aboutList) { aboutList.style.display = 'none'; }
            if (locationsList) { locationsList.style.display = 'none'; }
          };
        }

        if(menuAbout) {
          menuAbout.onmouseover = function (ev) {
            aboutList.style.display = 'block';
            //aboutList.style.width = menuAbout.clientWidth + 44 + 'px';
            aboutList.style.left = '-20px';
            if (trampList) { trampList.style.display = 'none'; }
            if (locationsList) { locationsList.style.display = 'none'; }
          };
        }

        if(menuLocations) {
          menuLocations.onmouseover = function (ev) {
            locationsList.style.display = 'block';
            //locationsList.style.width = menuLocations.clientWidth + 44 + 'px';
            locationsList.style.left = '-20px';
            if (trampList) { trampList.style.display = 'none'; }
            if (aboutList) { aboutList.style.display = 'none'; }
          };
        }
        header.onmouseout = function (ev) {
          if(trampList){trampList.style.display = 'none';}
          if(aboutList){aboutList.style.display = 'none';}
          if(locationsList){locationsList.style.display = 'none';}
        };

      })();
    },0)
  }

  static afterViewMenuLocations(){
    setTimeout(function () {
      (function () {

        var active: any = document.getElementsByClassName('menu-active')[0],
          // locList: any = document.getElementsByClassName('loc-list')[0],
          askContain: any = document.getElementById('ask-contain'),
          askNo: any = document.getElementById('ask-no'),
          // menuLoc: any = document.getElementsByClassName('menu-loc')[0],
          header: any = document.getElementsByTagName('header')[0],
          // locs: any = document.getElementsByClassName('loc-list--item'),
          menu: any = document.getElementsByClassName('menu')[0],
          menuLinks: any = document.getElementsByTagName('a'),

          menuAbout: any = document.getElementsByClassName('menu-about')[0],
          aboutList: any = document.getElementsByClassName('about-list')[0],
          abouts: any = document.getElementsByClassName('about-list--item'),

          menuLocations: any = document.getElementsByClassName('menu-locations')[0],
          locationsList: any = document.getElementsByClassName('location-list')[0],
          locations: any = document.getElementsByClassName('location-list--item'),

          menuTramp: any = document.getElementsByClassName('menu-tramp')[0],
          trampList: any = document.getElementsByClassName('tramp-list')[0],
          tramps: any = document.getElementsByClassName('tramp-list--item');

        if(menuTramp) {
          menuTramp.onmouseover = function (ev) {
            trampList.style.display = 'block';
            //trampList.style.width = menuTramp.clientWidth + 44 + 'px';
            //trampList.style.left = '-20px';
            if (aboutList) { aboutList.style.display = 'none'; }
            if (locationsList) { locationsList.style.display = 'none'; }
          };
        }

        if(menuAbout) {
          menuAbout.onmouseover = function (ev) {
            aboutList.style.display = 'block';
            aboutList.style.width = menuAbout.clientWidth + 44 + 'px';
            aboutList.style.left = '-20px';
            if (trampList) { trampList.style.display = 'none'; }
            if (locationsList) { locationsList.style.display = 'none'; }
          };
        }

        if(menuLocations) {
          menuLocations.onmouseover = function (ev) {
            locationsList.style.display = 'block';
            locationsList.style.width = menuLocations.clientWidth + 44 + 'px';
            locationsList.style.left = '-20px';
            if (trampList) { trampList.style.display = 'none'; }
            if (aboutList) { aboutList.style.display = 'none'; }
          };
        }
        header.onmouseout = function (ev) {
          // locList.style.display = 'none';
          if(trampList){trampList.style.display = 'none';}
          if(aboutList){aboutList.style.display = 'none';}
          if(locationsList){locationsList.style.display = 'none';}
        };

      })();
    },0)
  }



    static initBlockOne() {
        setTimeout(function () {
            (function () {
                rectCont();

                window.onresize = function (ev) {
                    rectCont();
                };

                function rectCont() {
                    var wh: any = document.documentElement.clientWidth,
                        leftRect: any = document.getElementsByClassName('left-rect')[0],
                        rightRect: any = document.getElementsByClassName('right-rect')[0];


                    if (wh > 1140) {
                        if (leftRect)
                            leftRect.style.paddingLeft = (((wh - 1140) / 2) + 15) + 'px';
                        if (rightRect)
                            rightRect.style.paddingRight = (((wh - 1140) / 2) + 15) + 'px';
                    }
                }

            })();
        }, 0);

    }


    static initScroll() {
        setTimeout(function () {
            (function () {
                window.requestAnimFrame = (function () {
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
                })();

                function scrollToY(scrollTargetY, speed, easing) {
                    // scrollTargetY: the target scrollY property of the window
                    // speed: time in pixels per second
                    // easing: easing equation to use

                    var scrollY = window.scrollY || document.documentElement.scrollTop,
                        scrollTargetY = scrollTargetY || 0,
                        speed = speed || 2000,
                        easing = easing || 'easeOutSine',
                        currentTime = 0;

                    // min time .1, max time .8 seconds
                    var time: any = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

                    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
                    var easingEquations: any = {
                        easeOutSine: function (pos) {
                            return Math.sin(pos * (Math.PI / 2));
                        },
                        easeInOutSine: function (pos) {
                            return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                        },
                        easeInOutQuint: function (pos) {
                            if ((pos /= 0.5) < 1) {
                                return 0.5 * Math.pow(pos, 5);
                            }
                            return 0.5 * (Math.pow((pos - 2), 5) + 2);
                        }
                    };

                    // add animation loop
                    function tick() {
                        currentTime += 1 / 60;

                        var p: any = currentTime / time;
                        var t: any = easingEquations[easing](p);

                        if (p < 1) {
                            window.requestAnimFrame(tick);

                            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
                        } else {
                            window.scrollTo(0, scrollTargetY);
                        }
                    }

                    // call it once to get started
                    tick();
                }

                var arrow: any = document.getElementById('arrow');
                arrow.onclick = function (e) {
                    scrollToY(document.getElementsByClassName('block-loc')[0].offsetTop - 70, 1500, 'easeInOutQuint');
                };
            })();
        }, 0);


    }


    // static initLoc() {
    //     setTimeout(function () {
    //         (function () {
    //             locCont();

    //             var locsNew: any = document.getElementsByClassName('loc-name'),
    //                 askContain: any = document.getElementById('ask-contain'),
    //                 askNo: any = document.getElementById('ask-no');

    //             for (var i = 0; i < locsNew.length; i++) {
    //                 locsNew[i].onclick = function (ev) {
    //                     console.log(ev.target.getAttribute('link'));
    //                     askContain.getElementsByTagName('h3')[0].innerHTML = 'Go Adrenaline ' + ev.target.innerHTML + '?';
    //                     askContain.getElementsByTagName('a')[0].setAttribute('href', ev.target.getAttribute('link'));
    //                     askContain.classList.add('slideDown');
    //                 };
    //             }

    //             askNo.onclick = function (ev) {
    //                 askContain.classList.remove('slideDown');
    //             };

    //             var lat = document.getElementById('startLat').innerHTML,
    //                 lon = document.getElementById('startLon').innerHTML;

    //             if (!lat) {
    //                 getLoc();
    //             } else {
    //                 useLoc();
    //             }

    //             function locCont() {
    //                 var wh: any = 1140,
    //                     locs = document.getElementsByClassName('all-loc--content'),
    //                     arrow = document.getElementsByClassName('all-loc--green')[0],
    //                     contents = document.getElementsByClassName('all-loc--contents')[0],
    //                     locsWidth = 0;


    //                 if (locs) {
    //                     for (var i: any = 0; i < locs.length; i++) {
    //                         locsWidth += locs[i].clientWidth;
    //                     }

    //                     if (locsWidth < wh) {
    //                         var mgr: any = (wh - locsWidth) / (locs.length - 1) - 20;
    //                         for (i = 0; i < locs.length - 1; i++) {
    //                             locs[i].style.marginRight = mgr + 'px';
    //                         }
    //                     }
    //                 }

    //                 arrow.onclick = function (e) {
    //                     var isOpen: any = false;
    //                     for (var i = 0; i < arrow.classList.length; i++) {
    //                         if ('open' == arrow.classList[i]) {
    //                             isOpen = true;
    //                             break;
    //                         }
    //                     }

    //                     if (isOpen) {
    //                         arrow.classList.remove('open');
    //                         contents.classList.remove('locEntrance');
    //                     } else {
    //                         arrow.classList.add('open');
    //                         contents.classList.add('locEntrance');
    //                     }
    //                 };
    //             }

    //             function getLoc() {
    //                 var geoOptions = {
    //                     maximumAge: 5 * 60 * 1000,
    //                     timeout: 30 * 1000
    //                 };

    //                 var geoSuccess = function (position) {
    //                     document.getElementById('startLat').innerHTML = position.coords.latitude;
    //                     document.getElementById('startLon').innerHTML = position.coords.longitude;

    //                     // Сюда вставить запросы к гуглу, что бы определить ближайший город.
    //                     document.getElementById('startCity').innerHTML = findCity(lat, lon);
    //                     useLoc();
    //                 };

    //                 var geoError = function (error) {
    //                     // Ошибки:
    //                     //   0: unknown error
    //                     //   1: permission denied
    //                     //   2: position unavailable (error response from location provider)
    //                     //   3: timed out
    //                     console.log('Error occurred. Error code: ' + error.code);

    //                     var locContain: any = document.getElementById('ask-loc-contain'),
    //                         locClose: any = document.getElementById('ask-button-close'),
    //                         locClick: any = document.getElementById('click-find'),
    //                         locFind: any = document.getElementById('ask-button-find');

    //                     locClick.onclick = function (ev) {
    //                         locContain.classList.add('slideDown');
    //                     };

    //                     locClose.onclick = function (ev) {
    //                         locContain.classList.remove('slideDown');
    //                     };

    //                     locFind.onclick = function (ev) {
    //                         locContain.classList.remove('slideDown');
    //                     };

    //                     document.getElementsByClassName('loc-four')[0].style.display = 'none';
    //                     document.getElementsByClassName('loc-three')[0].style.display = 'block';
    //                 };

    //                 navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    //             }

    //             function useLoc() {
    //                 var city = document.getElementById('startCity').innerHTML;
    //                 document.getElementsByClassName('loc-two')[0].innerHTML = '<img src="/assets/img/loc-icon.png"><span>' + city + '</span>';
    //                 document.getElementsByClassName('loc-two')[0].style.display = 'block';
    //                 document.getElementsByClassName('loc-four')[0].style.display = 'none';
    //                 document.getElementsByClassName('loc-three')[0].style.display = 'none';
    //             }

    //             function findCity(lat, lon) {
    //                 var arr = [{city: 'Lake Worth', lat: 26.618817, lon: -80.166555},
    //                     {city: 'York', lat: 39.966142, lon: -76.766978},
    //                     {city: 'Columbia', lat: 33.966766, lon: -80.946087},
    //                     {city: 'Lexington', lat: 38.024807, lon: -84.421124},
    //                     {city: 'Cincinnati', lat: 39.293702, lon: -84.311807}];
    //                 var min = distance(arr[0].lat, arr[0].lon, lat, lon, 'M');
    //                 var q = 0;
    //                 for (var i = 1; i < arr.length; i++) {
    //                     var d = distance(arr[i].lat, arr[i].lon, lat, lon, 'M');

    //                     if (d > min) {
    //                         min = d;
    //                         q = i;
    //                     }
    //                 }
    //                 return arr[q].city;
    //             }

    //             function distance(lat1, lon1, lat2, lon2, unit) {
    //                 var radlat1 = Math.PI * lat1 / 180;
    //                 var radlat2 = Math.PI * lat2 / 180;
    //                 var theta = lon1 - lon2;
    //                 var radtheta = Math.PI * theta / 180;
    //                 var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    //                 dist = Math.acos(dist);
    //                 dist = dist * 180 / Math.PI;
    //                 dist = dist * 60 * 1.1515;
    //                 if (unit == 'K') {
    //                     dist = dist * 1.609344;
    //                 }
    //                 if (unit == 'N') {
    //                     dist = dist * 0.8684;
    //                 }
    //                 return dist;
    //             }

    //         })();
    //     }, 0);
    // }

    static initCarousel() {
        setTimeout(function () {

            (function () {
                var wh = document.documentElement.clientWidth,
                    wrap = document.getElementsByClassName('carousel')[0].getElementsByClassName('wrap')[0],
                    items = wrap.getElementsByClassName('item'),
                    leftArr = document.getElementsByClassName('left-arr')[0],
                    rightArr = document.getElementsByClassName('right-arr')[0],
                    dots = document.getElementsByClassName('dot'),
                    numSlides = items.length,
                    slideIndex = 0;

                carCont();
                window.onresize = function (ev) {
                    carCont();
                };

                function carCont() {
                    wh = document.documentElement.clientWidth,
                        wrap.style.width = wh * numSlides + 'px';

                    for (var i = 0; i < items.length; i++) {
                        items[i].style.width = wh + 'px';
                    }

                    leftArr.onclick = function (e) {
                        moveWrap(true);
                    };

                    rightArr.onclick = function (e) {
                        moveWrap(false);
                    };

                    function moveWrap(isLeft) {
                        if (isLeft && slideIndex > 0) {
                            slideIndex -= 1;
                            wrap.style.transition = 'all 300ms ease';
                        } else if (isLeft && slideIndex == 0) {
                            slideIndex = numSlides - 1;
                            wrap.style.transition = 'all 1000ms ease';
                        } else if (!isLeft && slideIndex < numSlides - 1) {
                            slideIndex += 1;
                            wrap.style.transition = 'all 300ms ease';
                        } else if (!isLeft && (slideIndex == (numSlides - 1))) {
                            slideIndex = 0;
                            wrap.style.transition = 'all 1000ms ease';
                        }
                        wrap.style.transform = 'translateX(-' + slideIndex * wh + 'px)';
                        changeDot();
                    }

                    function changeDot() {
                        for (var i = 0; i < dots.length; i++) {
                            dots[i].className = 'dot';
                        }
                        dots[slideIndex].className = 'dot cur';
                    }
                }
            })();

        }, 0);
    }

    static initMobileMenu() {
        (function () {
            window.addEventListener('load', function () {
                var header = document.getElementsByTagName('header')[0];
                document.getElementsByTagName('head')[0].innerHTML += '<meta name="viewport" content="width=device-width, initial-scale=1">';

                //header.firstElementChild.innerHTML += '<a href="#" class="toggle-mnu hidden-lg"><span></span></a>';

                var a = document.createElement('a');
                a.setAttribute('href', 'javascript:void(0)');
                a.className = 'toggle-mnu hidden-lg';
                a.appendChild(document.createElement('span'));
                header.firstElementChild.appendChild(a);

                menu();

                function menu() {
                  var isMobile = false; //initiate as false //
                  // device detection




                    var toggle = document.getElementsByClassName('toggle-mnu')[0],
                        menu = document.getElementsByClassName('menu')[0];


                    toggle.onclick = function (ev) {
                        if (!toggle.classList.contains('on')) {
                            toggle.classList.add('on');
                            menu.style.display = 'block';
                        }
                        else {
                            toggle.classList.remove('on');
                            menu.style.display = 'none';
                        }
                        return false;
                    };
                }
            });
        })();
    }

    // static initLocScroll() {
    //     setTimeout(function () {
    //         (function () {
    //             window.requestAnimFrame = (function () {
    //                 return window.requestAnimationFrame ||
    //                     window.webkitRequestAnimationFrame ||
    //                     window.mozRequestAnimationFrame ||
    //                     function (callback) {
    //                         window.setTimeout(callback, 1000 / 60);
    //                     };
    //             })();

    //             function scrollToY(scrollTargetY, speed, easing) {
    //                 // scrollTargetY: the target scrollY property of the window
    //                 // speed: time in pixels per second
    //                 // easing: easing equation to use

    //                 var scrollY = window.scrollY || document.documentElement.scrollTop,
    //                     scrollTargetY = scrollTargetY || 0,
    //                     speed = speed || 2000,
    //                     easing = easing || 'easeOutSine',
    //                     currentTime = 0;

    //                 // min time .1, max time .8 seconds
    //                 var time: any = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    //                 // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    //                 var easingEquations: any = {
    //                     easeOutSine: function (pos) {
    //                         return Math.sin(pos * (Math.PI / 2));
    //                     },
    //                     easeInOutSine: function (pos) {
    //                         return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    //                     },
    //                     easeInOutQuint: function (pos) {
    //                         if ((pos /= 0.5) < 1) {
    //                             return 0.5 * Math.pow(pos, 5);
    //                         }
    //                         return 0.5 * (Math.pow((pos - 2), 5) + 2);
    //                     }
    //                 };

    //                 // add animation loop
    //                 function tick() {
    //                     currentTime += 1 / 60;

    //                     var p: any = currentTime / time;
    //                     var t: any = easingEquations[easing](p);

    //                     if (p < 1) {
    //                         window.requestAnimFrame(tick);

    //                         window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
    //                     } else {
    //                         window.scrollTo(0, scrollTargetY);
    //                     }
    //                 }

    //                 // call it once to get started
    //                 tick();
    //             }

    //             var find: any = document.getElementById('find-park');
    //             find.onclick = function (e) {
    //                 var loc: any = document.getElementsByClassName('block-loc')[0];
    //                 if (loc) {
    //                     scrollToY(loc.offsetTop - 70, 1500, 'easeInOutQuint');
    //                 } else {
    //                     window.open('/#locations', '_self');
    //                 }
    //             };
    //         })();
    //     }, 0);


    // }


}
