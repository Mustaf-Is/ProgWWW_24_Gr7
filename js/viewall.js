const apiKey = 'AIzaSyCyjJG0UWPZQyeQcIf-nmveY7Etb2J3CV4';

const page = window.location.pathname.split('/').pop();
const topic = page.includes('newbooks') ? 'new' :
    page.includes('bestsellers') ? 'best-sellers'
        : page.includes('books-of-the-week') ? 'books-the-of-week'
            : page.includes('special-offers') ? 'special-offers'
                : page.includes('topsales') ? 'top-sales'
                    : 'all-books';


async function fetchAllBooksByTopic(topic) {

    let query;

    switch (topic) {
        case 'new':
            query = 'published:2024&orderBy=newest'; 
            break;
        case 'best-sellers':
            query = 'new+york+times+bestseller'; 
            break;
        case 'books-of-the-week':
            query = 'notable+books+rating+2024&orderBy=relevance';
            break;
        case 'special-offers':
            query = 'subject:computer_science&orderBy=relevance';
            break;
        case 'top-sales':
            query = 'subject:fiction&orderBy=relevance';
            break;
        default:
            query = 'subject:books';
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

function displayAllBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = ''; 

    books.forEach(book => {
        const title = book.volumeInfo.title || 'No Title';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'default-cover.jpg';
        const description = book.volumeInfo.description || 'No Description';
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

        bookCard.querySelector('.cart button').addEventListener('click', () => {
            const bookData = {
                id: book.id,
                title: title,
                author: authors,
                price: price,
                thumbnail: thumbnail
            };

            const result = addToCart(bookData);
            alert(result.message);
        });

        bookCard.querySelector('.favorite').addEventListener('click', (e) => {
            const bookData = {
                id: book.id,
                title: title,
                author: authors,
                thumbnail: thumbnail
            };

            const result = toggleFavorite(bookData);
            const favoriteBtn = e.currentTarget;

            if (result.action === 'added') {
                favoriteBtn.classList.add('active');
                favoriteBtn.querySelector('img').style.filter = 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg)';
            } else {
                favoriteBtn.classList.remove('active');
                favoriteBtn.querySelector('img').style.filter = 'none';
            }
        });

        container.appendChild(bookCard);
    });
}
function handleSearch(event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input').value.trim();
    if (searchInput) {

        window.location.href = `/pages/search-results.html?query=${encodeURIComponent(searchInput)}`;
    }
}

fetchAllBooksByTopic(topic);
