function clickCart(){
    let cart = document.querySelector('.cart');
    cart.addEventListener('click', function(){
        let accessToken = localStorage.getItem('accessToken');
        if(accessToken === null){
            alert("Bạn cần đăng nhập để xem giỏ hàng!");
        }
        else{
           window.location.href = 'cart_detail.html';
        }
    })
}

clickCart();