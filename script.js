

class Book {
    #details = {};

    constructor(title, author, pages, hasRead) {
        this.#details.title = title;
        this.#details.author = author;
        this.#details.pages = pages;
        this.#details.hasRead = hasRead;
    }

    get title() {
        return this.#details.title;
    }

    set title(newTitle) {
        this.#details.title = newTitle;
    }

    get author() {
        return this.#details.author;
    }

    set author(newAuthor) {
        this.#details.author = newAuthor;
    }

    get pages() {
        return this.#details.pages;
    }

    set pages(newPages) {
        this.#details.pages = newPages;
    }

    get hasRead() {
        return this.#details.hasRead;
    }

    set hasRead(newHasRead) {
        this.#details.hasRead = newHasRead;
    }

    getInfo() {
        // access book details via getters
        return {
            title: this.title,
            author: this.author,
            pages: this.pages,
            hasRead: this.hasRead
        };
    }
}

class Library {
    #books = []; 

    addBook(book) {
        if (book instanceof Book) {
            this.#books.push(book);
        } else {
            console.log('Invalid book instance');
        }
    }

    getBooks() {
        return this.#books.map(book => book.getInfo());
    }

    updateView() {
        // drop books into html table and give btn functionality
        let tableBody = document.querySelector('.library>tbody');
    
        // empty table of any existing books
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.lastChild);
        }
        
        // add new row for each book
        this.#books.map((book, index) => { 
    
                let newRow = document.createElement('tr');

                ['title', 'author', 'pages', 'hasRead'].forEach(detail => {
                    const cell = document.createElement('td');
                    cell.textContent = book[detail];
                    newRow.appendChild(cell);
                })
    
                let delCell = document.createElement('td');
                let delBtn = document.createElement('button');
                delBtn.textContent = 'Delete';
                delBtn.classList += 'delete';
                delBtn.dataset.index = index;
                delCell.appendChild(delBtn);
                newRow.appendChild(delCell);
    
                let chgCell = document.createElement('td');
                let chgBtn = document.createElement('button');
                chgBtn.textContent = 'Change';
                chgBtn.classList += 'change';
                chgBtn.dataset.index = index;
                chgCell.appendChild(chgBtn);
                newRow.appendChild(chgCell);
    
                tableBody.appendChild(newRow);
            }
        );
        // helper functions
        this.deleteBtnHandler();
        this.changeBtnHandler();
    }

    deleteBtnHandler() {
        // delete selected book and refresh view
        let btns = document.querySelectorAll('.delete');
    
        btns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                this.#books.splice(e.target.dataset.index,1);
    
                // refresh library view after each button click
                // required to reset the id attributes
                this.updateView()
            });
        });
    };

    changeBtnHandler() {
        // toggle selected book's read (y/n) attribute
        let btns = document.querySelectorAll('.change');
    
        btns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
    
                let index = e.target.dataset.index;
    
                if (this.#books[index].hasRead === 'y') {
                    this.#books[index].hasRead = 'n';
                } else {
                    this.#books[index].hasRead = 'y';
                };
                this.updateView();
            });
        });
    };
}

// DOM element selection
const newBookBtn = document.querySelector('.new-book');
const newBookModal = document.querySelector('dialog');
const newBookForm = newBookModal.querySelector('form');
const addToLibBtn = document.getElementById('add');
const cancelBtn = document.getElementById('cancel');

// Event listeners
newBookBtn.addEventListener('click', () => {
    newBookModal.showModal();
})

addToLibBtn.addEventListener('click', () => {
    const inputs = newBookModal.querySelectorAll(
        'input[type=text], input[type=number], input[name="haveRead"]:checked'
    );

    let userInput = [];
    inputs.forEach(i => userInput.push(i.value));

    closeDialog();

    // currently unused
    // use this in future developments when userInput is needed outside this block
    newBookModal.returnValue = JSON.stringify(userInput);

    // to do: use this after validation 
    const newBook = new Book(userInput[0], userInput[1], userInput[2], userInput[3]);
    myLibrary.addBook(newBook);
    myLibrary.updateView();
    
})

newBookModal.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDialog();
    }
});

cancel.addEventListener('click', () => {
    closeDialog();
});

function closeDialog() {
    newBookModal.close();
    newBookForm.reset();
}






// demo purposes
const book1 = new Book(
    'eloquent javascript', 
    'marijn haverbeke',
    450,
    'n'
);

const book2 = new Book(
    'a confederacy of dunces',
    'john kennedy toole',
    300,
    'y'
);

const myLibrary = new Library;

myLibrary.addBook(book1);
myLibrary.addBook(book2);

myLibrary.updateView();