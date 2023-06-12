import React, { useState, useEffect } from 'react';
import './TextSlider.css';

const TextSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    'The coldest temperature ever officially recorded was -89.2°C.',
    'A 2003 heatwave turned grapes to raisins before they were picked from the vine!',
    'Raindrops can be the size of a housefly and fall at more than 30kmph.',
    'Cape Farewell in Greenland is the windiest place on the planet.',
    'In July 2001, the rainfall in Kerala, India, was blood red!',
    'The most damage ever caused by a thunderstorm was in 1995 when hailstones bigger than cricket balls fell in Texas, USA.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="text-slider">
      <q>{slides[slideIndex]}</q>
    </div>
  );
};

export default TextSlider;
