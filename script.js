// refactoring to classes
// including private variables with getters/setters

class Book {
    #details = {};

    constructor(title, author, pages, hasRead) {
        this.#details.title = title;
        this.#details.author = author;
        this.#details.pages = pages;
        this.#details.hasRead = hasRead;
    }

    get title() {
        console.log('title getter run');
        return this.#details.title;
    }

    set title(newTitle) {
        console.log('title setter run');
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
        this.#books.push(book);
    }

    listBooks() {
        return this.#books.map(book => book.getInfo());
    }

    updateWindow() {
        // drop books into html table and give btn functionality
        let tableBody = document.querySelector('.library>tbody');
    
        // empty table of any existing books
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.lastChild);
        }
        
        // to keep index of books in table for btn functionality
        let counter = 0;
    
        this.#books.map(book => { 
    
                let newRow = document.createElement('tr');
    
                let newTitle = document.createElement('td');
                newTitle.textContent = book.title;
                newRow.appendChild(newTitle);
    
                let newAuthor = document.createElement('td');
                newAuthor.textContent = book.author;
                newRow.appendChild(newAuthor);
    
                let newPages = document.createElement('td');
                newPages.textContent = book.pages;
                newRow.appendChild(newPages);
    
                let newHasRead = document.createElement('td');
                newHasRead.textContent = book.hasRead;
                newRow.appendChild(newHasRead);
    
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

    delete_handler() {
        // delete selected book and refresh view
        let btns = document.querySelectorAll('.delete');
    
        btns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
    
                // console.log(e.target.classList);  // debug
                let itemToRemove = e.target.classList[1];
                this.#books.splice(itemToRemove,1);
    
                // refresh library view after each button click
                // required to reset the id attributes
                this.updateWindow()
            });
        });
    };

    change_handler() {
        // toggle selected book's read (y/n) attribute
        let btns = document.querySelectorAll('.change');
    
        btns.forEach( (btn) => {
            btn.addEventListener('click', (e) => {
    
                let index = e.target.classList[1];
    
                if (this.#books[index].hasRead === 'y') {
                    this.#books[index].hasRead = 'n';
                } else {
                    this.#books[index].hasRead = 'y';
                };
                this.updateWindow();
            });
        });
    };
}


// DOM element selection
const addBtn = document.querySelector('.add');
const dialog = document.querySelector('dialog');
const form = dialog.querySelector('form');
const close = document.getElementById('close');
const cancel = document.getElementById('cancel');

// Event listeners
addBtn.addEventListener('click', () => {
    dialog.showModal();
})

close.addEventListener('click', () => {
    const inputs = dialog.querySelectorAll(
        'input[type=text], input[type=number], input[name="haveRead"]:checked'
    );

    let userInput = [];
    inputs.forEach(i => userInput.push(i.value));

    closeDialog();

    console.log(dialog.returnValue);
    console.log(typeof dialog.returnValue);
    // currently unused
    // use this in future developments when userInput is needed outside this block
    dialog.returnValue = JSON.stringify(userInput);

    // to do: use this after validation 
    const newBook = new Book(userInput[0], userInput[1], userInput[2], userInput[3]);
    myLibrary.addBook(newBook);
    myLibrary.updateWindow();
    
})

dialog.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDialog();
    }
});

cancel.addEventListener('click', () => {
    closeDialog();
});

function closeDialog() {
    dialog.close();
    form.reset();
}






// demo purposes
const book1 = new Book(
    'eloquent javascript', 
    'marijn haverbeke',
    450,
    'n'
);

const book2 = new Book(
    'some super long name to test wrapping',
    'a weirdly long long long name',
    5,
    'y'
);

const book3 = new Book(
    'a confederacy of dunces',
    'john kennedy toole',
    300,
    'y'
);

const myLibrary = new Library;

myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);

myLibrary.updateWindow();

// test
console.log(book1.getInfo());
console.log(typeof book1.getInfo());

console.log(myLibrary.listBooks());
