# Library

## Summary

A single page to collect details on a book and store within a library. Created as part of The Odin Project and full details can be found [here](https://www.theodinproject.com/lessons/node-path-javascript-library).

## Usage

Click 'New Book' to open a modal where book details may be entered. 'Add to Library' will close the modal and add the new book to the table. 'Cancel' or pressing Esc will close the modal without adding the new book. Each book entry on the library will have a button to delete itself and to change the read status.

## Discussion of Code and Concepts Used

This project originally used constructor functions to create Book and Library objects. Each had methods added to their prototype. Later, the same code was refactored into classes. All functionality that adjusts html elements have been wrapped in an IIFE called screenController.
