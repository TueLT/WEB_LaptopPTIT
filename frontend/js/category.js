var category = document.querySelector('.category');
var categoryDetail = document.querySelector('.category__detail');
var categoryDetailLapTopMoi = document.querySelector('.category__detail__lap_top_moi');
var categoryDetailLapTopLikeNew = document.querySelector('.category__detail__lap_top_like_new');

var categoryNew = document.querySelector('.category__new');
var categoryLikeNew = document.querySelector('.category__like_new');

let danhMucSanPhamButton = document.querySelector('.danhmucsanpham');

danhMucSanPhamButton.addEventListener("click", function() {
    const currentDisplay = window.getComputedStyle(category).display;

    if (currentDisplay === 'none') {
        category.style.display = 'block';
    } else {
        category.style.display = 'none';
    }
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Cuộn mượt mà
    });
});

// New
categoryNew.addEventListener('mouseover', function(){
    categoryDetail.style.display = 'flex';
    categoryDetailLapTopMoi.style.display = 'flex';
    categoryDetailLapTopLikeNew.style.display = 'none';
});

categoryDetail.addEventListener('mouseover', function(){
    categoryDetail.style.display = 'flex';
    if(categoryDetailLapTopMoi.style.display === 'flex'){
        categoryDetailLapTopMoi.style.display = 'flex';
    }
});

categoryDetailLapTopMoi.addEventListener('mouseover', function(){
    categoryDetailLapTopMoi.style.display = 'flex';
})

categoryNew.addEventListener('mouseout', function(){
    categoryDetail.style.display = 'none';
});

categoryDetail.addEventListener('mouseout', function(){
    categoryDetail.style.display = 'none';
    categoryDetailLapTopMoi.style.display = 'none';
    categoryDetailLapTopLikeNew.style.display = 'none';
})

//Like new
categoryLikeNew.addEventListener('mouseover', function(){
    categoryDetail.style.display = 'flex';
    categoryDetailLapTopLikeNew.style.display = 'flex';
    categoryDetailLapTopMoi.style.display = 'none';
});

categoryDetail.addEventListener('mouseover', function(){
    categoryDetail.style.display = 'flex';
    if(categoryDetailLapTopLikeNew.style.display === 'flex'){
        categoryDetailLapTopLikeNew.style.display = 'flex';
    }
});

categoryDetailLapTopLikeNew.addEventListener('mouseover', function(){
    categoryDetailLapTopLikeNew.style.display = 'flex';
})

categoryLikeNew.addEventListener('mouseout', function(){
    categoryDetail.style.display = 'none';
});

categoryDetail.addEventListener('mouseout', function(){
    categoryDetail.style.display = 'none';
    categoryDetailLapTopMoi.style.display = 'none';
    categoryDetailLapTopLikeNew.style.display = 'none';
})

// categoryDetailBranchDetail
var categoryDetailBranchDetail = document.querySelectorAll('.category__detail__branch__detail');
categoryDetailBranchDetail.forEach(function(element){
    element.addEventListener('mouseover', function(){
        element.style.color = 'rgb(0, 102, 193)';
    })
    element.addEventListener('mouseout', function(){
        element.style.color = 'black';
    })
})