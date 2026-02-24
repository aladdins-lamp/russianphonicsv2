
import React from 'react';
import { PhonicsRule, Language } from '../types';
import { UI_TRANSLATIONS } from '../translations';

interface RuleCardProps {
  rule: PhonicsRule;
  language: Language;
  onClick: (rule: PhonicsRule) => void;
}

const RuleCard: React.FC<RuleCardProps> = ({ rule, language, onClick }) => {
  const t = UI_TRANSLATIONS[language];
  return (
    <div
      onClick={() => onClick(rule)}
      className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-indigo-300"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">{t[rule.category] || rule.category}</span>
        <i className="fas fa-chevron-right text-gray-300 text-sm"></i>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {language === 'zh' ? rule.titleZh : rule.title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2">
        {language === 'zh' ? rule.descriptionZh : rule.description}
      </p>
    </div>
  );
};

export default RuleCard;
