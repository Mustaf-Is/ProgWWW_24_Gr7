const apiKey = 'AIzaSyC49N1ngGnHoVJbZzjzZeyfsjeTCsB5Xi8';


const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('query');


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


fetchSearchResults(searchQuery);
