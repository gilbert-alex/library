const myLibrary = [];

function Book(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
}

function addBookToLibrary(title, author, pageCount, haveRead) {
    myLibrary.push(
        new Book(
            title, 
            author, 
            pageCount, 
            haveRead
        )
    );
}

function viewLibrary() {
    let tableBody = document.querySelector('.library>tbody');
    
    myLibrary.forEach(
        (book) => { 
            let tableRow = document.createElement('tr');

            let titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            tableRow.appendChild(titleCell);

            let authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            tableRow.appendChild(authorCell);

            let pagesCell = document.createElement('td');
            pagesCell.textContent = book.pageCount;
            tableRow.appendChild(pagesCell);

            let readCell = document.createElement('td');
            readCell.textContent = book.haveRead;
            tableRow.appendChild(readCell);

            tableBody.appendChild(tableRow);
        }
    );
}

// add books
addBookToLibrary('Eloquent Javascript', 'Marijn Haverbeke', 450, 'N');
addBookToLibrary('some super long name to test wrapping', 'a weirdly long long long name', 5, 'Y');

// fill table for debug
viewLibrary()

