const fs = require('fs');

function findBookmarksFile(directory) {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const bookmarksFile = files.find(file => file.toLowerCase().includes('bookmarks.html'));
                if (bookmarksFile) {
                    resolve(bookmarksFile);
                } else {
                    reject(new Error('Bookmarks file not found in the specified directory.'));
                }
            }
        });
    });
}

module.exports = findBookmarksFile;