const apiKey = 'AIzaSyCmaMob8vYKP_2BGuktE2QRKMEKxYxfZ9M'; // Replace with your API key

// Function to fetch books by topic
async function fetchBooksByTopic(topic) {
    let query;

    switch (topic) {
        case 'new':
            query = 'subject:fiction&orderBy=newest'; // New books
            break;
        case 'best-sellers':
            query = 'subject:fiction&orderBy=relevance'; // Best sellers
            break;
        default:
            query = 'subject:books'; // Fallback to general books
    }


    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=24  `;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayBooks(data.items, topic);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Function to display books in their respective sections
function displayBooks(books, topic) {
    const containerId = topic === 'new' ? 'new-books-container' : 'best-sellers-container';
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear the container

    let validBooks = books.filter(book => book.volumeInfo.imageLinks?.thumbnail);

    let shuffledBooks = validBooks.sort(() => Math.random());

    let limitedBooks = shuffledBooks.slice(0, 6);

    limitedBooks.forEach(book => {
        const title = book.volumeInfo.title || 'No Title';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        let thumbnail = book.volumeInfo.imageLinks.thumbnail;
        let price = (Math.random() * 40 + 10).toFixed(2); // Random price between 10 and 50
        let description = book.volumeInfo.description;

        if (!description) return;

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <div class="thumbnail">
                <div class="card">
                    <div class="front-card">
                        <img src="${thumbnail}" alt="${title}">
                    </div>
                    <div class="back-card">
                        <a class="view-details">View Details</a>
                    </div>
                </div>
            </div> 
            <div class="info">   
                <h3 class="book-name">${title}</h3>
                <h4 class="author-name">${authors}</h4>
                <p>${price} $</p>
            </div>
            <div class="cart">    
                <button>Add to Cart</button>
                <button class="favorite"><img src="../assets/svgs/favorite.svg" /></button>
            </div>    
        `;

        bookCard.querySelector('.thumbnail .view-details').addEventListener('click', () => {
            window.location.href = `/pages/bookdetails.html?id=${book.id}`;
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

fetchBooksByTopic('new');
fetchBooksByTopic('best-sellers');