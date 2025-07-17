import checkAccessTokenIsvalid from './accessToken.js';

async function fetchAddProductToCart(idProduct){
    try {
        const data = {
           "quantity" : 1,
           "laptop":{
                "id": idProduct
           }
        };
        checkAccessTokenIsvalid();
        var accessToken = localStorage.getItem("accessToken");
        const response = await fetch('http://localhost:8080/cart-detail/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },  
            body: JSON.stringify(data)
        });

        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function addProductToCart(){
    let productContainer = document.querySelectorAll('.product__container');
    productContainer.forEach(function(element){
        let buttonAddToCart = element.querySelector('.product__cart');
        let idProduct = element.querySelector('.id__product').textContent;
        
        buttonAddToCart.addEventListener('click', async function(){
            try {
                await checkAccessTokenIsvalid();
                const response = await fetchAddProductToCart(idProduct);
                const message = await response.text();
                console.log(message);
                if (response.status === 200) {
                    alert("Thêm thành công");
                } else if(response.status === 400 && message === "Laptop is already in cart"){
                    alert("Sản phẩm đã tồn tại trong giỏ hàng");
                }else{
                    alert("Bạn cần đăng nhập để thêm vào giỏ hàng");
                }
            } catch (error) {
                console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
                alert("Có lỗi xảy ra");
            }
        });
    });
}

export default addProductToCart;
