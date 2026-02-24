
import React from 'react';
import { RussianLetter, Category } from '../types';

interface LetterCardProps {
  letter: RussianLetter;
  onClick: (letter: RussianLetter) => void;
}

const LetterCard: React.FC<LetterCardProps> = ({ letter, onClick }) => {
  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.VOWELS: return 'bg-red-50 border-red-200 text-red-700';
      case Category.CONSONANTS: return 'bg-blue-50 border-blue-200 text-blue-700';
      case Category.SIGNS: return 'bg-gray-50 border-gray-200 text-gray-700';
      default: return 'bg-white border-gray-100';
    }
  };

  return (
    <div
      onClick={() => onClick(letter)}
      className={`
        ${getCategoryColor(letter.category)}
        flex flex-col items-center justify-center p-4 rounded-xl border
        cursor-pointer transition-all duration-200 
        hover:shadow-md hover:-translate-y-1 active:scale-95
        aspect-square
      `}
    >
      <div className="text-3xl font-bold mb-1">
        {letter.uppercase}{letter.lowercase}
      </div>
      <div className="ipa-font text-xs font-medium opacity-70">
        {letter.nameIpa}
      </div>
    </div>
  );
};

export default LetterCard;
