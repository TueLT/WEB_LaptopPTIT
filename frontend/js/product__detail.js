import checkAccessTokenIsvalid from "./accessToken.js";


async function buildProductDetail(response){
    function lamtron(num) {
        return Math.round(num / 100000) * 100000;
    }
    
    function daucham(num){
        let tmp = "";
        let mark = 0;
        for(let i = num.length - 1; i >= 0; i--){
            mark += 1;
            tmp = num[i] + tmp;
            if(mark == 3 && i != 0){
                tmp = "." + tmp;
                mark = 0
            }
        }
        return tmp;
    }

    let productName = document.querySelector('.product__name');
    let productImgMain = document.querySelector('.product__img--main');
    let productImgList = document.querySelector('.product__img--list');
    let productSpecification = document.querySelector('.product__specifications');
    let ulProductSpecification = productSpecification.getElementsByTagName('ul')[0];
    let productPrice = document.querySelector('.product__price');
    let productBasePrice = document.querySelector('.product__base__price');
    let productSale = document.querySelector('.product__sale');

    productName.innerHTML += response.name;

    for(let i = 0; i < response.images.length; i++){
        productImgMain.innerHTML += '<img src= "' + response.images[i].filePath + '"alt=""></img>';
        productImgList.innerHTML += '<img src= "' + response.images[i].filePath + '"alt=""></img>';
    }

    ulProductSpecification.innerHTML += '<li>CPU : '  + response.specification.cpu + '</li>';
    ulProductSpecification.innerHTML += '<li>RAM : '  + response.specification.ram + '</li>';
    ulProductSpecification.innerHTML += '<li>ROM : '  + response.specification.rom + '</li>';
    ulProductSpecification.innerHTML += '<li>VGA : '  + response.specification.graphicsCard + '</li>';
    ulProductSpecification.innerHTML += '<li>Màn hình : ' +  response.specification.screen+ '</li>';
    ulProductSpecification.innerHTML += '<li>Pin :' + response.specification.battery + '</li>';
    ulProductSpecification.innerHTML += '<li>Trọng lượng : ' + response.specification.weight + '</li>';
    ulProductSpecification.innerHTML += '<li>Webcam : ' +  response.specification.webcam + '</li>';
    ulProductSpecification.innerHTML += '<li>Hệ điều hành: ' +  response.specification.operatingSystem + '</li>';
    if(response.specification.muxSwitch == true){
        ulProductSpecification.innerHTML += '<li>Mux switch: Có</li>'; 
    }
    else{
        ulProductSpecification.innerHTML += '<li>Mux switch: Không</li>';
    }
    ulProductSpecification.innerHTML += '<li>Cổng kết nối: <br>' + '<div class = "tab">' + response.specification.connectionPort.replace(/\n/g, "<br>") + '</div>' + '</li>';

    let basePrice = response.price.toString();
    basePrice = daucham(basePrice);

    productSale.innerHTML += 'Tiết kiệm ' + response.sale + '%';
    productBasePrice.innerHTML += basePrice + ' đ'; 
    let price = response.price * (100 - response.sale) / 100;
    price = lamtron(price);
    price = price.toString();
    price = daucham(price);
    productPrice.innerHTML += price + ' đ';   

    const listImg = document.querySelectorAll('.product__img--list img');
    const mainImg = document.querySelectorAll('.product__img--main img');
    let indexImg = 0;
    let positionXImg = 0
    listImg[0].style.borderWidth = "3.5px";
    mainImg.forEach(function(element){
        element.style.transition = "0.8s";
    })


    for(let i = 0; i < listImg.length; i++){
        listImg[i].addEventListener('click', function(){
            for(let j = 0; j < listImg.length; j++){
                if(j != i){
                    listImg[j].style.borderWidth = "2px";
                }
                if(j == i){
                    listImg[j].style.borderWidth = "3.5px";
                }
            }
            if(i > indexImg){
                positionXImg -= 370 * (i - indexImg);
                indexImg = i;
                mainImg.forEach(function(element){
                    element.style.transform = `translateX(${positionXImg}px)`;
                })
            }
            if(i < indexImg){
                positionXImg += 370 * (indexImg - i);
                indexImg = i;
                mainImg.forEach(function(element){
                    element.style.transform = `translateX(${positionXImg}px)`;
                })
            }
        })
    }

    var productComment = document.querySelector('.product__comment');
    var commentContainer = document.querySelector('.comment__container');
    var commentList = response.comments;

    await checkAccessTokenIsvalid();
    let currentUser;
    let accessToken = localStorage.getItem("accessToken");
    if(accessToken === null){
        currentUser = {
        }
    }
    else{
        currentUser = await fetch('http://localhost:8080/currentUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }       
        });
        currentUser = await currentUser.json();
    }
    commentList.forEach(function(element){
        var id = '<div class="id">' + element.id + '</div>';
        var name = '<div class="comment__user__name">' + element.userName + '</div>';
        var partition = '<div class="infor_and_time__partition"> | </div>';
        if(element.updateAt === null){
            var time = '<div class="comment__time">' + element.postAt + '</div>';
            var status = ""; 
        }
        else{
            var time = '<div class="comment__time">' + element.updateAt + '</div>';
            var status = '<div class="status">Đã chỉnh sửa</div>';
        }

        var inforAndTime = '<div class="comment__infor_and_time">' + name + partition + status +  time + '</div>';
        console.log(currentUser.id);
        console.log(element.userId);
        if(currentUser.id == element.userId){
            var input = '<div class="input"><textarea class="inputText"></textarea></div>';
            var editComment = '<div class="editComment">Chỉnh sửa</div>';
            var button = '<div class="button">' + 'Gửi' + '</div>';
            var deleteCommet = '<div class="deleteComment">Xóa</div>';

            var action = '<div class="action">' + editComment + deleteCommet + '</div>';
        }
        else{
            var action = '';
            var button = '';
            var input = '';
        }

        var content = '<div class="comment__content">' + element.content + '</div>';
        commentContainer = '<div class="comment__container">' + id + inforAndTime + content + action + input + button + '</div>';
        productComment.innerHTML += commentContainer;
    })
}


