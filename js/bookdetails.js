const apiKey = 'AIzaSyCyjJG0UWPZQyeQcIf-nmveY7Etb2J3CV4';


const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');


async function fetchBookDetails() {
    if (!bookId) {
        document.getElementById('book-details').innerHTML = '<p>Book not found.</p>';
        return;
    }

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
        const book = await response.json();

        const title = book.volumeInfo.title || 'No Title';
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || 'default-cover.jpg'
        const publisher = book.volumeInfo.publisher || 'No Publisher';
        const publishedDate = book.volumeInfo.publishedDate || 'No Published Date';
        const pagCount = book.volumeInfo.pageCount || 'No Page Count';
        const categories = book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'No Categories';
        let price = (Math.random() * 40 + 10).toFixed(2); // Random price between 10 and 50
        // const description = truncateDescription(book.volumeInfo.description);
        const isbn = book.volumeInfo.industryIdentifiers?.[0]?.identifier || 'Not available';
        const languageMap = {
            'en': 'English',
            'fr': 'French',
            'es': 'Spanish',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'zh': 'Chinese',
            'ja': 'Japanese',
            'ar': 'Arabic',
            'hi': 'Hindi',
            'tr': 'Turkish',
            'nl': 'Dutch',
            'pl': 'Polish',
            'ko': 'Korean',
            'sv': 'Swedish'
        };
        const getLanguage = book.volumeInfo.language || 'Language not available';
        const language = languageMap[getLanguage] || 'Unknown Language';
        const bookDetails = document.getElementById('book-details');
        bookDetails.innerHTML = `
        <div class="wrapper">
            <div class="details-container">
                <div class="img-wrapper">
                    <img src="${thumbnail}" alt="${title}">
                </div>
                <div class="book-info">
                    <h1>${title}</h1>
                    <h3>${authors}</h3>
                    <h2>Description</h2>
                    <p class="description">${description}</p>
                    <p class="price">Price:<span> $${price} </span></p>
                    <div class="cart">
                        <button>Buy it Now</button>
                        <button class="add">Add to Cart</button>                        
                    </div>
                </div> 
            </div>
        </div>      
        `;
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
        <div class="wrapper">
            <div class="product-container">
                <h2>Product Details</h2>
                <div class="product-details">
                    <p>Price:<span> $${price} </span></p>
                    <p>ISBN:<span> ${isbn}</span></p>
                    <p>Publisher: <span> ${publisher}</span></p>
                    <p>Published Date:<span> ${publishedDate}</span></p>
                    <p>Pages:<span> ${pagCount}</span></p>
                    <p>Language:<span> ${language}</span></p>
                    <p>Category:<span> ${categories}</span></p>
                </div>
            </div>
        </div>
        `;

        fetchSimilarBooks(title); 
    } catch (error) {
        console.error('Error fetching book details:', error);
        document.getElementById('book-details').innerHTML = '<p>Failed to load book details.</p>';
    }
}

/*Truncate Function*/


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
            const description = book.volumeInfo.description || 'No Description';
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

            booksContainer.appendChild(bookCard);
        });
    } catch (error) {
        console.error('Error fetching similar books:', error);
    }
}
function handleSearch(event) {
    event.preventDefault(); 

    const searchInput = document.getElementById('search-input').value.trim();
    if (searchInput) {
        window.location.href = `/pages/search-results.html?query=${encodeURIComponent(searchInput)}`;
    }
}

fetchBookDetails();
