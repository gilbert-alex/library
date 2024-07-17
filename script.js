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

    // empty dom element before refilling
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.lastChild);
    }
    
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

            let delCell = document.createElement('td');
            let delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delCell.appendChild(delBtn);
            tableRow.appendChild(delCell);

            let chgCell = document.createElement('td');
            let chgBtn = document.createElement('button');
            chgBtn.textContent = 'Change';
            chgCell.appendChild(chgBtn);
            tableRow.appendChild(chgCell);

            tableBody.appendChild(tableRow);
        }
    );
}

// add books
addBookToLibrary('Eloquent Javascript', 'Marijn Haverbeke', 450, 'N');
addBookToLibrary('some super long name to test wrapping', 'a weirdly long long long name', 5, 'Y');
addBookToLibrary('A Confederacy of Dunces', 'Toole', 300, 'Y');

// fill table for debug
viewLibrary()

