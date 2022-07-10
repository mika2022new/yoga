$(document).ready(function() {

    // ---------------- Header hide ---------------- //

    let headerContent = $("#header_content"),
        headerBlock = $("#header_block"),
        menuItem = $(document.querySelectorAll(".menu_item")),
        
        
        burgerBlack = $(document.querySelector('.burger_icon-black')),
        burgerOrange = $(document.querySelector('.burger_icon-orange')),
        
        menu = $(document.querySelector('.menu')),
        menuList = $(document.querySelector('.menu__list'));

        let scrollPosition = 0;


    $(window).on("scroll", function() {

        scrollPosition = $(this).scrollTop();

        if( scrollPosition >= 200) {
            headerContent.addClass("hide");

            headerBlock.addClass("dark");
            menuItem.addClass("blanc");

        } else {
            headerContent.removeClass("hide");

            headerBlock.removeClass("dark");
            menuItem.removeClass("blanc");
        }
    });

       
    // ---------------- ScrollSpy ---------------- //


    $(window).on("scroll", function() {

        scrollPosition = $(this).scrollTop();

        scrollSpy(scrollPosition);


        function scrollSpy(scrollPosition) {

            $("[data-scrollspy]").each(function() {
                

                let sectionId = $(this).data('scrollspy');

                let sectionOffset = $(this).offset().top;
                

                if(scrollPosition >= sectionOffset - 50) {

                    $('[data-scroll]').removeClass('active');

                    $('[data-scroll="' + sectionId + '"]').addClass('active')
                }

                if(scrollPosition <= 50) {

                    $('[data-scroll]').removeClass('active');
                }
            });
        }
    });

    // ---------------- Scroll to sections ---------------- //

    $("[data-scroll]").on("click", function(event) {

        event.preventDefault();

        let scrollElement = $(this).data("scroll");

        let elementPosition = $(scrollElement).offset().top;

        hide();

        function hide() {
            $("html, body").animate({

                scrollTop: elementPosition
    
            }, 1100);

            setTimeout(() => {
                burgerBlack.removeClass('hide');
                burgerOrange.addClass('hide'); 
                
                menu.removeClass('show-nav');
                menuList.removeClass('show-nav');
        
                $("body").removeClass('show-nav');

                if(scrollPosition <= 50) {

                    $('[data-scroll]').removeClass('active');
                }
            }, 1300);
        }
    });
        
});


// ======================================================================== //

// ======================================================================== //


