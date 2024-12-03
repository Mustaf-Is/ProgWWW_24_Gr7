const apiKey = 'AIzaSyC49N1ngGnHoVJbZzjzZeyfsjeTCsB5Xi8';

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
        const description = book.volumeInfo.description || 'No Description Available';
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
                        <div class="book-description">
                            <p>${description}</p>
                            <a class="view-details">View More</a>
                        </div>
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
                <a class="view-details" href="bookdetails.html?id=${book.id}">
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

// Fetch search results on page load
fetchSearchResults(searchQuery);
