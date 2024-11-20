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
            const { title, authors, imageLinks } = book.volumeInfo;

            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
            <img src="${imageLinks?.thumbnail || 'default-cover.jpg'}" alt="${title}">
            <h1>${title}</h1>
            <h2>${authors ? authors.join(', ') : 'Unknown Author'}</h2>
            <div class="cart">
                <button>Add to Cart</button>
                <button>Buy Now</button>
            </div>
            `;

            booksContainer.appendChild(bookCard);
        });
    } catch (error) {
        console.error('Error fetching similar books:', error);
    }
}

// Fetch and display the book details on page load
fetchBookDetails();
