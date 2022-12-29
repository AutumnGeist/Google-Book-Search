let url = 'https://www.googleapis.com/books/v1/volumes?q=';

window.onload = function() {
    document.getElementById('searchForm').addEventListener('submit', getBooks);
}

//GET request to Google Books API
const getBooks = async (e) => {
    e.preventDefault()

    try{
        let search = document.getElementById('search').value;
        const response = await fetch(url + search);

        if(response.ok) {
            const books = await response.json();
            console.log(books)
            let output = `<h2>Found Books:</h2>`
            //check if no books found
            if(books.totalItems === 0) {
                document.getElementById('output').innerHTML = "No Books Found";
            }else {
                //loop through response objects
                books.items.forEach((book) => {
                    output += `
                        <div class="book">
                            <div class="bookImg">
                                <img src=${book.volumeInfo.imageLinks.thumbnail} class="image">
                            </div>
                            <div class="bookInfo">
                                <h3>${book.volumeInfo.title}</h3>
                                <p><strong>Authors: </strong>${book.volumeInfo.authors}</p>
                                <p><strong>Publish Date: </strong>${book.volumeInfo.publishedDate}</p>
                                <p><strong>Categories: </strong>${book.volumeInfo.categories}</p>
                                <p><strong>Average Rating: </strong>${book.volumeInfo.averageRating}/5</p>
                                <p><strong>Description:</strong> ${book.volumeInfo.description}</p>
                            </div>
                        </div>
                    `
                })
                //display the list of found books
                document.getElementById('output').innerHTML = output;
                //clear the search box
                document.getElementById('search').value = '';
            }
            
        }
    }catch (error) {
        console.log(error);
    }
}