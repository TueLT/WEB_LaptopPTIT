import checkAccessTokenIsvalid  from './accessToken.js';
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

function boDauCham(num){
    var res = "";
    for(let i = 0; i < num.length; i++){
        if(num[i] != "."){
            res += num[i];
        }
        if(num[i] == " " ){
            break;
        }
    }
    return res;
}

function selecProduct(){
    let tableRow = document.querySelectorAll('.table-row');
    tableRow.forEach(function(element){
        let img = element.children[2];
        img.addEventListener('click', function(){
            localStorage.setItem('id__product', element.querySelector('.id__product').textContent);
        })
    })
}
// getDataCartDetail
async function getDataCartDetail() {
    checkAccessTokenIsvalid();
    let accessToken = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:8080/cart-detail', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return await response.json();
}

// buildCartDetail
async function buildCartDeTail(){
    const responseData = await getDataCartDetail();
    let sum = 0;
    let cartTable = document.querySelector('.cart-table');
    console.log(responseData);
    responseData.forEach(function(element){
        const idTableRow = '<td class = "id__table__row">' + element.id + '</td>'; 
        const idLapTop = '<td class = "id__product">' + element.laptop.id + '</td>';
        const imgProduct = '<img class = "laptop-img" src= "' + element.laptop.images[0].filePath + '"alt=""></img>';
        const nameProduct = '<a href="product.html" class="laptop-name">' + element.laptop.name + ' ' + '(' + element.laptop.specification.cpu + ', ' + element.laptop.specification.ram + ', ' + element.laptop.specification.rom + ', ' + element.laptop.specification.graphicsCard + ', ' + element.laptop.specification.screen + ')' +'</a>';
        const td1 = '<td>' + imgProduct + nameProduct + '</td>';
        const subButton = '<button class="left-button">-</button>';
        const counter = '<div class="laptop-counter">' + element.quantity + '</div>';
        const addButton = '<button class="right-button">+</button>';
        const adjust = '<div class="adjust">' + subButton + counter + addButton + '</div>';
        const trash = '<button class="trash-button"><img src="image/cart/trash-icon.png" class="trash-image"></button>';
        const adjustAndDelete = '<div class="adjust-delete-button">' + adjust + trash + '</div>';
        let tmp = element.unitPrice.toString();
        sum += element.unitPrice * element.quantity;
        tmp = daucham(tmp) + " VNĐ";
        const unitPrice = '<p class="unit-price">' + tmp + '</p>';
        let tmp2 = element.unitPrice * parseInt(element.quantity);
        tmp2 = daucham(tmp2.toString()) + " VNĐ";
        const totalUnitPrice = '<p class="total-unit-price">' + tmp2 + '</p>';
        const td2 = '<td>' + adjustAndDelete + unitPrice + totalUnitPrice + '</td>';
        const tableRow = '<tr class="table-row">' + idTableRow + idLapTop + td1 + td2 + '</tr>';
        cartTable.innerHTML += tableRow;
    });
    const totalPriceText = '<td class="total-price-text">Tổng giá trị đơn hàng</td>';
    const totalPrice = '<td class="total-price">' + daucham(sum.toString()) + " VNĐ" + '</td>';
    cartTable.innerHTML += '<tr>' + totalPriceText + totalPrice + '</td>';
} 

