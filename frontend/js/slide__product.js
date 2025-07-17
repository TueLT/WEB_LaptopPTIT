import addProductToCart from './addProductToCart.js';
import selectProduct from './selectProduct.js';

async function fetchCatalog(url) {
    function lamtron(num) {
        return Math.round(num / 100000) * 100000;
    }

    function daucham(num) {
        let tmp = "";
        let mark = 0;
        for (let i = num.length - 1; i >= 0; i--) {
            mark += 1;
            tmp = num[i] + tmp;
            if (mark == 3 && i != 0) {
                tmp = "." + tmp;
                mark = 0;
            }
        }
        return tmp;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();

        var slide;

        if(url === 'http://localhost:8080/collections/laptops-category/Hoc-tap-van-phong'){
            slide = document.querySelector('.hoctapvanphongcoban');
        }

        if(url === 'http://localhost:8080/collections/laptops-category/Laptop-Gaming'){
            slide = document.querySelector('.laptopgaming');
        }

        if(url ==='http://localhost:8080/collections/laptops-category/Do-hoa-hieu-nang-cao'){
            slide = document.querySelector('.laptopdohoa');
        }

        if(url === 'http://localhost:8080/collections/laptops-category/Mong-nhe-cao-cap'){
            slide = document.querySelector('.laptopmongnhe');
        }

        let productSlide = slide.querySelector('.all-laptop');
        data.forEach(item => {
            const idProduct = '<div class="id__product">' + item.id + '</div>';
            const imgProduct = '<a href="product.html" class="product__img">' + '<img src="' + item.images[0].filePath + '" alt="">' + '</a>';
            const nameProduct = '<a href="product.html" class="product__name">' + item.name + ' ' + '(' + item.specification.cpu + ', ' + item.specification.ram + ', ' + item.specification.rom + ', ' + item.specification.graphicsCard + ', ' + item.specification.screen + ')' + '</a>';
            let basePrice = daucham(item.price.toString());
            let price = lamtron(item.price * (100 - item.sale) / 100).toString();
            price = daucham(price);
            const productPrice = '<div class="product__price">' + price + ' đ' + '</div>'; 
            const productBasePrice = '<div class="product__base__price">' + '<h1>' + basePrice + ' đ' + '</h1>' + '<h2> (Tiết kiệm ' + item.sale + '%)</h2>' + '</div>';
            const cart = '<div class="product__cart"> <i class="fa-solid fa-cart-shopping"></i> </div>';
            const laptopContainer = '<div class="product__container">' + idProduct + imgProduct + nameProduct + productPrice + productBasePrice + cart + '</div>';
            productSlide.innerHTML += laptopContainer;
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function seeAll(){
    seeAll = document.querySelectorAll('.see-all');
    for(let i = 0; i < 4; i++){
        seeAll[i].addEventListener('click', function(){
            localStorage.setItem('action', 'seeAll' + i);
            window.location.href = 'laptoptheomuc.html';
        })
    }
}

async function fetchAllCatalogs() {
    const urls = [
        'http://localhost:8080/collections/laptops-category/Hoc-tap-van-phong',
        'http://localhost:8080/collections/laptops-category/Laptop-Gaming',
        'http://localhost:8080/collections/laptops-category/Do-hoa-hieu-nang-cao',
        'http://localhost:8080/collections/laptops-category/Mong-nhe-cao-cap'
    ];

    for (const url of urls) {
        await fetchCatalog(url);
    }
    addProductToCart(); 
    selectProduct();
}

fetchAllCatalogs();
seeAll();