async function getDaTa(){
    let id = localStorage.getItem('id__product'); 
    let response = await fetch(`http://localhost:8080/laptop/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    response = await response.json();
    await buildProductDetail(response);
}

async function postComment() {
    let commentInput = document.querySelector('.comment__input');
    let button = commentInput.querySelector('.button__submit_comment');
    button.addEventListener('click', async function(){
        let accessToken = localStorage.getItem('accessToken');
        if(accessToken === null){
            alert("Bạn cần phải đăng nhập để bình luận!")
        }
        else{
            await checkAccessTokenIsvalid();
            accessToken = localStorage.getItem('accessToken');
            let comment = commentInput.querySelector('.inputContent').value;
            let data = {
                content: comment
            };
            try{
                let idProduct = localStorage.getItem('id__product');
                let response = await fetch(`http://localhost:8080/comment/post?laptopId=${idProduct}`, {
                    method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },
                        body: JSON.stringify(data)
                });
                response = await response.text();
                if(response == "Comment posted successfully"){
                    location.reload();
                }
            }
            catch(error){
                console.log(error);
                alert("Đã có lỗi xảy ra!");
            }
        }
    });
}

async function addProductToCart() {
    let cart = document.querySelector('.giohang');
    let idProduct = localStorage.getItem('id__product');
    let accessToken = localStorage.getItem('accessToken');
    cart.addEventListener('click', async function(){
        if(accessToken === null){
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        }
        else{
            try {
                const data = {
                "quantity" : 1,
                "laptop":{
                    "id": idProduct
                }
                };
                await checkAccessTokenIsvalid();
                accessToken = localStorage.getItem("accessToken");
                const response = await fetch('http://localhost:8080/cart-detail/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },  
                    body: JSON.stringify(data)
                });

                const message = await response.text();
                console.log(message);
                if (response.status === 200) {
                    alert("Thêm thành công");
                } else if(response.status === 400 && message === "Laptop is already in cart"){
                    alert("Sản phẩm đã tồn tại trong giỏ hàng");
                }else{
                    alert("Thất bại");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    })
}

async function buyNow() {
    let button = document.querySelector('.mua__ngay');
    let accessToken = localStorage.getItem('accessToken');
    let idProduct = localStorage.getItem('id__product');
    button.addEventListener('click', async function(){
        if(accessToken === null){
            alert("Bạn cần đăng nhập để mua sản phẩm này!");
        }
        else{
            try {
                const data = {
                "quantity" : 1,
                "laptop":{
                    "id": idProduct
                }
                };
                await checkAccessTokenIsvalid();
                accessToken = localStorage.getItem("accessToken");
                const response = await fetch('http://localhost:8080/cart-detail/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },  
                    body: JSON.stringify(data)
                });

                const message = await response.text();
                console.log(message);
                if (response.status === 200) {
                    window.location.href = 'cart_detail.html';
                } else if(response.status === 400 && message === "Laptop is already in cart"){
                    window.location.href = 'cart_detail.html';
                }else{
                    alert("Thất bại");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    })
}

async function editComment(){
    let accessToken = localStorage.getItem('accessToken');
    var commentContainer = document.querySelectorAll('.comment__container');
    commentContainer.forEach(function(element){
        let editComment = element.querySelector('.editComment');
        if(editComment !== null){
            editComment.addEventListener('click', function(){
                element.querySelector('.input').style.display = "flex";
                element.querySelector('.button').style.display = "flex";
            });
            let button = element.querySelector('.button');
            button.addEventListener('click', async function() {
                let idComment = parseInt(element.querySelector('.id').textContent, 10);
                let text = element.querySelector('.inputText').value;
                let data = {
                    id: idComment,
                    content: text
                }
                await checkAccessTokenIsvalid();
                accessToken = localStorage.getItem('accessToken');
                let response = await fetch('http://localhost:8080/comment/modify', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },  
                    body: JSON.stringify(data)
                });
                response = await response.text();
                if(response == "Comment updated successfully"){
                    location.reload();
                }
            })
        }
    })
}

async function deleteComment(){
    let accessToken = localStorage.getItem('accessToken');
    var commentContainer = document.querySelectorAll('.comment__container');
    commentContainer.forEach(function(element){
        let deleteComment = element.querySelector('.deleteComment');
        if(deleteComment !== null){
            deleteComment.addEventListener('click', async function() {
                let idComment = parseInt(element.querySelector('.id').textContent, 10);
                await checkAccessTokenIsvalid();
                accessToken = localStorage.getItem('accessToken');
                let response = await fetch(`http://localhost:8080/comment/delete/${idComment}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },  
                });
                response = await response.text();
                if(response == "Comment deleted successfully"){
                    location.reload();
                }
            })
        }
    })
}

async function productDetailMain() {
    await getDaTa();        
    await postComment();
    await editComment();
    await deleteComment();
    await addProductToCart();
    await buyNow();
}

productDetailMain();

