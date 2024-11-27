const apiKey = 'AIzaSyCmaMob8vYKP_2BGuktE2QRKMEKxYxfZ9M';

// Get the topic from the query string
const page = window.location.pathname.split('/').pop();
const topic = page.includes('bestsellers') ? 'best sellers' : 'recent';

// Function to fetch all books for a specific topic
async function fetchAllBooksByTopic(topic) {

    let query;

    switch (topic) {
        case 'recent':
            query = 'subject:fiction&orderBy=newest'; // New books
            break;
        case 'best sellers':
            query = 'subject:fiction&orderBy=relevance'; // Best sellers
            break;
        default:
            query = 'subject:books'; // Fallback to general books
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=24`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayAllBooks(data.items);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Function to display all books
function displayAllBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = ''; // Clear the container

    books.forEach(book => {
        const title = book.volumeInfo.title || 'No Title';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'default-cover.jpg';
        let price = (Math.random() * 30 + 10).toFixed(2);

        if (!book.volumeInfo.imageLinks) return;

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

        bookCard.querySelector('.view-details').addEventListener('click', () => {
            window.location.href = `bookdetails.html?id=${book.id}`;
        });

        container.appendChild(bookCard);
    });
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

// Fetch all books for the selected topic
fetchAllBooksByTopic(topic);
