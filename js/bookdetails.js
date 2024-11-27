const apiKey = 'AIzaSyAy7iytND3I26lF3HnPGqWxqY27HaB-fv4';

// Get the book ID from the query string
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

// Function to fetch and display the book details
async function fetchBookDetails() {
    if (!bookId) {
        document.getElementById('book-details').innerHTML = '<p>Book not found.</p>';
        return;
    }

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
        const book = await response.json();

        const { title, authors, description, imageLinks } = book.volumeInfo;

        const bookDetails = document.getElementById('book-details');
        bookDetails.innerHTML = `
            <img src="${imageLinks?.thumbnail || 'default-cover.jpg'}" alt="${title}">
            <h1>${title}</h1>
            <h2>${authors ? authors.join(', ') : 'Unknown Author'}</h2>
            <p>${description}</p>
            <div class="cart">
                <button>Add to Cart</button>
                <button>Buy Now</button>
            </div>
        `;

        fetchSimilarBooks(title); // Fetch and display similar books
    } catch (error) {
        console.error('Error fetching book details:', error);
        document.getElementById('book-details').innerHTML = '<p>Failed to load book details.</p>';
    }
}

// Function to fetch and display similar books
async function fetchSimilarBooks(query) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
        const data = await response.json();

        const booksContainer = document.querySelector('#similar-books .books');
        booksContainer.innerHTML = '';

        data.items.forEach(book => {
            const title = book.volumeInfo.title || 'No Title';
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
            const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'default-cover.jpg';
            let price = (Math.random() * 30 + 10).toFixed(2);

            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
            <div class="thumbnail">
                <div class="card view-details">
                    <div class="front-card">
                        <img src="${thumbnail}" alt="${title}">
                    </div>
                    <div class="back-card">
                        <a class="view-details">View Details</a>
                        <ul class="animated-books">
                            <li><img src="../assets/svgs/book-open.svg" /> </li>
                            <li><img src="../assets/svgs/book-open.svg" /></li>
                            <li><img src="../assets/svgs/book-closed.svg" /></li>
                            <li><img src="../assets/svgs/book-closed.svg" /></li>
                            <li><img src="../assets/svgs/book-closed.svg" /></li>
                            <li><img src="../assets/svgs/book-open.svg" /></li>
                            <li><img src="../assets/svgs/book-open.svg" /> </li>
                            <li><img src="../assets/svgs/book-open.svg" /></li>
                            <li><img src="../assets/svgs/book-closed.svg" /></li>
                            <li><img src="../assets/svgs/book-closed.svg" /></li>
                            <li><img src="../assets/svgs/book-closed.svg" /></li>
                            <li><img src="../assets/svgs/book-open.svg" /></li>
                        </ul>
                    </div>
                </div>
            </div> 
            <div class="info">   
                <a class="view-details">
                    <h3 class="book-name">${title}</h3>
                </a>
                <h4 class="author-name">${authors}</h4>
                <p>${price} $</p>
            </div>
            <div class="cart">    
                <button>Add to Cart</button>
                <button class="favorite"><img src="../assets/svgs/favorite.svg" /></button>
            </div>  
            `;

            booksContainer.appendChild(bookCard);
        });
    } catch (error) {
        console.error('Error fetching similar books:', error);
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

document.getElementById('search-form').addEventListener('submit', handleSearch);


// Fetch and display the book details on page load
fetchBookDetails();