// adjustNumberProduct
 function adjustNumberProduct(){
    let totalPrice = document.querySelector('.total-price');
    let tableRow = document.querySelectorAll('.table-row');
    tableRow.forEach(function(element){
        let buttonRight = element.querySelector('.right-button');
        let numberProduct = element.querySelector('.laptop-counter');
        let buttonLeft = element.querySelector('.left-button');
        let unitPrice = element.querySelector('.unit-price');
        let totalUnitPrice = element.querySelector('.total-unit-price');

        // Chỉnh màu cho nút giảm khi sản phẩm bằng 1 và khác 1
        if(numberProduct.textContent == "1"){
            buttonLeft.style.color = '#D4D1D1';
        }
        if(numberProduct.textContent != "1"){
            buttonLeft.style.color = 'black';
        }

        // Bấm nút giảm
        buttonLeft.addEventListener('click', async function(){
            if(numberProduct.textContent != "1"){
                let currentNumber = parseInt(numberProduct.textContent, 10);
                let newNumber = currentNumber - 1;
                newNumber = newNumber.toString();
                numberProduct.innerHTML = newNumber;
                // Chỉnh giá
                let unitPriceNumber = unitPrice.textContent; // gia 1 product
                unitPriceNumber = boDauCham(unitPriceNumber);
                unitPriceNumber = parseInt(unitPriceNumber, 10); // chuyen gia 1 product ve int
                let totalUnitPriceNumber = unitPriceNumber * parseInt(newNumber, 10); // tinh tong gia moi
                totalUnitPriceNumber = totalUnitPriceNumber.toString(); // chuyen tong gia moi ve string
                totalUnitPriceNumber = daucham(totalUnitPriceNumber) + " VNĐ";
                totalUnitPrice.innerHTML = totalUnitPriceNumber;

                // Chỉnh màu cho nút giảm khi sản phẩm bằng 1
                if(numberProduct.textContent == "1"){
                    buttonLeft.style.color = '#D4D1D1';
                }

                // Chinh tong gia cart
                let totalPriceNumber = totalPrice.textContent;
                totalPriceNumber = boDauCham(totalPriceNumber);
                totalPriceNumber = parseInt(totalPriceNumber, 10);
                totalPriceNumber -= unitPriceNumber;
                totalPriceNumber = totalPriceNumber.toString();
                totalPriceNumber = daucham(totalPriceNumber) + " VNĐ";
                totalPrice.innerHTML = totalPriceNumber;

                // thay doi database
                let id_cart = element.querySelector('.id__table__row').textContent;
                id_cart = parseInt(id_cart, 10);
                newNumber = parseInt(newNumber, 10);
                const data = {
                    id: id_cart,
                    quantity: newNumber
                };
                checkAccessTokenIsvalid();
                let accessToken = localStorage.getItem('accessToken');
                await fetch(`http://localhost:8080/cart-detail/update`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(data) 
                });
            }    
        })

        // Bấm nút tăng
        buttonRight.addEventListener('click', async function(){
            let currentNumber = parseInt(numberProduct.textContent, 10);
            let newNumber = currentNumber + 1;
            newNumber = newNumber.toString();
            numberProduct.innerHTML = newNumber;
            // Chỉnh giá
            let unitPriceNumber = unitPrice.textContent; // gia 1 product
            unitPriceNumber = boDauCham(unitPriceNumber);
            unitPriceNumber = parseInt(unitPriceNumber, 10); // chuyen gia 1 product ve int
            let totalUnitPriceNumber = unitPriceNumber * parseInt(newNumber, 10); // tinh tong gia moi
            totalUnitPriceNumber = totalUnitPriceNumber.toString(); // chuyen tong gia moi ve string
            totalUnitPriceNumber = daucham(totalUnitPriceNumber) + " VNĐ";
            totalUnitPrice.innerHTML = totalUnitPriceNumber;

            // Chỉnh màu cho nút giảm khi sản phẩm khac 1
            if(numberProduct.textContent != "1"){
                buttonLeft.style.color = 'black';
            }

            // Chinh tong gia cart
            let totalPriceNumber = totalPrice.textContent;
            totalPriceNumber = boDauCham(totalPriceNumber); 
            totalPriceNumber = parseInt(totalPriceNumber, 10);
            totalPriceNumber += unitPriceNumber;
            totalPriceNumber = totalPriceNumber.toString();
            totalPriceNumber = daucham(totalPriceNumber) + " VNĐ";
            totalPrice.innerHTML = totalPriceNumber;

            // thay doi database
            let id_cart = element.querySelector('.id__table__row').textContent;
            id_cart = parseInt(id_cart, 10);
            newNumber = parseInt(newNumber, 10);
            const data = {
                id: id_cart,
                quantity: newNumber
            };
            checkAccessTokenIsvalid();
            let accessToken = localStorage.getItem('accessToken');
            await fetch(`http://localhost:8080/cart-detail/update`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data) 
            });
        })
    })
}

