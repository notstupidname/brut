(function() {
    "use strict"

    const body = document.querySelector('body');
    const nav = document.querySelector('#nav');
    const navToggle = document.querySelector('a[href="#nav"]');
    const navClose = document.querySelector('#nav .close');
    const backToTop = document.querySelector('#backtotop');

    window.addEventListener('load', function() {
        body.classList.remove('is-loading');
        body.classList.remove('trans');
    });

    let hideNav = function() {
        nav.classList.remove('visible');
        body.classList.remove('menu-visible');
    }

    let toggleNav = function() {
        nav.classList.toggle('visible');
        body.classList.toggle('menu-visible');
    }

    //Hide nav and cart on body click
    body.addEventListener('click', function(e){
        if (body.classList.contains('menu-visible')) {
            e.preventDefault();
            e.stopPropagation();
            hideNav();
        }
    }, false);

    nav.addEventListener('click', function(e){
        e.stopPropagation();
    }, false);

    navToggle.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        toggleNav();
    }, false);
    navClose.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        hideNav();
    }, false);
    
    let transition = function(e) {
        let href = this.getAttribute('href');
        let target = this.getAttribute('target');
        if (!href || href.indexOf('#') != -1 || href.indexOf('tel') != -1 || href.indexOf('wa.me') != -1 || href.indexOf('mailto') != -1 || target == '_blank')
            return;
        e.preventDefault();
        e.stopPropagation();
        hideNav();
        body.classList.add('trans');
        window.setTimeout(function() {
            window.location.href = href;
            console.log('250');
        }, 250);
    }
    
    body.addEventListener('click', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('a')) {
                transition.call(target, e);
                break;
            }
        }
    }, false);

    nav.addEventListener('click', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('a')) {
                transition.call(target, e);
                break;
            }
        }
    }, false);

    // Remove transition if page loaded from bfcache
    window.addEventListener('pageshow', function(event) {
        if (event.persisted === true) {
            body.classList.remove('trans');
        }
    }, false);

    //Scroll to top
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            body.scrollIntoView(true, {behavior: "smooth"});
        }, false);
    }


    const form_wrapper = document.querySelector('.form-wrapper');

    // Form submitting

    // const form = document.querySelector('.ajax-form');

    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     const url = "https://notstupidapp.ew.r.appspot.com/shopapi/v2/porolonych"

    //     const form_loading = this.parentNode.querySelector('.form-loading');
    //     const form_success = this.parentNode.querySelector('.form-success');
    //     const form_error = this.parentNode.querySelector('.form-error');
    //     const payload = {
    //         name: this.elements["name"].value,
    //         email: this.elements["email"].value,
    //         phone: this.elements["phone"].value,
    //         shipping: this.elements["shipping"].value,
    //         message: this.elements["message"].value,
    //         cart_sum: this.elements["cartstring"].value,
    //         cart: cartApi.listCart()
    //     }
    //     this.classList.add('hide');
    //     form_loading.classList.remove('hide');
    //     form_loading.classList.add('fade-in');

    //     let request = new XMLHttpRequest();
    //     request.open('POST', url);

    //     request.onload = function() {
    //         if (this.status >= 200 && this.status < 400) {
    //             try {
    //                 yaCounter15918124.reachGoal('order');
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //             console.log('Success');
    //             console.log(this.responseText);
    //             form_loading.classList.add('hide');
    //             form_success.classList.remove('hide');
    //             form_success.classList.add('fade-in');
    //             cartApi.clearCart();
    //             displayCart();
    //             updateCounts();
    //         } else {
    //             // We reached our target server, but it returned an error
    //             console.log('Server returned error');
    //             form_loading.classList.add('hide');
    //             form_error.classList.remove('hide');
    //             form_error.classList.add('fade-in');
    //         }
    //     };
    //     request.onerror = function() {
    //         console.log('Connection error');
    //         form_loading.classList.add('hide');
    //         form_error.classList.remove('hide');
    //         form_error.classList.add('fade-in');
    //     };
    //     request.send(JSON.stringify(payload));

    // }, false);

})();