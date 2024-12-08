// Cart functions
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function addToCart(book) {
    const cart = getCartItems();
    const existingItem = cart.find(item => item.id === book.id);

    if (!existingItem) {
        cart.push({ ...book, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        return { success: true, message: 'Added to cart!' };
    } else if (existingItem.quantity <= 5) {
        existingItem.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        return { success: true, message: 'Quantity increased!' };
    }
    return { success: false, message: 'Maximum quantity reached!' };
}

// Favorites functions
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function toggleFavorite(book) {
    const favorites = getFavorites();
    const exists = favorites.some(item => item.id === book.id);

    if (!exists) {
        favorites.push(book);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return { success: true, message: 'Added to favorites!', action: 'added' };
    } else {
        const newFavorites = favorites.filter(item => item.id !== book.id);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return { success: true, message: 'Removed from favorites!', action: 'removed' };
    }
}
function handleSearch(event) {
    event.preventDefault(); // Prevent page reload on form submission

    const searchInput = document.getElementById('search-input').value.trim();
    if (searchInput) {
        // Redirect to search results page with query parameter
        window.location.href = `/pages/search-results.html?query=${encodeURIComponent(searchInput)}`;
    }
}



