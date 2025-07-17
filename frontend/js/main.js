// hover vao product

var product = document.querySelectorAll(".product__container");

product.forEach(function (element) {
  element.children[1].style.transition = "0.3s";
  element.children[1].addEventListener("mouseover", function () {
    element.children[1].style.transform = "translateY(-10px)";
  });
  element.children[1].addEventListener("mouseout", function () {
    element.children[1].style.transform = "translateY(0)";
  });

  element.children[2].addEventListener("mouseover", function () {
    element.children[1].style.transform = "translateY(-10px)";
  });
  element.children[2].addEventListener("mouseout", function () {
    element.children[1].style.transform = "translateY(0)";
  });
});

let danhMucSanPhamButton = document.querySelector(".danhmucsanpham");

danhMucSanPhamButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Cuộn mượt mà
  });
});

let category = document.querySelector(".category");

for (let i = 0; i < category.children.length; i++) {
  category.children[i].addEventListener("mouseover", function () {
    category.children[i].style.color = "#0365ff";
    category.children[i].style.backgroundColor = "rgb(186,222,254)";
  });
  category.children[i].addEventListener("mouseout", function () {
    category.children[i].style.color = "black";
    category.children[i].style.backgroundColor = "white";
  });
}

let hocTapVanPhongCoBanCategory = document.querySelector(
  ".category__hoctapvanphongcoban"
);
let gaming = document.querySelector(".category__gaming");
let dohoa = document.querySelector(".category__dohoa");
let mongnhe = document.querySelector(".category__mongnhe");

hocTapVanPhongCoBanCategory.addEventListener("click", function () {
  window.scrollTo({
    top: 720,
    behavior: "smooth", // Cuộn mượt mà
  });
});

gaming.addEventListener("click", function () {
  window.scrollTo({
    top: 1280,
    behavior: "smooth", // Cuộn mượt mà
  });
});

dohoa.addEventListener("click", function () {
  window.scrollTo({
    top: 1840,
    behavior: "smooth", // Cuộn mượt mà
  });
});

mongnhe.addEventListener("click", function () {
  window.scrollTo({
    top: 2400,
    behavior: "smooth", // Cuộn mượt mà
  });
});

// Category

var categoryDetail = document.querySelector(".category__detail");
var categoryDetailLapTopMoi = document.querySelector(
  ".category__detail__lap_top_moi"
);
var categoryDetailLapTopLikeNew = document.querySelector(
  ".category__detail__lap_top_like_new"
);

var categoryNew = document.querySelector(".category__new");
var categoryLikeNew = document.querySelector(".category__like_new");

// New
categoryNew.addEventListener("mouseover", function () {
  categoryDetail.style.display = "flex";
  categoryDetailLapTopMoi.style.display = "flex";
  categoryDetailLapTopLikeNew.style.display = "none";
});

categoryDetail.addEventListener("mouseover", function () {
  categoryDetail.style.display = "flex";
  if (categoryDetailLapTopMoi.style.display === "flex") {
    categoryDetailLapTopMoi.style.display = "flex";
  }
});

categoryDetailLapTopMoi.addEventListener("mouseover", function () {
  categoryDetailLapTopMoi.style.display = "flex";
});

categoryNew.addEventListener("mouseout", function () {
  categoryDetail.style.display = "none";
});

categoryDetail.addEventListener("mouseout", function () {
  categoryDetail.style.display = "none";
  categoryDetailLapTopMoi.style.display = "none";
  categoryDetailLapTopLikeNew.style.display = "none";
});

//Like new
categoryLikeNew.addEventListener("mouseover", function () {
  categoryDetail.style.display = "flex";
  categoryDetailLapTopLikeNew.style.display = "flex";
  categoryDetailLapTopMoi.style.display = "none";
});

categoryDetail.addEventListener("mouseover", function () {
  categoryDetail.style.display = "flex";
  if (categoryDetailLapTopLikeNew.style.display === "flex") {
    categoryDetailLapTopLikeNew.style.display = "flex";
  }
});

categoryDetailLapTopLikeNew.addEventListener("mouseover", function () {
  categoryDetailLapTopLikeNew.style.display = "flex";
});

categoryLikeNew.addEventListener("mouseout", function () {
  categoryDetail.style.display = "none";
});

categoryDetail.addEventListener("mouseout", function () {
  categoryDetail.style.display = "none";
  categoryDetailLapTopMoi.style.display = "none";
  categoryDetailLapTopLikeNew.style.display = "none";
});

// categoryDetailBranchDetail
var categoryDetailBranchDetail = document.querySelectorAll(
  ".category__detail__branch__detail"
);
categoryDetailBranchDetail.forEach(function (element) {
  element.addEventListener("mouseover", function () {
    element.style.color = "rgb(0, 102, 193)";
  });
  element.addEventListener("mouseout", function () {
    element.style.color = "black";
  });
});
