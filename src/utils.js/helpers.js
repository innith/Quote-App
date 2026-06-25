// src/utils/helpers.js

export const generateRandomColor = () => {
  return {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
  };
};

export const generateRandomPosition = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const maxLeft = windowWidth - 650;
  const maxTop = windowHeight - 300;

  const randomLeft = Math.random() * maxLeft;
  const randomTop = Math.random() * maxTop;

  return {
    left: Math.max(20, randomLeft),
    top: Math.max(20, randomTop),
  };
};