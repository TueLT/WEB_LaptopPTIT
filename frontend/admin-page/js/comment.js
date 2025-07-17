import checkAccessTokenIsvalid from "./accessToken.js";

let allComment;
let numberPageCurrent = 1;
let numberPageComment = 0;
let numberPageCommentHTML = document.querySelector('.numberPage');
let numberPageCurrentHTML = document.querySelector('.currentPage');
let pageHTML = document.querySelector('.page');

async function getAllComment() {
    try{
        await checkAccessTokenIsvalid();
        let accessToken = localStorage.getItem('accessToken');
        let response = await fetch('http://localhost:8080/comment/admin/getAllComment',{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
            }
        });
        response = await response.json();
        allComment = response;
        console.log(allComment);
    }
    catch(error){
        alert("Đã xảy ra lỗi! Vui lòng thử lại.");
        console.log("Loi xay ra getAllComment: " + error);
    }
}

async function buildPage1() {
    pageHTML.innerHTML = "";
    if(allComment.length % 10 == 0){
        numberPageComment = allComment.length / 10;
    }
    else{
        numberPageComment = Math.floor(allComment.length / 10) + 1;
    }
    numberPageCommentHTML.innerHTML = numberPageComment;
    numberPageCurrentHTML.innerHTML = numberPageCurrent;

    let indexRow = 0;
    let page = "";
    for(let i = 0; i < allComment.length; i++){
        indexRow += 1;
        let stt = '<td class="stt">' + indexRow + '</td>';
        let commentId = '<td class="commentID">' + allComment[i].id + '</td>';
        let userId = '<td class="userID">' + allComment[i].userId + '</td>';
        let content = '<td class="content">' + allComment[i].content + '</td>';
        let postAt = '<td class="post-at">' + allComment[i].postAt + '</td>';
        let apdateAt = '<td class="update-at">' + allComment[i].updateAt + '</td>';
        let deleteComment = '<td class="delete"><i class="fa-solid fa-xmark"></i></td>';
        let rowTableComment = '<tr class="table-other-row">' + stt + commentId + userId + content + postAt + apdateAt + deleteComment + '</tr>';
        page += rowTableComment;
        if(indexRow == 10){
            pageHTML.innerHTML = '<div class="page">' + '<table class="comment-table"><tr class="table-first-row"><td class="stt">STT</td><td class="commentID">CommentID</td><td class="userID">UserID</td><td class="content">Nội dung</td><td class="post-at">Thời gian đăng</td><td class="update-at">Thời gian thay đổi</td></tr>'+ page + '</div>';
            break;
        }
    }

    if(pageHTML.innerHTML == ""){
        pageHTML.innerHTML = '<div class="page">' + '<table class="comment-table"><tr class="table-first-row"><td class="stt">STT</td><td class="commentID">CommentID</td><td class="userID">UserID</td><td class="content">Nội dung</td><td class="post-at">Thời gian đăng</td><td class="update-at">Thời gian thay đổi</td></tr>'+ page + '</div>';
    }

}

