if(localStorage.getItem('role') == 'admin'){
    document.querySelector('.account').href = 'admin-page/admin_overall.html';
}
else{
    document.querySelector('.account').href = 'account_detail.html';
}