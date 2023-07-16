const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const req_isbn = req.params.isbn
  return res.send(books[req_isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  let author = req.params.author
  let keys = Object.keys(books)
  let book = "No books by the author have been found."
  keys.forEach((key) => {
    if (books[key].author === author) {
      book = books[key]
    }
  })
  return res.send(book);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title
  let keys = Object.keys(books)
  let book = "No books by the author have been found."
  keys.forEach((key) => {
    if (books[key].title === title) {
      book = books[key]
    }
  })
  return res.send(book);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
