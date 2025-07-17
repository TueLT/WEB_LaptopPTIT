function resetLocalStorage(){
    localStorage.setItem('category', '');
    localStorage.setItem('brand', '');
    localStorage.setItem('state', '');
    localStorage.setItem('cpu', '');
    localStorage.setItem('vga', '');
    localStorage.setItem('ram', '');
    localStorage.setItem('ssd', '');
    localStorage.setItem('screenSize', '');
    localStorage.setItem('minPrice', 0);
    localStorage.setItem('maxPrice', 0);
    localStorage.setItem('sortBy', '');
    localStorage.setItem('sortOrder', '');
    localStorage.setItem('hidden', 'true');
}

resetLocalStorage();