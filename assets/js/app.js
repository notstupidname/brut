// ************************************************
// Shopping Cart API
// ************************************************

var cartApi = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    let cart = [];

  // Constructor
    class Item {
        constructor(id, title, price, url, count) {
            this.id = id;
            this.title = title;
            this.price = price;
            this.url = url;
            this.count = count;
        }
    }

    // Save cart
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }

    if (localStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add new item to cart
    obj.addNewItemToCart = function(id, title, price, url, count) {
        for (const item of cart) {
            if (item.id === id) {
                item.count += count;
                saveCart();
            return item.count;
            }
        }
        const item = new Item(id, title, price, url, count);
        cart.push(item);
        saveCart();
        return item.count;
    }

    // Add existing item to cart
    obj.addItemToCart = function(id) {
        for (const item of cart) {
            if (item.id == id) {
                item.count ++;
                saveCart();
                return item.count;
            }
        }
    }
    // Set count for item by id
    obj.setCountForItem = function(id, count) {
        for (const item of cart) {
            if (item.id === id) {
                item.count = count;
                saveCart();
                return item.count;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(id) {
        for (const item of cart) {
            if (item.id === id) {
                item.count --;
                if (item.count === 0) {
                    cart.splice(cart.indexOf(item), 1);
                }
            saveCart();
            return item.count;
            }
        }
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(id) {
        for (const item of cart) {
            if (item.id === id) {
                cart.splice(cart.indexOf(item), 1);
                saveCart();
                break;
            }
        }
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        let totalCount = 0;
        for (const item of cart) {
            totalCount += item.count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        let totalCart = 0;
        for (const item of cart) {
            totalCart += item.price * item.count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        return cart;
    }

    obj.cartToQuerry = function() {
        let param = "";
        for (item of cart) {
            param += "&product=" + encodeURIComponent(item.title) + "&price=" + encodeURIComponent(item.price) + "&count=" + encodeURIComponent(item.count) + "&url=" + encodeURIComponent(item.url);
        }
        return param;
    }

    return obj;
})();

(function() {
    "use strict"

    const body = document.querySelector('body');
    const nav = document.querySelector('#nav');
    const navToggle = document.querySelector('a[href="#nav"]');
    const navClose = document.querySelector('#nav .close');
    const cart = document.querySelector('#cart');
	const cartToggles= document.querySelectorAll('a[href="#cart"]');
    const cartClose = document.querySelector('#cart .close');
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

    let hideCart = function() {
        cart.classList.remove('visible');
        body.classList.remove('menu-visible');
    }

    let toggleCart = function() {
        cart.classList.toggle('visible');
        body.classList.toggle('menu-visible');
    }
    
    //Hide nav and cart on body click
    body.addEventListener('click', function(e){
        if (body.classList.contains('menu-visible')) {
            e.preventDefault();
            e.stopPropagation();
            hideNav();
            hideCart();
        }
    }, false);

    nav.addEventListener('click', function(e){
        e.stopPropagation();
    }, false);

    cart.addEventListener('click', function(e){
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
    
    for (const cartToggle of cartToggles) {
        cartToggle.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            toggleCart();
        }, false);
    }

    cartClose.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        hideCart();
    }, false);

    let transition = function(e) {
        let href = this.getAttribute('href');
        let target = this.getAttribute('target');
        if (!href || href.indexOf('#') != -1 || href.indexOf('tel') != -1 || href.indexOf('wa.me') != -1 || href.indexOf('mailto') != -1 || target == '_blank')
            return;
        e.preventDefault();
        e.stopPropagation();
        hideNav();
        hideCart();
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

    // Cart related UI
    ///////
    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function createCartItem(item){
        let cart_item = document.createElement('div');
        cart_item.id = item.id;
        cart_item.classList.add('cart-item');
        let a_img = document.createElement('a');
        a_img.href = item.url;
        cart_item.appendChild(a_img);
        let img = document.createElement('img');
        img.classList.add('image');
        img.src = "/images" + item.url + "-01_400w.jpg";
        // img.src = "/images/catalog/porolon/porolon-el-4060.jpg";
        a_img.appendChild(img);
        let cart_text = document.createElement('div');
        cart_text.classList.add('cart-text');
        cart_item.appendChild(cart_text);
        let el = document.createElement('a');
        el.href = item.url;
        el.innerText = item.title;
        cart_text.appendChild(el);
        el = document.createElement('h3');
        el.innerText = numberWithSpaces(item.price) + " ₽";
        cart_text.appendChild(el);
        let some_div = document.createElement('div');
        cart_text.appendChild(some_div);
        el = document.createElement('a');
        el.classList.add('minus-item', 'button');
        el.setAttribute('data', item.id);
        el.innerText = "-";
        some_div.appendChild(el);
        el = document.createElement('input');
        el.classList.add('count');
        el.setAttribute('data', item.id);
        el.setAttribute('type', 'number')
        el.setAttribute('min', 1)
        el.value = item.count;
        some_div.appendChild(el);
        el = document.createElement('a');
        el.classList.add('plus-item', 'button');
        el.setAttribute('data', item.id);
        el.innerText = "+";
        some_div.appendChild(el);
        return cart_item;
    }

    // Update all cart UI
    function displayCart(){
        const cart = cartApi.listCart();
        const cartInnerEl = document.querySelector('.show-cart');
        cartInnerEl.innerHTML = "";
        let temp_cart = document.createDocumentFragment();
        for (const item of cart){
            let cart_item = createCartItem(item);
            temp_cart.appendChild(cart_item);
        }
        cartInnerEl.appendChild(temp_cart);
    };
    displayCart();

    function updateCounts(){
        const totalCart = cartApi.totalCart();
        const totalCount = cartApi.totalCount();
        
        const cartTotalCounts = document.querySelectorAll('.total-count');
        for (const cartTotalCount of cartTotalCounts) {
            cartTotalCount.innerText = totalCount;
        }

        const cartTotal = document.querySelector('.total-cart');
        cartTotal.innerText = numberWithSpaces(totalCart);

        const orderButton = document.querySelector('.order');
        const floatCart = document.querySelector('.cart.float');
        if (totalCount > 0 && orderButton.classList.contains('disabled')){
            orderButton.classList.remove('disabled');
        } else if (totalCount == 0 && !orderButton.classList.contains('disabled')){
            orderButton.classList.add('disabled');
        }
        if (totalCount > 0 && floatCart.classList.contains('disabled')){
            floatCart.classList.remove('disabled');
        } else if (totalCount == 0 && !floatCart.classList.contains('disabled')){
            floatCart.classList.add('disabled');
        }
        const cartString = document.querySelector('.cart-string');
        cartString.setAttribute('value', totalCart)
    };
    updateCounts();

    const orderButton = document.querySelector('.order');
    const returnButtonAll = document.querySelectorAll('.return-to-cart');
    const cart_cart = document.querySelector('.cart-cart');
    const form_wrapper = document.querySelector('.form-wrapper');

    orderButton.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        if (!this.classList.contains('disabled')){
            cart_cart.classList.add('hide');
            form_wrapper.classList.remove('hide');
            form_wrapper.classList.add('fade-in');
        }
    })

    for (const returnButton of returnButtonAll) {
        returnButton.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            form_wrapper.classList.add('hide');
            cart_cart.classList.remove('hide');
            cart_cart.classList.add('fade-in');
            const parent = this.parentNode;
            if (parent.classList.contains('form-success') || parent.classList.contains('form-error')) {
                const ajax_form = document.querySelector('.ajax-form');
                parent.classList.add('hide');
                ajax_form.classList.remove('hide');
                ajax_form.classList.add('fade-in');
            }
        })
    }

    // Add to cart on Product page
    const select = document.querySelector('#param_select');
    const products_listEL = document.getElementById('products_list');
    if (products_listEL){
        var products_list = JSON.parse(products_listEL.textContent);
    }
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            let selected_product;
            if (select) {
                for (const product of products_list) {
                    if (product.id == select.value) {
                        selected_product = product;
                        break;
                    }
                }
            } else {
                selected_product = products_list[0];
            }
            if (cartApi.totalCount() == 0){
                toggleCart();
            }
            cartApi.addNewItemToCart(selected_product.id, selected_product.title, selected_product.price, selected_product.url, 1);
            displayCart();
            updateCounts();
            let button = this;
            button.innerHTML = 'Добавлено';
            window.setTimeout(function() {
                button.innerHTML = 'В корзину';
            }, 2500, button);
        }, false);
    }

    // Select behavior on Product page
    if (select) {
        select.addEventListener('change', function(e){
            // console.log(select.value);
            for (const product of products_list) {
                if (product.id == select.value) {
                    const price_span = document.getElementById('price');
                    price_span.textContent = product.price;
                    break;
                }
            }
        }, false);
    }

    // Select on Category page
    const all_selects = document.querySelectorAll('.price-select');
    if (all_selects){
        for (const current_select of all_selects) {
            current_select.addEventListener('change', function(e){
                const this_price = this.parentNode.parentNode.querySelector('span');
                this_price.textContent = current_select.value;
            }, false);
        }
    }

    let cartPlusMinusButton = function(e){
        e.preventDefault();
        e.stopPropagation();
        const item_id = this.getAttribute('data');
        let count = this.parentNode.querySelector('input');
        if (this.classList.contains('plus-item')){
            count.value = cartApi.addItemToCart(item_id);
        } else {
            const item_count = cartApi.removeItemFromCart(item_id);
            if (item_count > 0){
                count.value = item_count;
            } else {
                // Remove .cart-item from cart completly
                const cart_item = this.parentNode.parentNode.parentNode;
                cart_item.parentNode.removeChild(cart_item);
            }
        }
        updateCounts();
    }

    // Plus and Minus buttons behavior in Cart
    cart.addEventListener('click', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('.minus-item, .plus-item')) {
                cartPlusMinusButton.call(target, e);
                break;
            }
        }
    }, false);

    let cartSetCount = function(e){
        e.preventDefault();
        e.stopPropagation();
        const item_id = this.getAttribute('data');
        if (parseInt(this.value) > 0){
            cartApi.setCountForItem(item_id, parseInt(this.value));
        } else {
            const cart_item = this.parentNode.parentNode.parentNode;
            cart_item.parentNode.removeChild(cart_item);
            cartApi.removeItemFromCartAll(item_id);
        }
        updateCounts();
    }

    cart.addEventListener('change', function(e) {
        for (let target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('.count')) {
                cartSetCount.call(target, e);
                break;
            }
        }
    }, false);

    // Form submitting

    const form = document.querySelector('.ajax-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const url = "https://notstupidapp.ew.r.appspot.com/shopapi/v2/porolonych"

        const form_loading = this.parentNode.querySelector('.form-loading');
        const form_success = this.parentNode.querySelector('.form-success');
        const form_error = this.parentNode.querySelector('.form-error');
        const payload = {
            name: this.elements["name"].value,
            email: this.elements["email"].value,
            phone: this.elements["phone"].value,
            shipping: this.elements["shipping"].value,
            message: this.elements["message"].value,
            cart_sum: this.elements["cartstring"].value,
            cart: cartApi.listCart()
        }
        this.classList.add('hide');
        form_loading.classList.remove('hide');
        form_loading.classList.add('fade-in');

        let request = new XMLHttpRequest();
        request.open('POST', url);

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                try {
                    yaCounter15918124.reachGoal('order');
                } catch (error) {
                    console.error(error);
                }
                console.log('Success');
                console.log(this.responseText);
                form_loading.classList.add('hide');
                form_success.classList.remove('hide');
                form_success.classList.add('fade-in');
                cartApi.clearCart();
                displayCart();
                updateCounts();
            } else {
                // We reached our target server, but it returned an error
                console.log('Server returned error');
                form_loading.classList.add('hide');
                form_error.classList.remove('hide');
                form_error.classList.add('fade-in');
            }
        };
        request.onerror = function() {
            console.log('Connection error');
            form_loading.classList.add('hide');
            form_error.classList.remove('hide');
            form_error.classList.add('fade-in');
        };
        request.send(JSON.stringify(payload));

    }, false);

})();