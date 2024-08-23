const fs = require('fs');
const findBookmarksFile = require('./findBookmarksFile');
const cleanAndSortBookmarks = require('./bookmarkCleanerAndSorter');
const isValidURL = require('./checkURL');

const bl = require("betterdevlogs");

const log = bl();

const NewBookmarks = [];
const directoryPath = './';
findBookmarksFile(directoryPath)
  .then(filename => {
    // ... use the filename to load the bookmarks file ...
    cleanAndSortBookmarks(filename)
      .then(cleanedBookmarks => {
        console.log(cleanedBookmarks);
        // ... process the cleaned bookmarks ...
        cleanedBookmarks.forEach(bookmark => {
          isValidURL(bookmark.url)
            .then(isValid => {
                NewBookmarks.push({
                    url: bookmark.url,
                    title: bookmark.title
                  });
                  
            })
            .catch(error => {
              log.error(error)
            });
        });
      })
      .catch(error => {
        log.error(error)
      });
  })
  .catch(error => {
    log.error(error)
  });
// ... after cleaning and sorting bookmarks ...
const newHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Sorted and Cleaned Bookmarks</title>
</head>
<body>
  <h1>Your Bookmarks</h1>
  <ul>
    ${NewBookmarks.map(bookmark => `<li><a href="${bookmark.url}">${bookmark.title}</a></li>`).join('')}
  </ul>
</body>
</html>
`;

fs.writeFile('sorted_bookmarks.html', newHtmlContent, (err) => {
  if (err) {
    log.error('Error writing new HTML file:', err);
  } else {
    log.info('New HTML file created successfully.');
  }
});