window.addEventListener('DOMContentLoaded', () => {


            
        // ===== Anim on Scroll ===== //


        const animItems = document.querySelectorAll('.anim-items');

        if (animItems.length > 0) {

            window.addEventListener('scroll', animOnScroll);

            function animOnScroll(params) {

                for (let index = 0; index < animItems.length; index++) {

                    const animItem = animItems[index],                  

                          animItemHeight = animItem.offsetHeight,

                          animItemOffset = offset(animItem).top,

                          animStart = 5;
 
                    let animItemPoint = window.innerHeight - animItemHeight / animStart;

                    if (animItemHeight > window.innerHeight) {

                        animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    }

                    if  ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {

                        animItem.classList.add('_active');

                    } else {

                        if (!animItem.classList.contains('_anim-no-hide')) {

                            animItem.classList.remove('_active');
                        }
                    }
                }
            }


            function offset(el) {

                const rect = el.getBoundingClientRect(),

                      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                      
                      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
            }

            setTimeout(() => {
            
                animOnScroll();
                
            }, 300);

        }    




    const burger = document.querySelector('.burger'),

          burgerBlack = document.querySelector('.burger_icon-black'),
          burgerOrange = document.querySelector('.burger_icon-orange'),
          
          menu = document.querySelector('.menu'),
          menuList = document.querySelector('.menu__list'),
          
          classesBtn = document.querySelector(".cl_btn"),
          summerBtn = document.querySelector(".sm_btn"),

          classesMore = document.querySelectorAll(".cl_more"),
          summerMore = document.querySelectorAll(".sm_more");


        // ===== Burger ===== //

        burger.addEventListener('click', (e) => {
            e.preventDefault();

            document.body.classList.toggle('show-nav');

            burgerBlack.classList.toggle('hide');
            burgerOrange.classList.toggle('hide'); 
            
            menu.classList.toggle('show-nav');
            menuList.classList.toggle('show-nav');
        });

    // ----------------------------------   M o d a l   ---------------------------------- //

    const modalBtn = document.querySelector('.menu__item_contact'),

          modal = document.querySelector('.modal'),
          modalInner = document.querySelector('.modal_inner'),
          
          close = document.querySelector('.modal__close'),
          inputs = document.querySelectorAll('input'),
          textarea = document.querySelector('textarea'),

          classesSummer = document.querySelector('.classes.summer'),

          messagewrapper = document.querySelector('.message__wrapper'),
          message = document.querySelector('.message');
          

    function modalShow() {
        modalBtn.addEventListener('click', (e) => {
            e.preventDefault();

            document.body.classList.add('no-scroll');
            modal.style.display="flex";

            header.classList.add('modal');

            setTimeout(function() {
                modalInner.classList.add('show');
            }, 300);
        });
    };
    modalShow();

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
        textarea.value = "";

    };
    clearInputs();

    function modalClose() {

        modalInner.classList.remove('show');

        document.body.classList.remove('no-scroll');

        setTimeout(function() {
            modal.style.display="none";

        }, 600);

        setTimeout(function() {
            header.classList.remove('modal');

        }, 4000);
        clearInputs();
    };

    function fastClose() {

        modalInner.classList.remove('show');

        document.body.classList.remove('no-scroll');

        setTimeout(function() {
            modal.style.display="none";

        }, 600);
        setTimeout(function() {
            header.classList.remove('modal');

        }, 600);
        clearInputs();
    };

    close.addEventListener('click', (e) => {
            e.preventDefault();
            fastClose();
    });

    modal.addEventListener('click', (e) => {
            e.preventDefault();
            fastClose();
    });

    modalInner.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // ----------------------------------   F o r m s  ---------------------------------- //

    const forms = (state) => {

        const form = document.querySelectorAll('form');

        const postData = async (url, data) => {

            let res = await fetch(url, {
                method: "POST",
                body: data
            });

            return await res.text();
        };

        form.forEach(item => {

            item.addEventListener('submit', (e) => {

                e.preventDefault();

                const formData = new FormData(item);

                postData('./server.php', formData)

                .then(res => {
                    console.log(res);

                    messagewrapper.style.display="block";

                    setTimeout(() => {
                        message.classList.add('show');
                    }, 300);

                    setTimeout(() => {
                        message.classList.remove('show');
                    }, 3000);

                    setTimeout(() => {

                    messagewrapper.style.display="none";
                    }, 4000);

                })

                .catch(() => {
                    console.log("Error");
                })

                .finally(() => {
                    modalClose();
                    clearInputs();
                });                    
            });
        });
    };

    let modalState = {};

    forms(modalState);
    
    // ----------------------------------   Show More ---------------------------------- //

    classesBtn.addEventListener('click', (e) => {
        e.preventDefault();

        classesBtn.classList.add("hide");

        setInterval(() => {
            classesBtn.style.display="none";
            }, 2000);

        classesMore.forEach(item => {
            item.style.display="flex";
            setInterval(() => {
            item.classList.add("animate");
            }, 50);
        });
    });

    summerBtn.addEventListener('click', (e) => {
        e.preventDefault();

        summerBtn.classList.add("hide");

        setInterval(() => {
            summerBtn.style.display="none";
            }, 2000);
            
            classesSummer.classList.add("hide");

        summerMore.forEach(item => {
            item.style.display="flex";
            setInterval(() => {
            item.classList.add("animate");
            }, 50);
        });
    });
});