"use client";

import { useState, useEffect } from "react";

interface TypewriterI {
	text: string;
	delay: number;
	infinite?: boolean;
}

const Typewriter = ({ text, delay, infinite }: TypewriterI) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      setCurrentIndex(0);
      setCurrentText('');
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  const formattedText = {
    __html: currentText.replace(/Pandora/g, '<span class="text-[#8A05BE]">Pandora</span>'),
  };

  return <span dangerouslySetInnerHTML={formattedText} />;
};

export default Typewriter;
