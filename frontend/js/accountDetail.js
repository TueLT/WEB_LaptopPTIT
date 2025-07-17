import checkAccessTokenIsvalid from "./accessToken.js";

function daucham(num) {
  let tmp = "";
  let mark = 0;
  for (let i = num.length - 1; i >= 0; i--) {
    mark += 1;
    tmp = num[i] + tmp;
    if (mark == 3 && i != 0) {
      tmp = "." + tmp;
      mark = 0;
    }
  }
  return tmp;
}

var thongTinTaiKhoan = document.querySelector(".thong-tin-tai-khoan");
var danhSachDonHang = document.querySelector(".danh-sach-don-hang");
var thayDoiMatKhau = document.querySelector(".thay-doi-mat-khau");
var logOut = document.querySelector(".log-out");
var orderDetail = document.querySelector(".orderDetail");
var thongTinTaiKhoanBox = document.querySelector(
  ".account__detail__content___thong-tin-tai-khoan"
);
var danhSachDonHangBox = document.querySelector(
  ".account__detail__content___danh-sach-don-hang"
);
var thayDoiMatKhauBox = document.querySelector(
  ".account__detail__content___thay-doi-mat-khau"
);
var empty = document.querySelector(".empty");

async function getDataUserName() {
  var text = document.querySelector("#taikhoancua");
  await checkAccessTokenIsvalid();
  let accessToken = localStorage.getItem("accessToken");
  let response = await fetch("http://localhost:8080/user/info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  response = await response.json();
  console.log(response);

  var tmpname = '<p class="user-name">' + response.name + "</p>";
  var tmp = "Tài khoản của, " + "\n" + tmpname;
  text.innerHTML = tmp;
  console.log(tmpname);
  text.style.fontFamily = "Arial, sans-serif";
  tmpname = response.name;
  tmp = "<p> Xin chào " + tmpname + "<p>";
  var account = document.querySelector(".account");
  account.innerHTML = tmp;
}
// hover selection
function hoverSelection() {
  thongTinTaiKhoan.addEventListener("mouseover", function () {
    thongTinTaiKhoan.style.backgroundColor = "rgb(0, 91, 173)";
    thongTinTaiKhoan.style.color = "white";
  });
  thongTinTaiKhoan.addEventListener("mouseout", function () {
    thongTinTaiKhoan.style.backgroundColor = "rgb(235, 235, 235)";
    thongTinTaiKhoan.style.color = "rgb(102, 102, 102)";
  });

  danhSachDonHang.addEventListener("mouseover", function () {
    danhSachDonHang.style.backgroundColor = "rgb(0, 91, 173)";
    danhSachDonHang.style.color = "white";
  });
  danhSachDonHang.addEventListener("mouseout", function () {
    danhSachDonHang.style.backgroundColor = "rgb(235, 235, 235)";
    danhSachDonHang.style.color = "rgb(102, 102, 102)";
  });

  thayDoiMatKhau.addEventListener("mouseover", function () {
    thayDoiMatKhau.style.backgroundColor = "rgb(0, 91, 173)";
    thayDoiMatKhau.style.color = "white";
  });
  thayDoiMatKhau.addEventListener("mouseout", function () {
    thayDoiMatKhau.style.backgroundColor = "rgb(235, 235, 235)";
    thayDoiMatKhau.style.color = "rgb(102, 102, 102)";
  });

  logOut.addEventListener("mouseover", function () {
    logOut.style.backgroundColor = "rgb(0, 91, 173)";
    logOut.style.color = "white";
  });
  logOut.addEventListener("mouseout", function () {
    logOut.style.backgroundColor = "rgb(235, 235, 235)";
    logOut.style.color = "rgb(102, 102, 102)";
  });

  thongTinTaiKhoanBox.style.display = "none";
  danhSachDonHangBox.style.display = "none";
  thayDoiMatKhauBox.style.display = "none";
}

// ----------------------click selection----------------------
function clickSelection() {
  thongTinTaiKhoan.addEventListener("click", function () {
    // Thay doi style selection
    thongTinTaiKhoan.addEventListener("mouseout", function () {
      thongTinTaiKhoan.style.backgroundColor = "rgb(0, 91, 173)";
      thongTinTaiKhoan.style.color = "white";
    });
    danhSachDonHang.addEventListener("mouseout", function () {
      danhSachDonHang.style.backgroundColor = "rgb(235, 235, 235)";
      danhSachDonHang.style.color = "rgb(102, 102, 102)";
    });
    thayDoiMatKhau.addEventListener("mouseout", function () {
      thayDoiMatKhau.style.backgroundColor = "rgb(235, 235, 235)";
      thayDoiMatKhau.style.color = "rgb(102, 102, 102)";
    });
    danhSachDonHang.style.backgroundColor = "rgb(235, 235, 235)";
    danhSachDonHang.style.color = "rgb(102, 102, 102)";
    thayDoiMatKhau.style.backgroundColor = "rgb(235, 235, 235)";
    thayDoiMatKhau.style.color = "rgb(102, 102, 102)";
    // Mo thongTinTaiKhoanBox
    empty.style.display = "none";
    thongTinTaiKhoanBox.style.display = "block";
    danhSachDonHangBox.style.display = "none";
    thayDoiMatKhauBox.style.display = "none";
    orderDetail.style.display = "none";
  });

  danhSachDonHang.addEventListener("click", function () {
    // Thay doi style selection
    danhSachDonHang.addEventListener("mouseout", function () {
      danhSachDonHang.style.backgroundColor = "rgb(0, 91, 173)";
      danhSachDonHang.style.color = "white";
    });
    thongTinTaiKhoan.addEventListener("mouseout", function () {
      thongTinTaiKhoan.style.backgroundColor = "rgb(235, 235, 235)";
      thongTinTaiKhoan.style.color = "rgb(102, 102, 102)";
    });
    thongTinTaiKhoan.style.backgroundColor = "rgb(235, 235, 235)";
    thongTinTaiKhoan.style.color = "rgb(102, 102, 102)";
    thayDoiMatKhau.addEventListener("mouseout", function () {
      thayDoiMatKhau.style.backgroundColor = "rgb(235, 235, 235)";
      thayDoiMatKhau.style.color = "rgb(102, 102, 102)";
    });
    thayDoiMatKhau.style.backgroundColor = "rgb(235, 235, 235)";
    thayDoiMatKhau.style.color = "rgb(102, 102, 102)";
    // Mo danhSachDonHangBox
    empty.style.display = "none";
    thongTinTaiKhoanBox.style.display = "none";
    danhSachDonHangBox.style.display = "block";
    thayDoiMatKhauBox.style.display = "none";
    orderDetail.style.display = "none";
  });

  thayDoiMatKhau.addEventListener("click", function () {
    // Thay doi style selection
    thayDoiMatKhau.addEventListener("mouseout", function () {
      thayDoiMatKhau.style.backgroundColor = "rgb(0, 91, 173)";
      thayDoiMatKhau.style.color = "white";
    });
    thongTinTaiKhoan.addEventListener("mouseout", function () {
      thongTinTaiKhoan.style.backgroundColor = "rgb(235, 235, 235)";
      thongTinTaiKhoan.style.color = "rgb(102, 102, 102)";
    });
    thongTinTaiKhoan.style.backgroundColor = "rgb(235, 235, 235)";
    thongTinTaiKhoan.style.color = "rgb(102, 102, 102)";
    danhSachDonHang.addEventListener("mouseout", function () {
      danhSachDonHang.style.backgroundColor = "rgb(235, 235, 235)";
      danhSachDonHang.style.color = "rgb(102, 102, 102)";
    });
    danhSachDonHang.style.backgroundColor = "rgb(235, 235, 235)";
    danhSachDonHang.style.color = "rgb(102, 102, 102)";
    // Mo thayDoiMatKhauBox
    empty.style.display = "none";
    thongTinTaiKhoanBox.style.display = "none";
    danhSachDonHangBox.style.display = "none";
    thayDoiMatKhauBox.style.display = "block";
    orderDetail.style.display = "none";
  });
}

// -----------------Box------------------------

// thongTinTaiKhoanBox
async function changeUserInfor() {
  thongTinTaiKhoan.addEventListener("click", async function () {
    var name = document.querySelector(
      ".account__detail__content___thong-tin-tai-khoan__user-name__input"
    );
    var email = document.querySelector(
      ".account__detail__content___thong-tin-tai-khoan__user-email__input"
    );
    var address = document.querySelector(
      ".account__detail__content___thong-tin-tai-khoan__user-address__input"
    );
    var phone = document.querySelector(
      ".account__detail__content___thong-tin-tai-khoan__user-numberphone__input"
    );

    await checkAccessTokenIsvalid();
    var accessToken = localStorage.getItem("accessToken");

    let response = await fetch("http://localhost:8080/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    response = await response.json();
    name.value = response.name;
    email.value = response.email;
    address.value = response.address;
    phone.value = response.phone;

    var button = document.querySelector(
      ".account__detail__content___thong-tin-tai-khoan__submit"
    );

    button.addEventListener("click", async function () {
      const data = {
        name: name.value,
        address: address.value,
        phone: phone.value,
      };

      await checkAccessTokenIsvalid();
      await fetch("http://localhost:8080/user/changeInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      localStorage.setItem("name", name.value);
      alert("Cập nhật thông tin thành công");
    });
  });
}

// Don hang
async function buildOder() {
  let danhSachDonHang = document.querySelector(".danh-sach-don-hang");
  danhSachDonHang.addEventListener("click", async function () {
    let tableDanhSachDonHang = document.querySelector(".tableDanhSachDonHang");
    tableDanhSachDonHang.innerHTML =
      '<tr class="firstRow"><td class="stt">STT</td><td class="receiverName"></td><td class="receiverPhone"></td><td class="id">Mã đơn hàng</td><td class="totalPrice">Đơn giá</td><td class="dayOrder">Ngày đặt hàng</td><td class="paymentMethod">Phương thức thanh toán</td><td class="status">Trạng thái</td><td class="receiverName"></td><td class="receiverPhone"></td><td class="shippingAddress"></td><td class="note"></td></tr>';
    await checkAccessTokenIsvalid();
    let accessToken = localStorage.getItem("accessToken");
    let response = await fetch(
      "http://localhost:8080/order/getCurrentUserOrder",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    response = await response.json();
    let index = 1;
    await response.forEach(function (element) {
      let stt = '<td class="stt">' + index + "</td>";
      index += 1;
      let id =
        '<td class="id">' + "#" + "100" + element.id.toString() + "</td>";
      let idOrder = '<td class="idOrder">' + element.id.toString() + "</td>";
      let price =
        '<td class="totalPrice">' +
        daucham(element.totalPrice.toString()) +
        " VNĐ" +
        "</td>";
      let status = '<td class="status">' + element.status.name + "</td>";
      let receiverName =
        '<td class="receiverName">' + element.receiverName + "</td>";
      let receiverPhone =
        '<td class="receiverPhone">' + element.receiverPhone + "</td>";
      let shippingAddress =
        '<td class="shippingAddress">' + element.shippingAddress + "</td>";
      let paymentMethod =
        '<td class="paymentMethod">' + element.paymentMethod.name + "</td>";
      let dayOrder = '<td class="dayOrder">' + element.orderDate + "</td>";
      let note = '<td class="note">' + element.note + "</td>";
      let nextRow =
        '<tr class="nextRow">' +
        stt +
        id +
        idOrder +
        price +
        dayOrder +
        paymentMethod +
        status +
        receiverName +
        receiverPhone +
        shippingAddress +
        note +
        "</tr>";
      tableDanhSachDonHang.innerHTML += nextRow;
    });

    if (index == 1) {
      document.querySelector(".oderEmpty").style.display = "block";
      document.querySelector(".tableDanhSachDonHang").style.display = "none";
    } else {
      document.querySelector(".oderEmpty").style.display = "none";
    }
    await buildOrderDetail();
  });
}

//OrderDetail
async function getDataOrderDetail(
  id,
  idOrder,
  receiverName,
  receiverPhone,
  shippingAddress,
  note,
  status,
  totalPrice,
  orderDate
) {
  let orderDetail = document.querySelector(".orderDetail");
  let IdOder = orderDetail.querySelector(".idOrder");
  let Status = orderDetail.querySelector(".status");
  let ReceiverName = orderDetail.querySelector(".nameText");
  let ReceiverPhone = orderDetail.querySelector(".phoneNumber");
  let ShippingAddress = orderDetail.querySelector(".addressText");
  let Note = orderDetail.querySelector(".noteText");
  let OrderDate = orderDetail.querySelector(".time");

  IdOder.innerHTML = "Đơn hàng số " + id;
  OrderDate.innerHTML = orderDate;
  Status.innerHTML = status;
  ReceiverName.innerHTML = receiverName;
  ReceiverPhone.innerHTML = receiverPhone;
  ShippingAddress.innerHTML = shippingAddress;
  Note.innerHTML = note;

  await checkAccessTokenIsvalid();
  let accessToken = localStorage.getItem("accessToken");
  let response = await fetch(`http://localhost:8080/order-detail/${idOrder}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  response = await response.json();
  let index = 1;
  let tableOrder = orderDetail.querySelector(".tableOrder");
  tableOrder.innerHTML =
    '<tr class="firstRow"><td class="ordinalNumber">STT</td><td class="productImg">Ảnh</td><td class="productName">Tên sản phẩm</td><td class="productPrice">Giá bán</td><td class="productQuantity">Số lượng</td><td class="totalPrice">Tổng</td> </tr>';
  response.forEach(function (element) {
    let idProduct = '<td class="idProduct">' + element.laptop.id + "</td>";
    let ordinalNumber = '<td class="ordinalNumber">' + index + "</td>";
    index += 1;
    let img =
      '<td class="productImg">' +
      '<img src="' +
      element.laptop.images[0].filePath +
      '" alt="">' +
      "</td>";
    let productName =
      '<td class="productName">' + element.laptop.name + "</td>";
    let productPrice =
      '<td class="productPrice">' +
      daucham(element.unitPrice.toString()) +
      " đ" +
      "</td>";
    let quantity = '<td class="productQuantity">' + element.quantity + "</td>";
    let totalPrice =
      '<td class="totalPrice">' +
      daucham((element.unitPrice * element.quantity).toString()) +
      " đ" +
      "</td>";
    let nextRow =
      '<tr class="nextRow">' +
      idProduct +
      ordinalNumber +
      img +
      productName +
      productPrice +
      quantity +
      totalPrice +
      "</tr>";
    tableOrder.innerHTML += nextRow;
  });

  let table2 = orderDetail.querySelector(".table2");
  let soTien = table2.querySelector(".soTien");
  soTien.innerHTML = totalPrice;
}

async function buildOrderDetail() {
  let tableDanhSachDonHang = document.querySelector(".tableDanhSachDonHang");
  let nextRow = tableDanhSachDonHang.querySelectorAll(".nextRow");
  console.log(nextRow);
  nextRow.forEach(function (element) {
    element.addEventListener("click", async function () {
      danhSachDonHangBox.style.display = "none";
      document.querySelector(".orderDetail").style.display = "block";
      let id = element.querySelector(".id").textContent;
      let idOrder = element.querySelector(".idOrder").textContent;
      let receiverName = element.querySelector(".receiverName").textContent;
      let receiverPhone = element.querySelector(".receiverPhone").textContent;
      let shippingAddress =
        element.querySelector(".shippingAddress").textContent;
      let orderDate = element.querySelector(".dayOrder").textContent;
      let note = element.querySelector(".note").textContent;
      let status = element.querySelector(".status").textContent;
      let totalPrice = element.querySelector(".totalPrice").textContent;
      await getDataOrderDetail(
        id,
        idOrder,
        receiverName,
        receiverPhone,
        shippingAddress,
        note,
        status,
        totalPrice,
        orderDate
      );
      selectProduct();
    });
    selectProduct();
  });
}

function selectProduct() {
  let tableOrder = document.querySelector(".tableOrder");
  let nextRow = tableOrder.querySelectorAll(".nextRow");
  console.log(nextRow);
  nextRow.forEach(function (element) {
    let productName = element.querySelector(".productName");
    let idProduct = element.querySelector(".idProduct").textContent;
    productName.addEventListener("click", function () {
      localStorage.setItem("id__product", idProduct);
      window.location.href = "product.html";
    });
  });
}

// thay doi mat khau

async function changePassword() {
  var thayDoiMatKhauButton = document.querySelector(".button_thaydoimatkhau");
  thayDoiMatKhauButton.addEventListener("click", async function () {
    var currentPass = document.querySelector(
      ".account__detail__content___thay-doi-mat-khau__mat-khau-hien-tai__input"
    ).value;
    var newPass1 = document.querySelector(
      ".account__detail__content___thay-doi-mat-khau__mat-khau-moi-1__input"
    ).value;
    var newPass2 = document.querySelector(
      ".account__detail__content___thay-doi-mat-khau__mat-khau-moi-2__input"
    ).value;

    var war1 = document.querySelector(".war1");
    var war2 = document.querySelector(".war2");

    if (newPass1 != newPass2) {
      war1.style.display = "block";
    } else {
      war1.style.display = "none";
      // lay mat khau hien tai
      await checkAccessTokenIsvalid();
      var accessToken = localStorage.getItem("accessToken");
      const data = {
        password: newPass1,
      };
      let response = await fetch("http://localhost:8080/user/changePass", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      response = await response.text();

      if (response === "Change password successfully") {
        alert("Thay đổi mật khẩu thành công!");
        // reset
        currentPass = "";
        newPass1 = "";
        newPass2 = "";
      } else {
        alert("Mật khẩu mới không được trùng với mật khẩu trước đó!");
      }
    }
  });
}
// log out
function logOutFunc() {
  logOut.addEventListener("click", function () {
    console.log("event called");
    localStorage.clear();
    document.querySelector(".register__login").style.display = "flex"; // Sửa thành "flex"
    document.querySelector(".account").style.display = "none";
    window.location.reload(); // Thêm dòng này để làm mới trang
  });
}

async function mainAccountDetail() {
  await getDataUserName();
  hoverSelection();
  clickSelection();
  await changeUserInfor();
  await changePassword();
  await buildOder();
  logOutFunc();
}

mainAccountDetail();
