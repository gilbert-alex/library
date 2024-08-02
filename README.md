# Library

## Summary

A static page to collect details on a book and store within a library. Created as part of The Odin Project and full details can be found [here](https://www.theodinproject.com/lessons/node-path-javascript-library).

## Usage

Click 'New Book' to open a modal where book details may be entered. 'Add to Library' will close the modal and add the new book to the table. 'Cancel' or pressing Esc will close the modal without adding the new book.

Various data validations are included in JS. Some extend the html input element built-in checks while others extend the validations.

Each book entry on the library will have a button to delete itself and to change the read status.

Initially existing books are added directly to the script for demo purposes.

## Discussion of Code and Concepts Used

This project originally used constructor functions to create Book and Library objects. Each had methods added to their prototype. 

Later, the same code was refactored into classes. All functionality that adjusts html elements has been wrapped in an IIFE called screenController.

Functional JS style (i.e. .reduce(), .map(), and .filter()) has been added at various points in the ScreenController IIFE. These improve readability and performance over literal declarations and more explicit loops. 

To maintain encapsulation, interactions with the DOM has been isolated from code that modifies the Book and Library objects. 

Simple regex patters are used to, in part, validate the form input values prior to creating a new Book object. 
