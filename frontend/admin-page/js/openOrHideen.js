let option2 = document.querySelector('.option2');
let subOption = document.querySelector('.sub-option');
let dau = option2.querySelector('.dau');
let idOption2 = document.querySelector('#option2');

if(localStorage.getItem('hidden') == "false"){
    subOption.style.display = 'flex';
    dau.innerHTML = '<i class="fa-solid fa-chevron-down" id="down-arrow"></i>';
    subOption.style.marginTop = "10px";
    option2.style.paddingBottom = "0px";
}else if(localStorage.getItem('hidden') == "true"){
    subOption.style.display = 'none';
    dau.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
    option2.style.paddingBottom = "10px";
}

idOption2.addEventListener('click', function(){
    if(localStorage.getItem('hidden') == "true"){
        localStorage.setItem('hidden', 'false');
        subOption.style.display = 'flex';
        dau.innerHTML = '<i class="fa-solid fa-chevron-down" id="down-arrow"></i>';
        subOption.style.marginTop = "10px";
        option2.style.paddingBottom = "0px";
    }else if(localStorage.getItem('hidden') == "false"){
        localStorage.setItem('hidden', 'true');
        subOption.style.display = 'none';
        dau.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
        option2.style.paddingBottom = "10px";
    }
})