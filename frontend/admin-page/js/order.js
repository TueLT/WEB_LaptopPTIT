import checkAccessTokenIsvalid from "./accessToken.js";

let allOrder;
let numberPageCurrent = 1;
let numberPageOrder = 0;
let numberPageOrderHTML = document.querySelector('.numberPage');
let numberPageCurrentHTML = document.querySelector('.currentPage');
let pageHTML = document.querySelector('.page');

function daucham(num){
    let str = num.toString();
    let tmp = "";
    let mark = 0;
    for(let i = str.length - 1; i >= 0; i--){
        mark += 1;
        tmp = str[i] + tmp;
        if(mark == 3 && i != 0){
            tmp = "." + tmp;
            mark = 0
        }
    }
    return tmp;
}

async function getAllOrder() {
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch('http://localhost:8080/order/admin/getAllOrders',{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            }
        });
        response = await response.json();
        allOrder = response;
    }
    catch(error){
        alert("Đã xảy ra lỗi! Vui lòng thử lại.");
        console.log("Loi xay ra getAllOrder: " + error);
    }
}

async function buildPage1() {
    pageHTML.innerHTML = "";
    if(allOrder.length % 5 == 0){
        numberPageOrder = allOrder.length / 5;
    }
    else{
        numberPageOrder = Math.floor(allOrder.length / 5) + 1;
    }
    numberPageOrderHTML.innerHTML = numberPageOrder;
    numberPageCurrentHTML.innerHTML = numberPageCurrent;

    let indexRow = 0;
    let page = "";
    for(let i = indexRow; i < allOrder.length; i++){
        indexRow += 1;
        let stt = '<td class="stt">' + indexRow + '</td>';
        let orderId = '<td class="id">' + allOrder[i].id + '</td>'
        let name = '<td class="name">' + allOrder[i].receiverName + '</td>'
        let contact = '<td class="contact">' + allOrder[i].receiverPhone + '</td>';
        let address = '<td class="address">' + allOrder[i].shippingAddress + '</td>';
        let totalPrice = '<td class="total-price">' + daucham(allOrder[i].totalPrice) + ' VNĐ' + '</td>';
        let orderDate = '<td class="order-date">' + allOrder[i].orderDate + '</td>';
        let note =  '<td class="note">' + allOrder[i].note + '</td>';
        let status = '<td class="status">' + allOrder[i].status.name + '</td>';
        let paymentMethod = '<td class="payment-method">' + allOrder[i].paymentMethod.name + '</td>';
        let rowTableOrder = '<tr class="table-other-row">' + stt + orderId + name + contact + address + totalPrice + orderDate + note + status + paymentMethod  + '</tr>';
        page += rowTableOrder;
        if(indexRow % 5 == 0){
            pageHTML.innerHTML = '<div class="page">' + '<table class="order-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Họ tên</td><td class="contact">Số điện thoại</td><td class="address">Địa chỉ</td><td class="total-price">Đơn giá</td><td class="order-date">Ngày đặt</td><td class="note">Ghi chú</td><td class="status">Trạng thái</td><td class="payment-method">Thanh toán</td></tr>'+ page + '</table>' + '</div>';
            break;
        }
    }

    if(pageHTML.innerHTML == ""){
        pageHTML.innerHTML = '<div class="page">' + '<table class="order-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Họ tên</td><td class="contact">Số điện thoại</td><td class="address">Địa chỉ</td><td class="total-price">Đơn giá</td><td class="order-date">Ngày đặt</td><td class="note">Ghi chú</td><td class="status">Trạng thái</td><td class="payment-method">Thanh toán</td></tr>'+ page + '</table>' + '</div>';
    }

}

