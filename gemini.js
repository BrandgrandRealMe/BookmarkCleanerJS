function generateContent(apiKey, prompt) {
    const data = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };
  
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + apiKey;
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json());   
  
  }

  module.exports = generateContent;