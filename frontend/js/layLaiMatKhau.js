async function layLaiMatKhau(){
    let quenMatKhau = document.querySelector(".quenMatKhau");
    let button = quenMatKhau.querySelector(".button");
    button.addEventListener("click", async function(){
        let email = quenMatKhau.querySelector("input").value.trim();
        try{
            let response1 = await fetch(`http://localhost:8080/forgetPassword/checkEmail/${email}`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            });
            response1 = await response1.text();
            if(response1 === "User found"){
                quenMatKhau.querySelector('.war').style.display = "none";
                try{
                    alert("Yêu cầu của bạn đang được xử lý, vui lòng đợi!");
                    let response2 = await fetch(`http://localhost:8080/forgetPassword/sendMail/${email}`,{
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    });
                    response2 = await response2.text();
                    if(response2 === "Email sent successfully"){
                        alert("Yêu cầu lấy lại mật khẩu của bạn cần được xác minh. Hãy vào kiểm tra Email của bạn để xác nhận đổi mật khẩu!");
                        localStorage.setItem('email', email);
                    }
                }
                catch(error){
                    console.log(error);
                    alert("Đã xảy ra lỗi, vui lòng thực hiện lại!");
                }
            }
            else{
                quenMatKhau.querySelector('.war').style.display = "block";
            }
        }
        catch(error){
            console.log(error);
            alert("Đã xảy ra lỗi, vui lòng thực hiện lại!");
        }
    })
}

layLaiMatKhau();