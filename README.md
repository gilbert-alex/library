# Library

## Summary

A single page to collect details on a book and store within a library. Created as part of The Odin Project and full details can be found [here](https://www.theodinproject.com/lessons/node-path-javascript-library).

## Usage

Click 'New Book' to open a modal where book details may be entered. 'Add to Library' will close the modal and add the new book to the table. 'Cancel' or pressing Esc will close the modal without adding the new book. Each book entry on the library will have a button to delete itself and to change the read status.

## Discussion of Code and Concepts Used

This project originally used constructor functions to create Book and Library objects. Each had methods added to their prototype. Later, the same code was refactored into classes. 

## To-do
- Find a more eloquent execution of the updateWindow method. Currently the entire list is removed and replaced item-by-item. This is to enable an index value to attach the 'delete' and 'change' buttons to the Library books array. A solution could be to change the Library books attribute to an object with keys of the book titles. This would remove the need of specific index but would cause a problem for duplicate values. 
- Use the form element more fully. Include validations and the returnValue to pass a string back to to other code blocks. 

## Question
- Are private variables (i.e. Library.#books) truly private if the attributes can be assigned from the developer tools js console? Library.#books[0].#details.title = 'a different title' effectively modifies the object from outside the object methods. I understand that a private variable provides safeguards from executed js files but how can the state of an object be private from the browser console commands?