// deleteProduct
function deleteProduct(){
    let tableRow = document.querySelectorAll('.table-row');
    let countTableRow = tableRow.length;
    let cartCounter = document.querySelector('.cart-counter');
    cartCounter.innerHTML = "(" + countTableRow + " sản phẩm" + ")";
    for(let i = 0; i < tableRow.length; i++){
        let deleteButton = tableRow[i].querySelector('.trash-button');
        deleteButton.addEventListener('click', async function(){
            // thay doi tong gia cart
            let totalUnitPrice = tableRow[i].querySelector('.total-unit-price');
            let totalUnitPriceNumber = totalUnitPrice.textContent;
            totalUnitPriceNumber = boDauCham(totalUnitPriceNumber);
            totalUnitPriceNumber = parseInt(totalUnitPriceNumber, 10);

            let totalPrice = document.querySelector('.total-price');
            let totalPriceNumber = totalPrice.textContent;
            totalPriceNumber = boDauCham(totalPriceNumber);
            totalPriceNumber = parseInt(totalPriceNumber, 10);

            totalPriceNumber -= totalUnitPriceNumber;
            totalPriceNumber = totalPriceNumber.toString(); // chuyen tong gia moi ve string
            totalPriceNumber = daucham(totalPriceNumber) + " VNĐ";
            totalPrice.innerHTML = totalPriceNumber;

            // xoa the div
            tableRow[i].remove();
            countTableRow -= 1;
            cartCounter.innerHTML = "(" + countTableRow + " sản phẩm" + ")";
            console.log(tableRow.length);

            let id = document.querySelector('.id__table__row').textContent;
            id = parseInt(id, 10);

            checkAccessTokenIsvalid();
            let accessToken = localStorage.getItem('accessToken');
            await fetch(`http://localhost:8080/cart-detail/delete/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (countTableRow == 0){
                cartDetail.style.display = 'none';
                emptyCart.style.display = 'block';
                cartCounter.innerHTML = "(" + countTableRow + " sản phẩm" + ")";
            }
        })
    }
}

// deletaAllProduct
function deleteAllProduct(){
    let tableRow = document.querySelectorAll('.table-row');
    let buttonClear = document.querySelector('.make-empty-button');
    let cartCounter = document.querySelector('.cart-counter');
    let cartDetail = document.querySelector('.my-cart-detail');
    let emptyCart = document.querySelector('.empty-cart');

    buttonClear.addEventListener('click', async function(){
        for(let i = 0; i < tableRow.length; i++){
            tableRow[i].remove();
        }
        cartCounter.innerHTML = "(0 sản phẩm)";
        cartDetail.style.display = 'none';
        emptyCart.style.display = 'block';
        checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        await fetch(`http://localhost:8080/cart-detail/deleteUserCart`, {
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
        });
    })
}

// function selecProduct(){
//     let tableRow = document.querySelectorAll('.table-row');
//     tableRow.forEach(function(element){
//         let idProduct = element.querySelector('.id_product').textContent;
//         localStorage.setItem('id__product', idProduct);
//     });
// }

