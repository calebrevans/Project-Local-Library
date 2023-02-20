function findAuthorById(authors, authorId) {
  return authors.find((author) => author.id === authorId);
}


function findBookById(books, id) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      return books[i];
    }
  }
}


function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = books.filter((book) => !book.borrows[0].returned);
  const returnedBooks = books.filter((book) => book.borrows[0].returned);
  return [checkedOutBooks, returnedBooks];
}


function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = [];
  let count = 0;
  for (let i = 0; i < borrows.length && count < 10; i++) {
    const borrow = borrows[i];
    const account = findAccountById(accounts, borrow.id);
    if (account) {
      result.push({ ...borrow, ...account });
      count++;
    }
  }
  return result;
}

function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
