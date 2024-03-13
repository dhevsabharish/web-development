var books = [
  { title: "book1", author: "auth1" },
  { title: "book2", author: "auth2" },
];

function printBooks() {
  setTimeout(() => {
    let output = "";
    books.forEach((book) => (output += `<li>${book.title}</li>`));
    document.body.innerHTML = output;
  }, 1000);
}

function createBook(book) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      books.push(book);

      const error = false;

      if (!error) {
        resolve();
      } else {
        reject("Oops! Something went wrong!");
      }
    }, 2000);
  });
}

createBook({ title: "book3", author: "auth3" })
  .then(printBooks)
  .catch((err) => console.log(err));