function creatOrder(){
    let buttonCreatOrder = document.querySelector('.make-order-button');
    buttonCreatOrder.addEventListener('click', async function(){
        let emptyCart = document.querySelector('.empty-cart');
        let cartDetail = document.querySelector('.my-cart-detail');
        let cartCounter = document.querySelector('.cart-counter');
        let nameCustomer = document.querySelector('.customer-name').value;
        let numberPhone = document.querySelector('.customer-contact').value;
        let address = document.querySelector('.customer-address').value;
        let noteContent = document.querySelector('.customer-note').value;
        let price = document.querySelector('.total-price').textContent;
        price = parseInt(boDauCham(price), 10);
        let paymentMethod1 = document.getElementById('option1');
        let paymentMethod2 = document.getElementById('option2');
        let idPaymentMethod = 0;

        async function checkNumberPhone(){
            if(numberPhone.length != 10) return 0;
            for(let i = 0; i < numberPhone.length; i++){
                if(numberPhone[i] < '0' || numberPhone[i] > '9'){
                    return 0;
                }
            }
            return 1;
        }

        let ok1 = 1;
        let ok2 = 1;

        ok2 = await checkNumberPhone();

        if(paymentMethod1.checked){
            idPaymentMethod = 1;
        }

        if(paymentMethod2.checked){
            idPaymentMethod = 2;
        }
        if(nameCustomer == "" || numberPhone == "" || address == "" || idPaymentMethod == 0){
            document.querySelector('.war').style.display = "block";
            ok1 = 0;
        }
        else{
            document.querySelector('.war').style.display = "none";
        }
        if(ok1 == 1){
            if(ok2 == 0){
                document.querySelector('.war2').style.display = "block";
            }
            if(ok2 == 1){
                document.querySelector('.war2').style.display = "none";
            }
        }
        console.log(ok1);
            console.log(ok2);
        if(ok1 == 1 && ok2 == 1){
            const data = {
                receiverName: nameCustomer,
                receiverPhone: numberPhone,
                shippingAddress: address,
                note: noteContent,
                totalPrice: price,
                paymentMethod: {
                    id: idPaymentMethod
                }
            }
            let responseData = await getDataCartDetail();
            checkAccessTokenIsvalid();
            let accessToken = localStorage.getItem('accessToken');
            await fetch(`http://localhost:8080/order/createOrderFromCart`, {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(data) 
            });
            await fetch(`http://localhost:8080/order-detail/add`, {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(responseData)
            });
            let tableRow = document.querySelectorAll('.table-row');
            for(let i = 0; i < tableRow.length; i++){
                tableRow[i].remove();
            }
            cartCounter.innerHTML = "(0 sản phẩm)";
            cartDetail.style.display = 'none';
            emptyCart.style.display = 'block';
            checkAccessTokenIsvalid();
            accessToken = localStorage.getItem('accessToken');
            await fetch(`http://localhost:8080/cart-detail/deleteUserCart`, {
                method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
            });
            alert("Đặt hàng thành công");
        }
    });
}

async function getInforUser(){
    await checkAccessTokenIsvalid();
    let accessToken = localStorage.getItem("accessToken");
    let response = await fetch('http://localhost:8080/user/info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }       
    });
    response = await response.json();
    document.querySelector('.customer-name').value = response.name;
    document.querySelector('.customer-contact').value = response.phone;
    document.querySelector('.customer-address').value = response.address;
}

// main
async function mainCartDetail(){
    let accessToken = localStorage.getItem('accessToken');
    if(accessToken === null){
        alert("Bạn cần đăng nhập để xem giỏ hàng");
    }
    else{
        await buildCartDeTail();
        let cartDetail = document.querySelector('.my-cart-detail');
        let emptyCart = document.querySelector('.empty-cart');
        let tableRow = document.querySelectorAll('.table-row');
        if (tableRow.length != 0){
            cartDetail.style.display = 'flex';
            emptyCart.style.display = 'none';
        }
        if (tableRow.length == 0){
            cartDetail.style.display = 'none';
            emptyCart.style.display = 'block';
        }
        getInforUser();
        adjustNumberProduct();
        deleteProduct();
        deleteAllProduct();
        creatOrder();
        selecProduct();
    }
}

mainCartDetail();