function pageTransition(){
    let left = document.querySelector('.left');
    let right = document.querySelector('.right');

    left.addEventListener('click', async function(){
        if(numberPageCurrent > 1){
            pageHTML.innerHTML = "";
            numberPageCurrent -= 1;
            numberPageCurrentHTML.innerHTML = numberPageCurrent;
            let indexRow = 5 * (numberPageCurrent - 1);
            let page = "";
            for(let i = indexRow; i < allOrder.length; i++){
                indexRow += 1;
                let stt = '<td class="stt">' + indexRow + '</td>';
                let orderId = '<td class="id">' + allOrder[i].id + '</td>'
                let name = '<td class="name">' + allOrder[i].receiverName + '</td>'
                let contact = '<td class="contact">' + allOrder[i].receiverPhone + '</td>';
                let address = '<td class="address">' + allOrder[i].shippingAddress + '</td>';
                let totalPrice = '<td class="total-price">' + daucham(allOrder[i].totalPrice) + ' VNĐ' + '</td>';
                let orderDate = '<td class="order-date">' + allOrder[i].orderDate + '</td>';
                let note =  '<td class="note">' + allOrder[i].note + '</td>';
                let status = '<td class="status">' + allOrder[i].status.name + '</td>';
                let paymentMethod = '<td class="payment-method">' + allOrder[i].paymentMethod.name + '</td>';
                let rowTableOrder = '<tr class="table-other-row">' + stt + orderId + name + contact + address + totalPrice + orderDate + note + status + paymentMethod  + '</tr>';
                page += rowTableOrder;
                if(indexRow % 5 == 0){
                    pageHTML.innerHTML = '<div class="page">' + '<table class="order-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Họ tên</td><td class="contact">Số điện thoại</td><td class="address">Địa chỉ</td><td class="total-price">Đơn giá</td><td class="order-date">Ngày đặt</td><td class="note">Ghi chú</td><td class="status">Trạng thái</td><td class="payment-method">Thanh toán</td></tr>'+ page + '</table>' + '</div>';
                    break;
                }
            }

            if(pageHTML.innerHTML == ""){
                pageHTML.innerHTML = '<div class="page">' + '<table class="order-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Họ tên</td><td class="contact">Số điện thoại</td><td class="address">Địa chỉ</td><td class="total-price">Đơn giá</td><td class="order-date">Ngày đặt</td><td class="note">Ghi chú</td><td class="status">Trạng thái</td><td class="payment-method">Thanh toán</td></tr>'+ page + '</table>' + '</div>';
            }
        }
    })

    right.addEventListener('click', async function(){
        if(numberPageCurrent < numberPageOrder){
            pageHTML.innerHTML = "";
            numberPageCurrent += 1;
            numberPageCurrentHTML.innerHTML = numberPageCurrent;
            let indexRow = 5 * (numberPageCurrent - 1);
            let page = "";
            for(let i = indexRow; i < allOrder.length; i++){
                indexRow += 1;
                let stt = '<td class="stt">' + indexRow + '</td>';
                let orderId = '<td class="id">' + allOrder[i].id + '</td>'
                let name = '<td class="name">' + allOrder[i].receiverName + '</td>'
                let contact = '<td class="contact">' + allOrder[i].receiverPhone + '</td>';
                let address = '<td class="address">' + allOrder[i].shippingAddress + '</td>';
                let totalPrice = '<td class="total-price">' + daucham(allOrder[i].totalPrice) + ' VNĐ' + '</td>';
                let orderDate = '<td class="order-date">' + allOrder[i].orderDate + '</td>';
                let note =  '<td class="note">' + allOrder[i].note + '</td>';
                let status = '<td class="status">' + allOrder[i].status.name + '</td>';
                let paymentMethod = '<td class="payment-method">' + allOrder[i].paymentMethod.name + '</td>';
                let rowTableOrder = '<tr class="table-other-row">' + stt + orderId + name + contact + address + totalPrice + orderDate + note + status + paymentMethod  + '</tr>';
                page += rowTableOrder;
                if(indexRow % 5 == 0){
                    pageHTML.innerHTML = '<div class="page">' + '<table class="order-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Họ tên</td><td class="contact">Số điện thoại</td><td class="address">Địa chỉ</td><td class="total-price">Đơn giá</td><td class="order-date">Ngày đặt</td><td class="note">Ghi chú</td><td class="status">Trạng thái</td><td class="payment-method">Thanh toán</td></tr>'+ page + '</table>' + '</div>';
                    break;
                }
            }

            if(pageHTML.innerHTML == ""){
                pageHTML.innerHTML = '<div class="page">' + '<table class="order-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Họ tên</td><td class="contact">Số điện thoại</td><td class="address">Địa chỉ</td><td class="total-price">Đơn giá</td><td class="order-date">Ngày đặt</td><td class="note">Ghi chú</td><td class="status">Trạng thái</td><td class="payment-method">Thanh toán</td></tr>'+ page + '</table>' + '</div>';
            }
        }
    })
}

function getListId(StrId){
    let res = [];
    StrId = StrId.trim();
    let listIdArr = StrId.split(" ");
    for(let i = 0; i < listIdArr.length; i++){
        let tmp = "";
        let index = 0;
        while(true){
            if(listIdArr[i][index] == ","){
                res.push(tmp);
                break;
            }
            if(index == listIdArr[i].length){
                res.push(tmp);
                break;
            }
            tmp += listIdArr[i][index];
            index += 1
        }
    }
    return res;
}

async function updateStatusOrder(){
    let strId = document.querySelector('.id-input').value;
    let listId = getListId(strId);
    let data = {
        statusId: document.querySelector('.status-input').value,
        orderIds: []
    };
    for(let i = 0; i < listId.length; i++){
        data.orderIds.push(listId[i]);
    };
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch('http://localhost:8080/order/admin/updateOrderStatus',{
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });
        response = await response.text();

        if(response == "Order status updated completed!"){
            alert("Cập nhật trạng thái đơn hàng thành công!");
            window.location.reload();
        }
    }
    catch(error){
        alert("Đã có lỗi xảy ra! Vui lòng thử lại.");
        console.log(error);
    }
}

async function mainOrder(){
    await getAllOrder();
    await buildPage1();
    pageTransition();
    document.querySelector('.submit').addEventListener('click', async function(){
        await updateStatusOrder();
    })
}

mainOrder();