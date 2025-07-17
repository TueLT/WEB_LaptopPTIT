function datLaiMatKhau(){
    let box = document.querySelector('.content-container');
    let button = box.querySelector('.confirm-button');
    button.addEventListener('click', async function(){
        let pass1 = box.querySelector('.password-input1').value;
        let pass2 = box.querySelector('.password-input2').value;

        if(pass1 != pass2){
            box.querySelector('.war').style.display = "block";
        }
        else{
            box.querySelector('.war').style.display = "none";
            let email = localStorage.getItem('email');
            let data = {
                password: pass1
            }
            try{
                let response = await fetch(`http://localhost:8080/forgetPassword/resetPassword?email=${email}`,{
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                response = await response.text();
                if(response == "Password reset successfully"){
                    alert("Đặt lại mật khẩu thành công! Hẫy quay lại trang chủ để đăng nhập.")
                }
            }
            catch(error){
                console.log(error);
                alert("Đã có lỗi xảy ra. Thay đổi mật khẩu thất bại!")
            }
        }
    });
}

datLaiMatKhau();
