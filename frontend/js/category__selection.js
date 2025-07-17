function selectionCategory() {
    let lapTopMoi = document.querySelector('.category__detail__lap_top_moi');
    let lapTopLikeNew = document.querySelectorAll('.category__detail__lap_top_like_new');
    let New = document.querySelector('.category__new');
    let like_new = document.querySelector('.category__like_new');
    let brand = document.querySelectorAll('.category__detail__branch__name');

    for(let i = 0; i < brand.length; i++){
        brand[i].addEventListener('click', function(){
            if(i == 0){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'Dell');
                localStorage.setItem('state', 'New');
                localStorage.setItem('category', '');
            }
            else if(i == 1){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'HP');
                localStorage.setItem('state', 'New');
                localStorage.setItem('category', '');
            }
            else if(i == 2){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'MSI');
                localStorage.setItem('state', 'New');
                localStorage.setItem('category', '');
            }
            else if(i == 3){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'Lenovo');
                localStorage.setItem('state', 'New');
                localStorage.setItem('category', '');
            }
            else if(i == 4){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'ASUS');
                localStorage.setItem('state', 'New');
                localStorage.setItem('category', '');
            }
            else if(i == 5){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'ACER');
                localStorage.setItem('state', 'New');
                localStorage.setItem('category', '');
            }
            else if(i == 6){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'Dell');
                localStorage.setItem('state', 'Like-New');
                localStorage.setItem('category', '');
            }
            else if(i == 7){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'HP');
                localStorage.setItem('state', 'Like-New');
                localStorage.setItem('category', '');
            }
            else if(i == 8){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'MSI');
                localStorage.setItem('state', 'Like-New');
                localStorage.setItem('category', '');
            }
            else if(i == 9){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'Lenovo');
                localStorage.setItem('state', 'Like-New');
                localStorage.setItem('category', '');
            }
            else if(i == 10){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'ASUS');
                localStorage.setItem('state', 'Like-New');
                localStorage.setItem('category', '');
            }
            else if(i == 11){
                localStorage.setItem('action', 'selectionCategory');
                localStorage.setItem('brand', 'ACER');
                localStorage.setItem('state', 'Like-New');
                localStorage.setItem('category', '');
            }
            window.location.href='laptoptheomuc.html';
        })
    }

    // For the "lapTopMoi" element
    let selectionLapTopMoi = lapTopMoi.querySelectorAll('.category__detail__branch__detail');
    let selectionLapTopLikeNew =
    New.addEventListener('click', function(){
        localStorage.setItem('category', '');
        localStorage.setItem('brand', '');
        localStorage.setItem('state', 'New');
        localStorage.setItem('action', 'selectionCategory');
        window.location.href='laptoptheomuc.html';
    })

    like_new.addEventListener('click', function(){
        localStorage.setItem('category', '');
        localStorage.setItem('brand', '');
        localStorage.setItem('state', 'Like-New');
        localStorage.setItem('action', 'selectionCategory');
        window.location.href='laptoptheomuc.html';
    })
    
    selectionLapTopMoi.forEach(function(element){
        let nameBranch = element.querySelector('.id').textContent;
        element.addEventListener('click', function() {
            localStorage.setItem('category', nameBranch);
            localStorage.setItem('brand', '');
            localStorage.setItem('state', 'New');
            localStorage.setItem('action', 'selectionCategory');
        });
    });

    // For each "lapTopLikeNew" element
    lapTopLikeNew.forEach(function(lapTop) {
        let selectionLapTopLikeNew = lapTop.querySelectorAll('.category__detail__branch__detail');
        selectionLapTopLikeNew.forEach(function(element) {
            let nameBranch = element.querySelector('.id').textContent;
            element.addEventListener('click', function() {
                localStorage.setItem('category', nameBranch);
                localStorage.setItem('state', 'Like-New');
                localStorage.setItem('action', 'selectionCategory');
            });
        });
    });
}

selectionCategory();