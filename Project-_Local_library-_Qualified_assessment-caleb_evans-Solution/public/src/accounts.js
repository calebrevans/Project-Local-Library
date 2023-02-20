function findAccountById(accounts, id) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === id) return accounts[i]
  }
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) =>
          nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : -1              
    )
}

function getTotalNumberOfBorrows(account, books) {
  let borrowsCount = 0;
  books.forEach(book => {
    borrowsCount += book.borrows.filter(borrow => borrow.id === account.id).length;
  });
  return borrowsCount;
}


function getBooksPossessedByAccount(account, books, authors) {
  const result = [];

  for (const book of books) {
    const { borrows } = book;

    const recentBorrow = borrows[0];
    const isBorrowed = !recentBorrow.returned;
    const isCheckedOutByAccount = recentBorrow.id === account.id;

    if (isBorrowed && isCheckedOutByAccount) {
      const author = authors.find(author => author.id === book.authorId);
      const bookWithAuthor = { ...book, author };
      result.push(bookWithAuthor);
    }
  }

  return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
