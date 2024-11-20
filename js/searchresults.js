const apiKey = 'AIzaSyAy7iytND3I26lF3HnPGqWxqY27HaB-fv4';

// Get the search query from the URL
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('query');

// Function to fetch search results
async function fetchSearchResults(query) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=24`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            displaySearchResults(data.items);
        } else {
            document.getElementById('search-results-container').innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

// Function to display search results
function displaySearchResults(books) {
    const container = document.getElementById('search-results-container');
    container.innerHTML = ''; // Clear previous results

    books.forEach(book => {
        const title = book.volumeInfo.title || 'No Title';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'default-cover.jpg';

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <h3 class="book-name">${title}</h3>
            <h4 class="author-name">${authors}</h4>
            <button>Add to Cart</button>
            <button class="view-details">View Details</button>
        `;

        bookCard.querySelector('.view-details').addEventListener('click', () => {
            window.location.href = `book.html?id=${book.id}`;
        });

        container.appendChild(bookCard);
    });
}

// Fetch search results on page load
fetchSearchResults(searchQuery);
