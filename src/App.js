import React, { useState, useEffect } from 'react';
import './App.css';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: 'qKXPi6XEslk7ghkVwPPIfzTXJrMG1YaizhlA_GNw_1s',
});

function App() {
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [authorImage, setAuthorImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [contentPosition, setContentPosition] = useState({ left: 0, top: 0 });
  const [bodyColor, setBodyColor] = useState({ r: 0, g: 0, b: 0 });


  const fetchQuoteAndImage = async () => {
    try {
      const quoteResponse = await fetch('https://api.quotable.io/random');
      const quoteData = await quoteResponse.json();
      setQuote({ content: quoteData.content, author: quoteData.author });

      const authorName = quoteData.author;
      const imageResponse = await unsplash.search.getPhotos({
        query: authorName,
        perPage: 1,
      });
      if (imageResponse.response.results.length > 0) {
        const imageUrl = imageResponse.response.results[0].urls.regular;
        setAuthorImage(imageUrl);
      } else {
        setAuthorImage('');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quote and image:', error);
    }
  };

  const handleButtonClick = () => {
    fetchQuoteAndImage();
    moveContentRandomly();
    randomColor();
  };

  const moveContentRandomly = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const maxLeft = windowWidth - 600;
    const maxTop = windowHeight - 250;

    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;

    setContentPosition({ left: randomLeft, top: randomTop });
  };

  const randomColor = () => {
    const rVal = Math.floor(Math.random() * 255);
    const gVal = Math.floor(Math.random() * 255);
    const bVal = Math.floor(Math.random() * 255);
    setBodyColor({ r: rVal, g: gVal, b: bVal });
  };


  useEffect(() => {
    fetchQuoteAndImage();
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleButtonClick);

    return () => {
      window.removeEventListener('beforeunload', handleButtonClick);
    };
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: authorImage && !isLoading ? `url(${authorImage})` : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="quote-container"
        style={{
          backgroundColor: `rgb(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b},0.5)`,

          position: 'absolute',
          left: `${contentPosition.left}px`,
          top: `${contentPosition.top}px`,
        }}
      >
        {!isLoading && authorImage && (
          <blockquote>
            <p>{quote.content}</p>
            <footer>- {quote.author}</footer>
          </blockquote>
        )}
        <button onClick={handleButtonClick}
          style={{backgroundColor : `rgb(${255-bodyColor.r}, ${255-bodyColor.g}, ${255-bodyColor.b},0.5)`}} >Get Another Quote</button>
      </div>
    </div>
  );
}

export default App;
