// src/services/api.js

export const fetchQuoteAndImage = async () => {
  try {
    // 1. Fetch Quote
    const quoteResponse = await fetch('https://dummyjson.com/quotes/random');
    const quoteData = await quoteResponse.json();

    // 2. Fetch Image based on Author
    const unsplashKey = process.env.REACT_APP_UNSPLASH_KEY || '';
    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(quoteData.author)}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${unsplashKey}`,
        },
      }
    );
    const imageData = await imageResponse.json();

    // 3. Extract Image URL safely
    let imageUrl = '';
    if (imageData?.results?.length > 0) {
      imageUrl = imageData.results[0].urls.regular;
    }

    return {
      content: quoteData.quote,
      author: quoteData.author,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error('Error fetching quote and image:', error);
    throw error;
  }
};