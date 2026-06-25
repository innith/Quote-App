import React from 'react';

const QuoteCard = ({
  isLoading,
  quote,
  authorImage,
  bodyColor,
  contentPosition,
  onNewQuote,
  onDownload
}) => {
  // Calculate the complementary (opposite) color for the highlighter
  const highlightColor = `rgba(${255 - bodyColor.r}, ${255 - bodyColor.g}, ${255 - bodyColor.b}, 0.7)`;

  return (
    <div
      className="quote-container"
      style={{
        backgroundColor: `rgba(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b}, 0.5)`,
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        position: 'absolute',
        left: `${contentPosition.left}px`,
        top: `${contentPosition.top}px`,
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      {!isLoading && authorImage && (
        <blockquote>
          { }
          <p style={{ lineHeight: '1.8', margin: '0 0 15px 0' }}>
            <span style={{
              backgroundColor: highlightColor,
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '4px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              "{quote.content}"
            </span>
          </p>
          <footer style={{ lineHeight: '1.8' }}>
            <span style={{
              backgroundColor: highlightColor,
              color: '#fff',
              padding: '2px 6px',
              borderRadius: '4px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              - {quote.author}
            </span>
          </footer>
        </blockquote>
      )}

      <div className="no-capture" style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
        <button
          onClick={onNewQuote}
          style={{
            backgroundColor: `rgba(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b}, 0.8)`,
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          Get Another Quote
        </button>

        <button
          onClick={onDownload}
          style={{
            backgroundColor: `rgba(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b}, 0.8)`,
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          Save as Image
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;