/*

import React, { useState, useEffect } from 'react';
import './App.css';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_KEY,
});

function App() {
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [authorImage, setAuthorImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [contentPosition, setContentPosition] = useState({ left: 0, top: 0 });
  const [bodyColor, setBodyColor] = useState({ r: 0, g: 0, b: 0 });

  const fetchQuoteAndImage = async () => {
    try {
      const quoteResponse = await fetch('https://dummyjson.com/quotes/random');
      const quoteData = await quoteResponse.json();

      setQuote({ content: quoteData.quote, author: quoteData.author });


      const imageResponse = await unsplash.search.getPhotos({
        query: quoteData.author,
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
  // const fetchQuoteAndImage = async () => {
  //   try {
  //     const quoteResponse = await fetch('https://zenquotes.io/api/random');
  //     const quoteData = await quoteResponse.json();
  //     setQuote({ content: quoteData.q, author: quoteData.a });

  //     const authorName = quoteData.a
  //     const imageResponse = await unsplash.search.getPhotos({
  //       query: authorName,
  //       perPage: 1,
  //     });
  //     if (imageResponse.response.results.length > 0) {
  //       const imageUrl = imageResponse.response.results[0].urls.regular;
  //       setAuthorImage(imageUrl);
  //     } else {
  //       setAuthorImage('');
  //     }

  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching quote and image:', error);
  //   }
  // };

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
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <div
        className="quote-container"
        style={{
          backgroundColor: `rgb(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b},0.4)`,
          backdropFilter: 'blur(12px)',
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
          style={{ backgroundColor: `rgb(${255 - bodyColor.r}, ${255 - bodyColor.g}, ${255 - bodyColor.b},0.5)` }} >Get Another Quote</button>
      </div>
    </div>
  );
}

export default App;
*/

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

import QuoteCard from './components/QuoteCard';
import { fetchQuoteAndImage } from './services/api';
import { generateRandomColor, generateRandomPosition } from './utils.js/helpers';

function App() {
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [authorImage, setAuthorImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [contentPosition, setContentPosition] = useState({ left: 0, top: 0 });
  const [bodyColor, setBodyColor] = useState({ r: 0, g: 0, b: 0 });

  const appRef = useRef(null);

  const loadNewQuote = async () => {
    setIsLoading(true);
    try {
      const data = await fetchQuoteAndImage();
      setQuote({ content: data.content, author: data.author });
      setAuthorImage(data.imageUrl);
    } catch (error) {
      console.error("Failed to load new quote.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    loadNewQuote();
    setContentPosition(generateRandomPosition());
    setBodyColor(generateRandomColor());
  };

  const handleDownload = async () => {
    if (!appRef.current) return;
    try {
      const canvas = await html2canvas(appRef.current, {
        useCORS: true,
        ignoreElements: (element) => element.classList.contains('no-capture'),
      });
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `quote-${quote.author.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  useEffect(() => {
    loadNewQuote();
  }, []);

  return (
    <div
      className="App"
      ref={appRef}
      style={{
        backgroundImage: authorImage && !isLoading ? `url(${authorImage})` : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <QuoteCard
        isLoading={isLoading}
        quote={quote}
        authorImage={authorImage}
        bodyColor={bodyColor}
        contentPosition={contentPosition}
        onNewQuote={handleButtonClick}
        onDownload={handleDownload}
      />
    </div>
  );
}

export default App;
