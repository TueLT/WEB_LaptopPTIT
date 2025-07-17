function selectProduct(){
    var AllLaptop = document.querySelectorAll('.all-laptop');
    AllLaptop.forEach(function(allLaptop){
        var childrenAllLapTop = Array.from(allLaptop.children);
        
        childrenAllLapTop.forEach(function(element){
            var productImg = element.getElementsByTagName('img')[0];
            var productName = element.querySelector('.product__name');
            var productId = element.querySelector(".id__product");

            productImg.addEventListener('click', function(){
                localStorage.setItem('id__product', productId.textContent);
            });
            productName.addEventListener('click', function(){
                localStorage.setItem('id__product', productId.textContent);
            });
        })
    })
}

export default selectProduct;
