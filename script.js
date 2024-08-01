

// objects
// ============================================================================

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

    removeBook(index) {
        this.#books.splice(index, 1);
    }

    changeHasRead(index) {
        this.#books[index].hasRead = this.#books[index].hasRead === 'y' ? 'n' : 'y';
    }
}


// HTML Interaction
// ============================================================================

const ScreenController = (function () {
    // add books into html table and give btn functionality
    // contained as an IIFE which is defined and immediately called

    // main page html table
    let tableBody = document.querySelector('.library>tbody');
    // modal elements
    const newBookBtn = document.querySelector('.new-book');
    const newBookModal = document.querySelector('dialog');
    const newBookForm = newBookModal.querySelector('form');
    const addToLibBtn = document.getElementById('add');
    const cancelBtn = document.getElementById('cancel');


    // init Library object in this scope
    const lib = new Library();


    // demo purposes
    // ====================================================

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

    lib.addBook(book1);
    lib.addBook(book2);

    // ====================================================


    // table
    // ====================================================

    const updateView = () => {
    
        // empty table of any existing books
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.lastChild);
        }

        // add new row for each book
        books.map((book, index) => { 
    
                let newRow = document.createElement('tr');

                // add each Book prop
                ['title', 'author', 'pages', 'hasRead'].forEach(detail => {
                    const cell = document.createElement('td');
                    cell.textContent = book[detail];
                    newRow.appendChild(cell);
                });
    
                // create new btns
                let delCell = document.createElement('td');
                let delBtn = document.createElement('button');
                // label it 
                delBtn.textContent = 'Delete';
                // add arr index to the html element
                delBtn.dataset.index = index;
                // put new btn inside new cell
                delCell.appendChild(delBtn);
                // add to new row
                newRow.appendChild(delCell);
    
                // same logic as delBtn above
                let chgCell = document.createElement('td');
                let chgBtn = document.createElement('button');
                chgBtn.textContent = 'Change';
                chgBtn.dataset.index = index;
                chgCell.appendChild(chgBtn);
                newRow.appendChild(chgCell);
    
                tableBody.appendChild(newRow);
            });
    }


    const attachEventHandlers = () => {
        // leverage event propagation to capture all buttons in table body
        // includes both Delete and Change btns

        tableBody.addEventListener('click', e => {
            const target = e.target;
            const index = target.dataset.index;

            if (target.textContent === 'Delete') {
                lib.removeBook(index);
            } else if ( target.textContent === 'Change') {
                console.log(`index:${index}: changeBtnEvent`);
                lib.changeHasRead(index);
            }

            // get current state of Library.#books
            books = lib.getBooks();

            // refresh table
            updateView();
        });
    }


    // Interactivity with the New Book modal
    // ====================================================

    newBookBtn.addEventListener('click', () => {
        // open New Book menu
        newBookModal.showModal();
    })
    
    addToLibBtn.addEventListener('click', () => {
        // add new book to library
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

        lib.addBook(newBook);
        books = lib.getBooks();
        updateView();
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


    // init view
    let books = lib.getBooks();
    updateView();
    attachEventHandlers();
})();



