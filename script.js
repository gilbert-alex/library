
// Book constructor and attributes
function Book(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
    this.shelfID = '';
}

// object method prototypes
Book.prototype.logBio = function() {
    console.log(`${this.title} by ${this.author}.`);
};

Book.prototype.putOnShelf = function(library) {
    library.push({
        title : this.title,
        author : this.author,
        pageCount : this.pageCount,
        haveRead : this.haveRead
    }
    );
}

// Library functions
const viewLibrary = function(library) {
    let tableBody = document.querySelector('.library>tbody');

    // empty dom element before refilling
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.lastChild);
    }
    
    library.forEach(
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

// global variable
const myLibrary = [];

// add books
const book_1 = new Book('eloquent javascript', 'marijn haverbeke', 450, 'n');
book_1.putOnShelf(myLibrary);

const book_2 = new Book('some super long name to test wrapping', 'a weirdly long long long name', 5, 'y');
book_2.putOnShelf(myLibrary);

const book_3 = new Book('a confederacy of dunces', 'toole', 300, 'y');
book_3.putOnShelf(myLibrary);

// fill table for debug
viewLibrary(myLibrary);
