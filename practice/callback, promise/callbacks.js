var books = [
  { title: "book1", author: "auth1" },
  { title: "book2", author: "auth2" },
];


function createBook(book, callback) {
  setTimeout(() => {
    books.push(book);
    console.log("book created");
    callback();
  }, 10000);
}

function printBooks() {
  setTimeout(() => {
    let output = "";
    books.forEach((book) => (output += `<li>${book.title}</li>`));
    document.body.innerHTML = output;
    console.log("printed'em books");
  }, 5000);
}

createBook({ title: "book3", author: "auth3" }, printBooks);