function pageTransition(){
    let left = document.querySelector('.left');
    let right = document.querySelector('.right');

    left.addEventListener('click', async function(){
        if(numberPageCurrent > 1){
            pageHTML.innerHTML = "";
            numberPageCurrent -= 1;
            numberPageCurrentHTML.innerHTML = numberPageCurrent;
            let indexRow = 10 * (numberPageCurrent - 1);
            let page = "";
            for(let i = 10 * (numberPageCurrent - 1); i < allComment.length; i++){
                indexRow += 1;
                let stt = '<td class="stt">' + indexRow + '</td>';
                let commentId = '<td class="commentID">' + allComment[i].id + '</td>';
                let userId = '<td class="userID">' + allComment[i].userId + '</td>';
                let content = '<td class="content">' + allComment[i].content + '</td>';
                let postAt = '<td class="post-at">' + allComment[i].postAt + '</td>';
                let apdateAt = '<td class="update-at">' + allComment[i].updateAt + '</td>';
                let deleteComment = '<td class="delete"><i class="fa-solid fa-xmark"></i></td>';
                let rowTableComment = '<tr class="table-other-row">' + stt + commentId + userId + content + postAt + apdateAt + deleteComment + '</tr>';
                page += rowTableComment;
                if(indexRow % 10 == 0){
                    pageHTML.innerHTML = '<div class="page">' + '<table class="comment-table"><tr class="table-first-row"><td class="stt">STT</td><td class="commentID">CommentID</td><td class="userID">UserID</td><td class="content">Nội dung</td><td class="post-at">Thời gian đăng</td><td class="update-at">Thời gian thay đổi</td></tr>'+ page + '</div>'
                    break;
                }
            }
            if(pageHTML.innerHTML == ""){
                pageHTML.innerHTML = '<div class="page">' + '<table class="comment-table"><tr class="table-first-row"><td class="stt">STT</td><td class="commentID">CommentID</td><td class="userID">UserID</td><td class="content">Nội dung</td><td class="post-at">Thời gian đăng</td><td class="update-at">Thời gian thay đổi</td></tr>'+ page + '</div>';
            }
        }
    })

    right.addEventListener('click', async function(){
        if(numberPageCurrent < numberPageComment){
            pageHTML.innerHTML = "";
            numberPageCurrent += 1;
            numberPageCurrentHTML.innerHTML = numberPageCurrent;
            let indexRow = 10 * (numberPageCurrent - 1);
            let page = "";
            for(let i = 10 * (numberPageCurrent - 1); i < allComment.length; i++){
                indexRow += 1;
                let stt = '<td class="stt">' + indexRow + '</td>';
                let commentId = '<td class="commentID">' + allComment[i].id + '</td>';
                let userId = '<td class="userID">' + allComment[i].userId + '</td>';
                let content = '<td class="content">' + allComment[i].content + '</td>';
                let postAt = '<td class="post-at">' + allComment[i].postAt + '</td>';
                let apdateAt = '<td class="update-at">' + allComment[i].updateAt + '</td>';
                let deleteComment = '<td class="delete"><i class="fa-solid fa-xmark"></i></td>';
                let rowTableComment = '<tr class="table-other-row">' + stt + commentId + userId + content + postAt + apdateAt + deleteComment + '</tr>';
                page += rowTableComment;
                if(indexRow % 10 == 0){
                    pageHTML.innerHTML = '<div class="page">' + '<table class="comment-table"><tr class="table-first-row"><td class="stt">STT</td><td class="commentID">CommentID</td><td class="userID">UserID</td><td class="content">Nội dung</td><td class="post-at">Thời gian đăng</td><td class="update-at">Thời gian thay đổi</td></tr>'+ page + '</div>'
                    break;
                }
            }
            if(pageHTML.innerHTML == ""){
                pageHTML.innerHTML = '<div class="page">' + '<table class="comment-table"><tr class="table-first-row"><td class="stt">STT</td><td class="commentID">CommentID</td><td class="userID">UserID</td><td class="content">Nội dung</td><td class="post-at">Thời gian đăng</td><td class="update-at">Thời gian thay đổi</td></tr>'+ page + '</div>';
            }
        }
    })
}

async function deleteComment(){
    let rowComment = document.querySelectorAll('.table-other-row');
    rowComment.forEach(function(element){
        let buttonDete = element.querySelector('.delete');
        buttonDete.addEventListener('click', async function(){
            try{
                await checkAccessTokenIsvalid();
                let accessToken = localStorage.getItem('accessToken');
                let id = element.querySelector('.commentID').textContent;
                let response = await fetch(`http://localhost:8080/comment/delete/${id}`,{
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                    }
                });
                response = await response.text();
                if(response == "Comment deleted successfully"){
                    alert("Đã xóa comment");
                    window.location.reload();
                }
            }
            catch(error){
                alert("Đã xảy ra lỗi! Vui lòng thực hiện lại.");
                console.log("Lỗi xóa comment: " + error);
            }
        })
    })
}

async function mainComment(){
    await getAllComment();
    await buildPage1();
    pageTransition();
    await deleteComment();
}

mainComment();