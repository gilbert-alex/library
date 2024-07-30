// refactoring to classes


class Book {
    constructor(details) {
        this.title = details.title;
        this.author = details.author;
        this.pageCount = details.pageCount;
        this.haveRead = details.haveRead;
    }
}

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


// DOM element selection
const add = document.querySelector('.add');
const dialog = document.querySelector('dialog');
const form = dialog.querySelector('form');
const close = document.getElementById('close');
const cancel = document.getElementById('cancel');

// Event listeners
add.addEventListener('click', () => {
    dialog.showModal();
})

close.addEventListener('click', () => {
    const inputs = dialog.querySelectorAll(
        'input[type=text], input[type=number], input[name="haveRead"]:checked'
    );

    let userInput = {};
    inputs.forEach((i) => {userInput[i.name] = i.value;});

    closeDialog();

    // currently unused
    // use this in future developments when userInput is needed outside this block
    dialog.returnValue = JSON.stringify(userInput);

    // to do: use this after validation 
    const newBook = new Book(userInput);
    myLibrary.add(newBook);
    myLibrary.view();
    
})

dialog.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDialog();
    }
});

cancel.addEventListener('click', () => {
    closeDialog();
});


// Helper functions
function closeDialog() {
    dialog.close();
    form.reset();
}






// demo purposes
const book_1 = new Book({
    title:'eloquent javascript',
    author: 'marijn haverbeke',
    pageCount: 450,
    haveRead: 'n'
});

const book_2 = new Book({
    title: 'some super long name to test wrapping',
    author: 'a weirdly long long long name',
    pageCount: 5,
    haveRead: 'y'
});

const book_3 = new Book({
    title: 'a confederacy of dunces',
    author: 'john kennedy toole',
    pageCount: 300,
    haveRead: 'y'
});

const myLibrary = new Library;

myLibrary.add(book_1);
myLibrary.add(book_2);
myLibrary.add(book_3);

myLibrary.view();