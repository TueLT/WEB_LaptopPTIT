import checkAccessTokenIsvalid from "./accessToken.js";

function getListCategory(strListCategory){
    let res = [];
    strListCategory = strListCategory.trim();
    let index = 0;
    let tmp = "";
    let check = 1;
    while(true){
        if(strListCategory[index] == " "){
            while(strListCategory[index] == " "){
                index += 1;
            }
            if(check == 0){
                check = 1;
            }
            else{
                tmp += " ";
            }
        }
        else if(strListCategory[index] == ","){
            index += 1;
            res.push(tmp);
            tmp ="";
            check = 0;
        }
        else{
            tmp += strListCategory[index];
            index += 1;
        }
        if(index == strListCategory.length){
            res.push(tmp);
            break; 
        }
    }
    return res;
}

async function getAllCategory() {
    let allCategory = document.querySelector('.all-category');
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch('http://localhost:8080/collections/admin/getAllCategories',{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            },
        });
        response = await response.json();
        for(let i = 0; i < response.length; i++){
            allCategory.innerHTML += '<p>' + response[i].name + '</p>';
        }
    }
    catch(error){
        alert("Đã xảy ra lỗi! Vui lòng thử lại.");
        console.log("Loi xay ra addCategory: " + error);
    } 
}

function addCategory(){
    let addCategory = document.querySelector('.add-category');
    let buttonAdd = addCategory.querySelector('.submit');
    buttonAdd.addEventListener('click', async function(){
        let strListCategory = addCategory.querySelector('.input').value;
        let listCategory = getListCategory(strListCategory);
        let data = [];
        for (let i = 0; i < listCategory.length; i++) {
            data.push({ name: listCategory[i] });
        }
        try{
            await checkAccessTokenIsvalid();
            let accessToken = localStorage.getItem('accessToken');
            let response = await fetch('http://localhost:8080/collections/admin/add',{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            });
            response = await response.text();
            if(response == "Category added successfully"){
                alert("Thêm danh mục thành công")
            }
            window.location.reload();
        }
        catch(error){
            alert("Đã xảy ra lỗi! Vui lòng thử lại.");
            console.log("Loi xay ra addCategory: " + error);
        }
    })
}

function deleteCategory(){
    let addCategory = document.querySelector('.delete-category');
    let buttonAdd = addCategory.querySelector('.submit');
    buttonAdd.addEventListener('click', async function(){
        console.log("adfadf");
        let strListCategory = addCategory.querySelector('.input').value;
        let listCategory = getListCategory(strListCategory);
        let data = [];
        for (let i = 0; i < listCategory.length; i++) {
            data.push({ name: listCategory[i] });
        }
        try{
            await checkAccessTokenIsvalid();
            let accessToken = localStorage.getItem('accessToken');
            let response = await fetch('http://localhost:8080/collections/admin/delete',{
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            });
            response = await response.text();
            if(response == "Category removed"){
                alert("Xóa danh mục thành công")
            }else if(response == "Category not found"){
                alert("Danh mục không tồn tại")
            }
            window.location.reload();
        }
        catch(error){
            alert("Đã xảy ra lỗi! Vui lòng thử lại.");
            console.log("Loi xay ra deleteCategory: " + error);
        }
    })
}

async function mainCategory(){
    await getAllCategory();
    deleteCategory();
    addCategory();
}

mainCategory();