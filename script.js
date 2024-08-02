
// Book and Library Objects
// ============================================================================

class Book {
    #details = {};

    constructor(title, author, pages, hasRead) {
        this.#details.title = title;
        this.#details.author = author;
        this.#details.pages = pages;
        this.#details.hasRead = hasRead;
    }

    // getters/setters
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

    // Returns each book's props as an object
    getInfo() {
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


    // Library table on main page
    // ====================================================

    // Update table view
    // Empty existing table and refill each book from from lib
    const updateView = () => {
    
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.lastChild);
        }

        books.map((book, index) => { 
    
                let newRow = document.createElement('tr');

                ['title', 'author', 'pages', 'hasRead'].forEach(detail => {
                    const cell = document.createElement('td');
                    cell.textContent = book[detail];
                    newRow.appendChild(cell);
                });
    
                let delCell = document.createElement('td');
                let delBtn = document.createElement('button');

                delBtn.textContent = 'Delete';
                delBtn.dataset.index = index;
                delCell.appendChild(delBtn);
                newRow.appendChild(delCell);
    
                let chgCell = document.createElement('td');
                let chgBtn = document.createElement('button');

                chgBtn.textContent = 'Change';
                chgBtn.dataset.index = index;
                chgCell.appendChild(chgBtn);
                newRow.appendChild(chgCell);
    
                tableBody.appendChild(newRow);
            });
    }

    // Functionality of Delete and Change btns on table
    // leverage event propagation to capture all buttons in table body
    // includes both Delete and Change btns
    const attachEventHandlers = () => {

        tableBody.addEventListener('click', e => {
            const target = e.target;
            const index = target.dataset.index;

            if (target.textContent === 'Delete') {
                // console.log(`index:${index}: deleteBtnEvent`);
                lib.removeBook(index);
            } else if ( target.textContent === 'Change') {
                // console.log(`index:${index}: changeBtnEvent`);
                lib.changeHasRead(index);
            }

            books = lib.getBooks();

            updateView();
        });
    }


    // Interactivity with the New Book modal
    // ====================================================

    // open New Book menu
    newBookBtn.addEventListener('click', () => {
        newBookModal.showModal();
    })
    
    // add new book to library
    addToLibBtn.addEventListener('click', () => {

        const selectors = [
            'input[type=text]',
            'input[type=number]',
            'input[name="hasRead"]:checked',
        ]

        let formValues = getFormInputValues(newBookForm, selectors);

        if (!validateFormInput(formValues)) {
            // terminate event listener if !validation
            return;
        }
    
        closeDialog();

        const newBook = new Book(
            formValues.title, 
            formValues.author, 
            formValues.pages, 
            formValues.hasRead
        );

        lib.addBook(newBook);
        books = lib.getBooks();
        updateView();
    })

    // Function to get form input values
    function getFormInputValues(modal, selectors) {
        const inputs = modal.querySelectorAll(selectors.join(', '));

        const i = {};
        inputs.forEach(input => i[input.name] = input.value);
        return i;
    }

    // Function to validate form inputs
    function validateFormInput(inputs) {

        if (!Object.values(inputs).every(input => input.trim() !== '')) {
            alert('Please fill out all fields');
            return false;
        } else if (inputs.title.length > 70) {
            alert('Title is limited to 70 characters.');
            return false;
        } else if (inputs.author.length > 50) {
            alert('Author is limited to 50 characters.');
            return false;
        } else if (!/^\d+$/.test(inputs.pages)) {
            alert('Pages must be a number.')
            return false;
        } else if (!Number(inputs.pages) > 0) {
            alert('Pages must be greater than zero')
            return false;
        } else if (/[#~<>]/.test(inputs.title)) {
            alert('Invalid characters in title');
            return false;
        } else {
            return true;
        }
    }
    
    // close the dialog by pressing ESC
    newBookModal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDialog();
        }
    })
    
    // close dialog with the provided cancel btn
    cancelBtn.addEventListener('click', () => {
        closeDialog();
    })
    
    // Function to close and reset the dialog
    function closeDialog() {
        newBookModal.close();
        newBookForm.reset();
    }

    // init view
    let books = lib.getBooks();
    updateView();
    attachEventHandlers();
})();