import checkAccessTokenIsvalid from "./accessToken.js";

async function getAllAccount(){
    await checkAccessTokenIsvalid();
    let accessToken = localStorage.getItem('accessToken');
    let response = await fetch('http://localhost:8080/user/admin/getAllUsers',{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
        },
    });
    response = await response.json();
    return response;
}

async function buildAllAccount() {
    let data = await getAllAccount();
    let currentPage = document.querySelector('.currentPage');
    let numberPageHTML = document.querySelector('.numberPage')
    let numberPage = 0;
    if(data.length % 5 == 0){
        numberPage = data.length / 5;
    }
    else{
        numberPage = Math.floor(data.length / 5) + 1;
    }
    let currentPageNumber = 1;
    currentPage.innerHTML = currentPageNumber;
    numberPageHTML.innerHTML = numberPage;
    await buildPage1(data);
    
    let left = document.querySelector('.left');
    let right = document.querySelector('.right');
    let pages = document.querySelector('.pages');

    left.addEventListener('click', async function(){
        if(currentPageNumber > 1){
            currentPageNumber -= 1;
            let numberRow = 0;
            let accountTable ="";
            for(let i = (currentPageNumber - 1) * 5; i < data.length; i++){
                numberRow += 1;
                let id = '<td class="id">' + data[i].id + '</td>';
                let stt =  '<td class="stt">' + numberRow + '</td>';
                let name = '<td class="name">' + data[i].name + '</td>';
                let email = '<td class="email">' + data[i].email + '</td>';
                let contact = '<td class="contact">' + data[i].phone + '</td>';
                let address = '<td class="address">' + data[i].address + '</td>';
                let registrationDate = '<td class="registration-date">' + data[i].registrationDate + '</td>';
                let role = '<td class="role">' + data[i].role + '</td>';
                let tableRow = '<tr class="table-other-row">' + stt + id + name + email + contact + address + registrationDate + role + '</tr>';
                accountTable += tableRow;
                
                if(numberRow % 5 == 0|| i == data.length - 1){
                    accountTable = '<table class="account-table"><tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Họ tên</td><td class="email">Email</td><td class="contact">Số điện thoại</td><td class="address">Địa chỉ</td><td class="registration-date">Ngày đăng ký</td><td class="role">Vai trò</td></tr>' + accountTable + '</table>';
                    pages.innerHTML = accountTable;
                    break;
                }
            }
            currentPage.innerHTML = currentPageNumber;
        }
    })
    right.addEventListener('click', async function(){
        if(currentPageNumber < numberPage){
            currentPageNumber += 1;
            let numberRow = (currentPageNumber - 1) * 5;
            let accountTable ="";
            for(let i = (currentPageNumber - 1) * 5; i < data.length; i++){
                numberRow += 1;
                let id = '<td class="id">' + data[i].id + '</td>';
                let stt =  '<td class="stt">' + numberRow + '</td>';
                let name = '<td class="name">' + data[i].name + '</td>';
                let email = '<td class="email">' + data[i].email + '</td>';
                let contact = '<td class="contact">' + data[i].phone + '</td>';
                let address = '<td class="address">' + data[i].address + '</td>';
                let registrationDate = '<td class="registration-date">' + data[i].registrationDate + '</td>';
                let role = '<td class="role">' + data[i].role + '</td>';
                let tableRow = '<tr class="table-other-row">' + stt + id + name + email + contact + address + registrationDate + role + '</tr>';
                accountTable += tableRow;
        
                if(numberRow % 5 == 0|| i == data.length - 1){
                    accountTable = '<table class="account-table"><tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Họ tên</td><td class="email">Email</td><td class="contact">Số điện thoại</td><td class="address">Địa chỉ</td><td class="registration-date">Ngày đăng ký</td><td class="role">Vai trò</td></tr>' + accountTable + '</table>';
                    pages.innerHTML = accountTable;
                    break;
                }
            }
            currentPage.innerHTML = currentPageNumber;
        }
    })
}

async function buildPage1(data){
    let pages = document.querySelector('.pages');
    let numberRow = 0;
    let accountTable ="";
    for(let i = 0; i < data.length; i++){
        numberRow += 1;
        let id = '<td class="id">' + data[i].id + '</td>';
        let stt =  '<td class="stt">' + numberRow + '</td>';
        let name = '<td class="name">' + data[i].name + '</td>';
        let email = '<td class="email">' + data[i].email + '</td>';
        let contact = '<td class="contact">' + data[i].phone + '</td>';
        let address = '<td class="address">' + data[i].address + '</td>';
        let registrationDate = '<td class="registration-date">' + data[i].registrationDate + '</td>';
        let role = '<td class="role">' + data[i].role + '</td>';
        let tableRow = '<tr class="table-other-row">' + stt + id + name + email + contact + address + registrationDate + role + '</tr>';
        accountTable += tableRow;

        if(numberRow % 5 == 0|| i == data.length - 1){
            accountTable = '<table class="account-table"><tr class="table-first-row"><td class="stt">STT</td><td class="id">ID</td><td class="name">Họ tên</td><td class="email">Email</td><td class="contact">Số điện thoại</td><td class="address">Địa chỉ</td><td class="registration-date">Ngày đăng ký</td><td class="role">Vai trò</td></tr>' + accountTable + '</table>';
            pages.innerHTML = accountTable;
            break;
        }
    }
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

await buildAllAccount();

async function changeUserRole(){
    let changeRole = document.querySelector('.change-role');
    let StrId = changeRole.querySelector('.id-input').value;
    let role = changeRole.querySelector('.role-input').value;
    let listId = getListId(StrId);
    let data = {
        role: role,
        userIds:[]
    }
    for(let i = 0; i < listId.length; i++){
        let id = parseInt(listId[i], 10);
        data.userIds.push(id);
    }
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch('http://localhost:8080/user/admin/changeUsersRole',{
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });
        response = await response.text();
        if(response == "Change users role successfully"){
            alert("Đã thay đổi vai trò người dùng thành công!");
            window.location.reload();
        }else if(response == "Can not change main_admin's role"){
            alert("Không thể thay đổi role của Main Admin");
        }
    }
    catch(error){
        alert("Đã xảy lỗi! Vui lòng thực hiện lại.")
        console.log(error);
    };
}

async function deleteAccount(){
    let deleteAccount = document.querySelector('.delete-account');
    let strId = deleteAccount.querySelector('.id-input').value;
    let listId = getListId(strId);
    let data = []
    for(let i = 0; i < listId.length; i++){
        let id = parseInt(listId[i], 10);
        data.push(id);
    }
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch('http://localhost:8080/user/admin/deleteUsers',{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });
        response = await response.text();
        if(response == "Delete users successfully"){
            alert("Đã xóa tài khoản thành công");
            window.location.reload();
        }
        else if(response == "Can not delete yourself"){
            alert("Bạn không thể tự xóa tài khoản của chính mình!");
        }
        else if(response == "Can not delete admin"){
            alert("Bạn không thể xóa tài khoản có vai trò là admin");
        }
    }
    catch(error){
        alert("Đã xảy lỗi! Vui lòng thực hiện lại.")
        console.log(error);
    };
}

let buttonChangeRole = document.querySelector('.submit1');
let buttonDeleteAccount = document.querySelector('.submit2');

buttonChangeRole.addEventListener('click', async function(){
    await changeUserRole();
});

buttonDeleteAccount.addEventListener('click', async function(){
    await deleteAccount();
})