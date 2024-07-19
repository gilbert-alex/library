
// Book constructor & prototypes
function Book(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
}

Book.prototype.logBio = function() {
    console.log(`${this.title} by ${this.author}.`);
};


// Library constructor & prototypes
function Library() {
    this.books = [];
}

Library.prototype.add = function(book) {
    this.books.push(book);
};

Library.prototype.view = function() {
    // drop books into html table and give btn functionality

    let tableBody = document.querySelector('.library>tbody');

    // empty table of any existing books
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.lastChild);
    }
    
    // to keep index of books in table for btn functionality
    let counter = 0;

    this.books.forEach( (book) => { 

            let newRow = document.createElement('tr');

            let newTitle = document.createElement('td');
            newTitle.textContent = book.title;
            newRow.appendChild(newTitle);

            let newAuthor = document.createElement('td');
            newAuthor.textContent = book.author;
            newRow.appendChild(newAuthor);

            let newPageCount = document.createElement('td');
            newPageCount.textContent = book.pageCount;
            newRow.appendChild(newPageCount);

            let newHaveRead = document.createElement('td');
            newHaveRead.textContent = book.haveRead;
            newRow.appendChild(newHaveRead);

            let delCell = document.createElement('td');
            let delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.classList = `delete ${counter}`;
            delCell.appendChild(delBtn);
            newRow.appendChild(delCell);

            let chgCell = document.createElement('td');
            let chgBtn = document.createElement('button');
            chgBtn.textContent = 'Change';
            chgBtn.classList = `change ${counter}`;
            chgCell.appendChild(chgBtn);
            newRow.appendChild(chgCell);

            tableBody.appendChild(newRow);

            counter++;
        }
    );

    // helper functions
    this.delete_handler();
    this.change_handler();
}

Library.prototype.delete_handler = function() {
    // delete selected book and refresh view
    let btns = document.querySelectorAll('.delete');

    btns.forEach( (btn) => {
        btn.addEventListener('click', (e) => {

            // console.log(e.target.classList);  // debug
            let itemToRemove = e.target.classList[1];
            this.books.splice(itemToRemove,1);

            // refresh library view after each button click
            // required to reset the id attributes
            this.view()
        });
    });
};

Library.prototype.change_handler = function() {
    // toggle selected book's read (y/n) attribute
    let btns = document.querySelectorAll('.change');

    btns.forEach( (btn) => {
        btn.addEventListener('click', (e) => {

            console.log(e.target.classList);
            let index = e.target.classList[1];

            if (this.books[index].haveRead === 'y') {
                this.books[index].haveRead = 'n';
            } else {
                this.books[index].haveRead = 'y';
            };
            this.view();
        });
    });
};

// Buttons
const newBook = document.querySelector('.add');
const dialog = document.querySelector('dialog');

newBook.addEventListener('click', () => {
    dialog.show();
})



// demo purposes
const book_1 = new Book('eloquent javascript', 'marijn haverbeke', 450, 'n');

const book_2 = new Book('some super long name to test wrapping', 'a weirdly long long long name', 5, 'y');

const book_3 = new Book('a confederacy of dunces', 'toole', 300, 'y');

const myLibrary = new Library;

myLibrary.add(book_1);
myLibrary.add(book_2);
myLibrary.add(book_3);

myLibrary.view();