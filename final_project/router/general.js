const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let username = req.body.username
  let password = req.body.password

  if (username && password) {
    if (isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user, provide username and password."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books, null, 4));
});

// Get the book list / Async version for Task 10
public_users.get('/books', async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      resolve(res.send(JSON.stringify({ books }, null, 4)));
    });

    console.log("Promise for Task 10 resolved");

  } catch (error) {
    // Handle any potential errors here
    console.error(error);
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn
  return res.send(books[isbn])
 });
  
/*// Get book details based on author
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
*/

// Get book details based on author / ASYNC VERSION TASK 11
public_users.get('/author/:author', async (req, res) => {
  try {
    let author = req.params.author
    let keys = Object.keys(books)
    let book = "No books by the author have been found."
    keys.forEach((key) => {
      if (books[key].author === author) {
        book = books[key]
      }
    })
    await new Promise((resolve, reject) => {
      resolve(res.send(book));
    });
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
  }
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
  const isbn = req.params.isbn
  return res.send(books[isbn].reviews)
});

module.exports.general = public_users;
