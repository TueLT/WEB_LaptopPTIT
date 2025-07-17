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

function inputTextInSearch(){
    let inputSearch = document.querySelector('.input__search');
    let sugestionSearch = document.querySelector('.sugestion_search');
    let sugestionSearchContainer = document.querySelector('.sugestion_search__container');
    inputSearch.addEventListener('input', async function(){
        sugestionSearchContainer.innerHTML = "";
        sugestionSearch.style.display = 'block';
        let keyword = inputSearch.value;
        let data = await fetch(`http://localhost:8080/laptop/search?keyword=${keyword}`)
        data = await data.json();
        await data.forEach(function(element){
            let id =  '<div class="id">' + element.id + '</div>';
            let img = '<div class="sugestion__img">' + '<img src="'  + element.images[0].filePath + '" alt=""></div>';
            let name = '<p class="name">' + element.name + '(' + element.specification.cpu + ', ' + element.specification.ram + ', ' + element.specification.rom + ', ' + element.specification.graphicsCard + ', ' + element.specification.screen + ')' + '</p>';
            let price = element.price * (100 - element.sale) / 100;
            price = lamtron(price);
            price = price.toString();
            price = daucham(price);
            let Price = '<p class="price">' + price + " VNĐ" + '</p>';
            let nameAndPrice =  '<div class="nameAndPrice">' + name + Price + '</div>';
            let sugestion =  '<div class="sugestion">' + id + img + nameAndPrice + '</div>';
            sugestionSearchContainer.innerHTML += sugestion;
        })
        selectSugestion();
        hiddenSuggestionContainer();
    })
}

function selectSugestion(){
    let sugestion = document.querySelectorAll('.sugestion');
    sugestion.forEach(function(element){
        element.addEventListener('click', function(){
            localStorage.setItem('id__product', element.querySelector('.id').textContent);
            window.location.href = 'product.html';
        })
    })
}

function hiddenSuggestionContainer(){
    let sugestionSearchContainer = document.querySelector('.sugestion_search');
    document.addEventListener('click', function(event){
        if(sugestionSearchContainer.style.display == "block"){
            if(!sugestionSearchContainer.contains(event.target)){
                sugestionSearchContainer.style.display = "none";
            }
        }
    })
}

inputTextInSearch();
selectSugestion();