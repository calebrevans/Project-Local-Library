function getTotalBooksCount(books) {
  return books.length;
}


function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books) {
  let count = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows[0].returned === false) {
      count++;
    }
  }
  return count;
}


function getMostCommonGenres(books) {
  const genres = books.reduce((acc, { genre }) => {
    acc[genre] = acc[genre] ? acc[genre] + 1 : 1;
    return acc;
  }, {});

  const result = [];
  for (let genre in genres) {
    result.push({ name: genre, count: genres[genre] });
  }

  result.sort((genreA, genreB) => genreB.count - genreA.count);
  if (result.length > 5) {
    result.length = 5;
  }
  return result;
}


function getMostPopularBooks(books) {
  const count = books.reduce((acc, { title, borrows }) => {
    acc[title] = borrows.length;
    return acc;
  }, {});

  const sorted = Object.keys(count).sort((a, b) => count[b] - count[a]);

  const result = [];
  for (let i = 0; i < sorted.length && i < 5; i++) {
    const title = sorted[i];
    result.push({ name: title, count: count[title] });
  }
  
  return result;
}

function getMostPopularAuthors(books, authors) {
  const count = {};
  for (const book of books) {
    const { authorId, borrows } = book;
    const author = authors.find(author => author.id === authorId);
    const name = `${author.name.first} ${author.name.last}`;
    count[name] ? (count[name] += borrows.length) : (count[name] = borrows.length);
  }
  return Object.entries(count)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
