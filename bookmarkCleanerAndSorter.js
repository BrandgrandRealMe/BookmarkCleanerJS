const generateContent = require('./gemini');

const geminiApiKey = process.env.GEMINI_API_KEY; // Assuming you're using dotenv

function cleanAndSortBookmarks(htmlFile) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: htmlFile,
        success: (data) => {
          const soup = $(data);
          const bookmarks = [];
  
          soup.find('a').each(function() {
            const bookmark = {
              url: $(this).attr('href'),
              title: $(this).text().trim()
            };
            bookmarks.push(bookmark);
          });
  
          const promises = bookmarks.map(async (bookmark) => {
            try {
              const response = await generateContent(geminiApiKey, `What is the general topic of this website: ${bookmark.url}`)
              return {
                bookmark,
                category: response.data.response
              };
            } catch (error) {
              console.error('Error fetching category:', error);
              return {
                bookmark,
                category: 'Unknown'
              };
            }
          });
  
          Promise.all(promises)
            .then((results) => {
              const sortedBookmarks = results.sort((a, b) => a.category.localeCompare(b.category));
              resolve(sortedBookmarks);
            })
            .catch((error) => {
              reject(error);
            });
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

module.exports = cleanAndSortBookmarks;