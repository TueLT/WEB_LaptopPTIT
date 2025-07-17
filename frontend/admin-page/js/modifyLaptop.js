import checkAccessTokenIsvalid from "./accessToken.js";

let allLaptop = "";
let numberPageCurrent = 1;
let numberPageLaptop = 0;
let numberPageLaptopHTML = document.querySelector('.numberPage');
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

async function getAllLapTop(){
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch('http://localhost:8080/laptop/admin/getAllLaptops',{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            }
        });
        response = await response.json();
        allLaptop = response;
    }
    catch(error){
        alert("Đã xảy ra lỗi! Vui lòng thử lại.");
        console.log("Loi xay ra getAllLaptop: " + error);
    }
}

async function buildPage1() {
    pageHTML.innerHTML = "";
    if(allLaptop.length % 5 == 0){
        numberPageLaptop = allLaptop.length / 5;
    }
    else{
        numberPageLaptop = Math.floor(allLaptop.length / 5) + 1;
    }
    numberPageLaptopHTML.innerHTML = numberPageLaptop;
    numberPageCurrentHTML.innerHTML = numberPageCurrent;

    let indexRow = 0;
    let page = "";
    for(let i = indexRow; i < allLaptop.length; i++){
        indexRow += 1;
        let stt = '<td class="stt">' + indexRow + '</td>';
        let LaptopId = '<td class="id">' + allLaptop[i].id + '</td>'
        let name = '<td class="name">' + allLaptop[i].name + '</td>'
        let price = '<td class="price">' + daucham(allLaptop[i].price) + ' VNĐ' + '</td>';
        let sale = '<td class="sale">' + allLaptop[i].sale + '%' + '</td>';
        let state = '<td class="state">' + allLaptop[i].state + '</td>';
        if(allLaptop[i].available == true){
            allLaptop[i].available = "Còn"
        }else{
            allLaptop[i].available = "Không" 
        }
        let available = '<td class="available">' + allLaptop[i].available + '</td>';
        let rowTableLaptop = '<tr class="table-other-row">' + stt + LaptopId + name + price + sale + state + available  + '</tr>';
        page += rowTableLaptop;
        if(indexRow % 5 == 0){
            pageHTML.innerHTML = '<div class="page">' + '<table class="laptop-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Tên Laptop</td><td class="price">Giá sản phẩm</td><td class="sale">Giảm giá</td><td class="state">Trạng thái</td><td class="available">Còn hàng</td></tr>'+ page + '</table>' + '</div>';
            break;
        }
    }

    if(pageHTML.innerHTML == ""){
        pageHTML.innerHTML = '<div class="page">' + '<table class="laptop-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Tên Laptop</td><td class="price">Giá sản phẩm</td><td class="sale">Giảm giá</td><td class="state">Trạng thái</td><td class="available">Còn hàng</td></tr>'+ page + '</table>' + '</div>';
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
            for(let i = indexRow; i < allLaptop.length; i++){
                indexRow += 1;
                let stt = '<td class="stt">' + indexRow + '</td>';
                let LaptopId = '<td class="id">' + allLaptop[i].id + '</td>'
                let name = '<td class="name">' + allLaptop[i].name + '</td>'
                let price = '<td class="price">' + daucham(allLaptop[i].price) + ' VNĐ' + '</td>';
                let sale = '<td class="sale">' + allLaptop[i].sale + '%' + '</td>';
                let state = '<td class="state">' + allLaptop[i].state + '</td>';
                let available = '<td class="available">' + allLaptop[i].available + '</td>';
                if(allLaptop[i].available == true){
                    allLaptop[i].available = "Còn"
                }else{
                    allLaptop[i].available = "Không" 
                }
                let rowTableLaptop = '<tr class="table-other-row">' + stt + LaptopId + name + price + sale + state + available  + '</tr>';
                page += rowTableLaptop;
                if(indexRow % 5 == 0){
                    pageHTML.innerHTML = '<div class="page">' + '<table class="laptop-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Tên Laptop</td><td class="price">Giá sản phẩm</td><td class="sale">Giảm giá</td><td class="state">Trạng thái</td><td class="available">Còn hàng</td></tr>'+ page + '</table>' + '</div>';
                    break;
                }
            }
        
            if(pageHTML.innerHTML == ""){
                pageHTML.innerHTML = '<div class="page">' + '<table class="laptop-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Tên Laptop</td><td class="price">Giá sản phẩm</td><td class="sale">Giảm giá</td><td class="state">Trạng thái</td><td class="available">Còn hàng</td></tr>'+ page + '</table>' + '</div>';
            }
        }
    })

    right.addEventListener('click', async function(){
        if(numberPageCurrent < numberPageLaptop){
            pageHTML.innerHTML = "";
            numberPageCurrent += 1;
            numberPageCurrentHTML.innerHTML = numberPageCurrent;
            let indexRow = 5 * (numberPageCurrent - 1);
            let page = "";
            for(let i = indexRow; i < allLaptop.length; i++){
                indexRow += 1;
                let stt = '<td class="stt">' + indexRow + '</td>';
                let LaptopId = '<td class="id">' + allLaptop[i].id + '</td>'
                let name = '<td class="name">' + allLaptop[i].name + '</td>'
                let price = '<td class="price">' + daucham(allLaptop[i].price) + ' VNĐ' + '</td>';
                let sale = '<td class="sale">' + allLaptop[i].sale + '%' + '</td>';
                let state = '<td class="state">' + allLaptop[i].state + '</td>';
                if(allLaptop[i].available == true){
                    allLaptop[i].available = "Còn"
                }else{
                    allLaptop[i].available = "Không" 
                }
                let available = '<td class="available">' + allLaptop[i].available + '</td>';
                let rowTableLaptop = '<tr class="table-other-row">' + stt + LaptopId + name + price + sale + state + available  + '</tr>';
                page += rowTableLaptop;
                if(indexRow % 5 == 0){
                    pageHTML.innerHTML = '<div class="page">' + '<table class="laptop-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Tên Laptop</td><td class="price">Giá sản phẩm</td><td class="sale">Giảm giá</td><td class="state">Trạng thái</td><td class="available">Còn hàng</td></tr>'+ page + '</table>' + '</div>';
                    break;
                }
            }
        
            if(pageHTML.innerHTML == ""){
                pageHTML.innerHTML = '<div class="page">' + '<table class="laptop-table">' + '<tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Tên Laptop</td><td class="price">Giá sản phẩm</td><td class="sale">Giảm giá</td><td class="state">Trạng thái</td><td class="available">Còn hàng</td></tr>'+ page + '</table>' + '</div>';
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

async function modifyLapTop(){
    let strId = document.querySelector('.id-input').value;
    let listId = getListId(strId);
    let available = document.querySelector('.available-input').value;
    if(available == "Còn"){
        available = true;
    }else if(available == "Không còn"){
        available = false;
    }
    let data = {
        available: available,
        laptopIDs: []
    };
    for(let i = 0; i < listId.length; i++){
        data.laptopIDs.push(listId[i]);
    };
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch('http://localhost:8080/laptop/admin/changeAvailable',{
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });
        response = await response.text();

        if(response == "changed successfully"){
            alert("Cập nhật thành công!");
            window.location.reload();
        }
        else{
            alert("Không tìm thấy laptop! Vui lòng kiểm tra lại.");
        }
    }
    catch(error){
        alert("Đã có lỗi xảy ra! Vui lòng thử lại.");
        console.log(error);
    }
}

async function deleteLapTop(){
    let strId = document.querySelector('#id-input2').value;
    let listId = getListId(strId);
    let laptopIDs = [];
    for(let i = 0; i < listId.length; i++){
        laptopIDs.push(listId[i]);
    };
    console.log(laptopIDs);
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch('http://localhost:8080/laptop/admin/deleteLaptops',{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(laptopIDs)
        });
        response = await response.text();

        if(response == "Deleted successfully"){
            alert("Xóa thành công!");
            window.location.reload();
        }
    }
    catch(error){
        alert("Đã có lỗi xảy ra! Vui lòng thử lại.");
        console.log(error);
    }
}

async function modifyLaptopMain(){
    await getAllLapTop();
    await buildPage1();
    pageTransition();
    document.querySelector('.submit1').addEventListener('click', async function(){
        await modifyLapTop();
    })
    document.querySelector('.submit2').addEventListener('click', async function(){
        await deleteLapTop();
    })
}

modifyLaptopMain();