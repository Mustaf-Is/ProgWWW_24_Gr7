const apiKey = 'AIzaSyC49N1ngGnHoVJbZzjzZeyfsjeTCsB5Xi8'; // Replace with your API key

// Function to fetch books by topic
async function fetchBooksByTopic(topic) {
    let query;

    switch (topic) {
        case 'new':
            query = 'published:2024&orderBy=newest'; // New books
            break;  
        case 'best-sellers':
            query = 'new+york+times+bestseller'; // Best sellers
            break;
        case 'books-of-the-week':
            query = 'notable+books+rating+2024&orderBy=relevance';
            break;
        case 'special-offers':
            query = 'subject:computer_science&orderBy=relevance';
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
    let container;
    switch (topic) {
        case 'new':
            container = document.getElementById('new-books-container');
            break;
        case 'best-sellers':
            container = document.getElementById('best-sellers-container');
            break;   
        case 'books-of-the-week':
            displayBooksOfTheWeek(books.slice(0, 3), topic);
            break;
        case 'special-offers':
            container = document.getElementById('special-offers-container');
            break;
        default:
            container = document.getElementById('all-books-container');
        container.innerHTML = '';
    }
    

    let validBooks = books.filter(book => book.volumeInfo.imageLinks?.thumbnail);

    let shuffledBooks = validBooks.sort(() => Math.random());

    let limitedBooks = shuffledBooks.slice(0, 6);

    limitedBooks.forEach(book => {
        const title = book.volumeInfo.title || 'No Title';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const thumbnail = book.volumeInfo.imageLinks.thumbnail;
        let price = (Math.random() * 40 + 10).toFixed(2); // Random price between 10 and 50
        const description = book.volumeInfo.description;

        if (!description) return;

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
                <a class="view-details" href="/pages/bookdetails.html?id=${book.id}">
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

        bookCard.querySelector('.view-details ').addEventListener('click', () => {
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
function displayBooksOfTheWeek(books, topic) {
    const container = document.getElementById('books-of-the-week-container');
    container.innerHTML = '';

    let validBooks = books.filter(book => book.volumeInfo.imageLinks?.thumbnail);
    let limitedBooks = validBooks.slice(0, 3); // Limit to exactly 3 books

    limitedBooks.forEach(book => {
        const title = book.volumeInfo.title || 'No Title';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const thumbnail = book.volumeInfo.imageLinks.thumbnail;
        let price = (Math.random() * 40 + 10).toFixed(2);
        const description = book.volumeInfo.description;

        if (!description) return;

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
        `;

        bookCard.querySelector('.view-details').addEventListener('click', () => {
            window.location.href = `/pages/bookdetails.html?id=${book.id}`;
        });

        container.appendChild(bookCard);
    });
}


document.getElementById('search-form').addEventListener('submit', handleSearch);

fetchBooksByTopic('new');
fetchBooksByTopic('best-sellers');
fetchBooksByTopic('books-of-the-week');
fetchBooksByTopic('special-offers');