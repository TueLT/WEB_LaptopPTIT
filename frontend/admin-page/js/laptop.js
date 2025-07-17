import checkAccessTokenIsvalid from './accessToken.js';

let ok1 = 0, ok2 = 0, ok3 = 0, ok4 = 0;

function selectFileImg(){
    let fileInput = document.querySelector('.file-input');
    let importedFiles = document.querySelector('.imported-files');
    fileInput.addEventListener('change', function(event){
        console.log(event.target.files);
        let file = event.target.files;
        for(let i = 0; i < file.length; i++){
            importedFiles.innerHTML += '<p>' + file[i].name + '</p>';
        }
        console.log(file.name);
    }); 
}

async function submitImg(){
    const formData = new FormData();
    let fileInput = document.querySelector('.file-input');
    for(const file of fileInput.files){
        formData.append("images", file);
    }
    try{
        let response = await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        await fetch(`http://localhost:8080/image/add`,{
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${accessToken}`
            },
            body: formData,
        });
        response = await response.text();
        if(response == "Image uploaded successfully"){
            console.log(response);
            ok4 = 1;
        }
    }
    catch(error){
        console.log("Da xay ra loi upload file anh:" + error);
    }
}

async function submitLaptop() {
    let name = document.querySelector('.name').value;
    let price = document.querySelector('.price').value;
    let state = document.querySelector('.state').value;
    let sale = document.querySelector('.sale').value;

    const dataLaptop = {
        name: name,
        price: price,
        state: state,
        sale: sale
    }
    try{
        let response = await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        await fetch(`http://localhost:8080/laptop/admin/add`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(dataLaptop),
        });
        response = await response.text();
        if(response == "Laptop added successfully"){
            console.log(response);
            ok3 = 1;
        }
    }
    catch(error){
        console.log("Da xay ra loi upload laptop: " + error);
    }
}

async function submitSpecification() {
    let cpu = document.querySelector('.cpu').value;
    let ram = document.querySelector('.ram').value;
    let rom = document.querySelector('.rom').value;
    let vga = document.querySelector('.vga').value;
    let screen = document.querySelector('.screen').value;
    let battery = document.querySelector('.battery').value;
    let operatingSystem = document.querySelector('.os').value;
    let weight = document.querySelector('.weight').value;
    let webcam = document.querySelector('.webcam').value;
    let connectionPort = document.querySelector('.port').value;
    let port = document.getElementsByName("port");
    let selectedPort = "";
    for(let i = 0; i < 2; i++){
        if (port[i].checked) {
            selectedPort = port[i].value;
            break;
        }
    }

    const dataSpecification = {
        cpu: cpu,
        ram: ram,
        rom: rom,
        graphicsCard: vga,
        screen: screen,
        battery: battery,
        operatingSystem: operatingSystem,
        weight: weight,
        webcam: webcam,
        connectionPort: connectionPort,
        muxSwitch: selectedPort
    }
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch(`http://localhost:8080/specification/add`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(dataSpecification),
        });
        response = await response.text();
        if(response == "Specification added successfully"){
            console.log(response);
            ok1 = 1;
        }
    }
    catch(error){
        console.log("Da xay ra loi upload specification: " + error);
    }
}

function selectCategory(){
    let categoryButton = document.querySelector('.categoryButton');
    let drowList = document.querySelector('.dropdown-list');
    categoryButton.addEventListener('click', function(){
        drowList.style.display = "grid";
    })

    
    document.addEventListener('click', function(event) {
        if (!drowList.contains(event.target) && !categoryButton.contains(event.target)) {
            drowList.style.display = 'none';
        }
    });

    let selection = drowList.getElementsByTagName('p');
    let selectedCategory = document.querySelector('.selected-category');
    for(let i = 0; i < selection.length; i++){
        selection[i].addEventListener('click', function(){
            let tmp  = selection[i].innerHTML;
            selectedCategory.innerHTML += '<div class="chosen">' + '<p class="categoryName">' + tmp + '</p> <i class="fa-solid fa-delete-left"></i> </div>';
            drowList.style.display = 'none';
            deleteSelectedCategory();
        })
    }
}

function deleteSelectedCategory(){
    let selectedCategory = document.querySelector('.selected-category');
    let chosen = selectedCategory.querySelectorAll('.chosen');
    chosen.forEach(function(element){
        element.querySelector('i').addEventListener('click', function(){
            element.remove();
        })
    })
}

function chuanHoaCategory(category){
    let words = category.split(" ");
    let res = words[0];
    for(let i = 1; i < words.length; i++){
        res += "-" + words[i];
    }
    return res;
}

async function submitCategory(){
    let name = document.querySelector('.name').value;
    let selectedCategory = document.querySelector('.selected-category');
    let dataCategory = [

    ];
    let chosen = selectedCategory.querySelectorAll('.chosen');
    chosen.forEach(function(element){
        let category = {
            laptop : {
                name: name,
            },
            category:{
                name: chuanHoaCategory(element.querySelector('.categoryName').innerHTML)
            } 
        }
        dataCategory.push(category);
    })
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch(`http://localhost:8080/laptopCategory/add`,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(dataCategory),
        });

        response = await response.text();
        if(response == "Laptop Category added successfully"){
            console.log(response);
            ok2 = 1;
        }
    }
    catch(error){
        console.log("Da xay ra loi upload category: " + error);
    }
}

async function laptopMain(){
    selectCategory();
    selectFileImg();
    let confirmButton = document.querySelector('.confirm-button');
    confirmButton.addEventListener('click', async function(){
        await submitSpecification();
        await submitLaptop();
        await submitImg();
        await submitCategory();
        if(ok1 == 1 && ok2 == 1 && ok3 == 1 && ok4 == 1){
            location.reload();
        }
    });
}

laptopMain();