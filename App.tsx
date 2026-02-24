
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ViewState, RussianLetter, PhonicsRule, Category, Language } from './types';
import { RUSSIAN_ALPHABET, PHONICS_RULES } from './constants';
import { UI_TRANSLATIONS } from './translations';
import LetterCard from './components/LetterCard';
import RuleCard from './components/RuleCard';
import AudioButton from './components/AudioButton';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedLetter, setSelectedLetter] = useState<RussianLetter | null>(null);
  const [selectedRule, setSelectedRule] = useState<PhonicsRule | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Reader specific states
  const [readerText, setReaderText] = useState('');
  const [processedSegments, setProcessedSegments] = useState<string[]>([]);
  const [showSpecialCharWarning, setShowSpecialCharWarning] = useState(false);

  const t = UI_TRANSLATIONS[language];

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const filteredAlphabet = useMemo(() => {
    if (activeCategory === 'All') return RUSSIAN_ALPHABET;
    return RUSSIAN_ALPHABET.filter(l => l.category === activeCategory);
  }, [activeCategory]);

  const handleLetterClick = (letter: RussianLetter) => {
    setSelectedLetter(letter);
    setView('letter-detail');
    window.scrollTo(0, 0);
  };

  const handleRuleClick = (rule: PhonicsRule) => {
    setSelectedRule(rule);
    setView('rule-detail');
    window.scrollTo(0, 0);
  };

  // Logic to process text: filter disallowed chars and segments
  const processInput = (input: string) => {
    // Allowed: Russian, Digits, Common Punctuation, Whitespace
    const allowedRegex = /[а-яА-ЯёЁ0-9\s.,!?;:()\-—]/g;
    const specialRegex = /[^а-яА-ЯёЁ0-9\s.,!?;:()\-—]/;
    
    if (specialRegex.test(input)) {
      setShowSpecialCharWarning(true);
      setTimeout(() => setShowSpecialCharWarning(false), 3000);
    }

    const cleaned = input.match(allowedRegex)?.join('') || '';
    return cleaned.slice(0, 5000); // 5k limit
  };

  const handleReaderChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const processed = processInput(e.target.value);
    setReaderText(processed);
  };

  const confirmReader = () => {
    const segments = readerText.split('\n').map(s => s.trim());
    const validSegments = segments.filter(s => /[а-яА-ЯёЁ]/.test(s)); // Must contain at least one Russian letter

    if (validSegments.length === 0) {
      alert(t.readerEmpty);
      return;
    }

    if (validSegments.length > 100) {
      alert(t.readerWarningLimit);
      return;
    }

    const hasLongSegment = validSegments.some(s => s.length > 200);
    if (hasLongSegment) {
      if (!window.confirm(t.readerWarningLong)) {
        return;
      }
    }

    setProcessedSegments(validSegments);
    setView('reader-output');
    window.scrollTo(0, 0);
  };

  const renderHome = () => (
    <div className="flex flex-col gap-6 p-4 animate-fadeIn">
      <header className="py-8 text-center relative">
        <h1 className="text-5xl font-black text-indigo-900 mb-2">{t.appTitle}</h1>
        <p className="text-gray-500 font-medium">{t.subtitle}</p>
        
        {deferredPrompt && (
          <button 
            onClick={handleInstall}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg hover:bg-indigo-700 transition-all"
          >
            <i className="fas fa-download mr-2"></i> {t.install}
          </button>
        )}
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setView('alphabet')}
          className="flex flex-col items-center justify-center p-8 bg-white border-2 border-transparent hover:border-indigo-500 shadow-xl rounded-[2rem] transition-all group"
        >
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <i className="fas fa-font"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-800">{t.alphabet}</h2>
          <p className="text-gray-500 text-sm mt-2">{t.browseLetters}</p>
        </button>

        <button 
          onClick={() => setView('rules')}
          className="flex flex-col items-center justify-center p-8 bg-white border-2 border-transparent hover:border-emerald-500 shadow-xl rounded-[2rem] transition-all group"
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <i className="fas fa-book"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-800">{t.rules}</h2>
          <p className="text-gray-500 text-sm mt-2">{t.soundEncyclopedia}</p>
        </button>

        <button 
          onClick={() => setView('reader')}
          className="flex flex-col items-center justify-center p-8 bg-white border-2 border-transparent hover:border-amber-500 shadow-xl rounded-[2rem] transition-all group"
        >
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <i className="fas fa-volume-high"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-800">{t.reader}</h2>
          <p className="text-gray-500 text-sm mt-2">{t.listenCustomText}</p>
        </button>
      </div>

      <section className="mt-8">
        <h3 className="text-xl font-black text-gray-800 mb-6 px-2 flex items-center gap-2">
          <i className="fas fa-bolt text-amber-500"></i> {t.quickStart}
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {RUSSIAN_ALPHABET.slice(0, 10).map(letter => (
            <LetterCard key={letter.id} letter={letter} onClick={handleLetterClick} />
          ))}
        </div>
      </section>
    </div>
  );

  const renderReader = () => (
    <div className="p-4 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setView('home')} className="w-10 h-10 flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl hover:bg-gray-100">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t.reader}</h1>
      </div>

      <div className="relative">
        {showSpecialCharWarning && (
          <div className="absolute top-4 right-4 z-30 bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg animate-bounce">
            <i className="fas fa-exclamation-triangle mr-2"></i> {t.readerWarningSpecial}
          </div>
        )}
        
        <textarea
          value={readerText}
          onChange={handleReaderChange}
          placeholder={t.readerPlaceholder}
          className="w-full h-80 p-8 text-xl text-gray-800 bg-white border-2 border-gray-100 rounded-[2.5rem] shadow-xl focus:border-indigo-400 focus:ring-0 resize-none outline-none transition-all placeholder:text-gray-300"
        />
        
        <div className="flex justify-between items-center mt-6 px-2">
          <div className="text-xs font-bold text-gray-400">
            {readerText.length} / 5000 characters
          </div>
          <button 
            onClick={confirmReader}
            disabled={!readerText.trim()}
            className={`
              px-10 py-4 rounded-full font-black text-lg transition-all shadow-xl
              ${readerText.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            {t.readerConfirm}
          </button>
        </div>
      </div>
    </div>
  );

  const renderReaderOutput = () => (
    <div className="p-4 animate-slideUp">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setView('reader')} className="w-10 h-10 flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl hover:bg-gray-100">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t.readerSegments}</h1>
      </div>

      <p className="text-gray-500 mb-8 px-2 font-medium">{t.readerSegmentHint}</p>

      <div className="space-y-4">
        {processedSegments.map((segment, index) => (
          <div key={index} className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 transition-all hover:border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 block">Segment #{index + 1}</span>
              <p className="text-2xl text-gray-800 font-bold leading-snug">{segment}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <AudioButton text={segment} size="lg" />
              <AudioButton text={segment} speed="slow" size="md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlphabet = () => (
    <div className="p-4 animate-fadeIn">
      <div className="sticky top-0 bg-[#f8fafc]/90 backdrop-blur-xl z-20 py-4 mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setView('home')} className="w-10 h-10 flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl hover:bg-gray-100">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t.alphabet}</h1>
        </div>
        <div className="flex gap-2 overflow-x-auto py-3 px-1 -mx-1 no-scrollbar scroll-smooth">
          {['All', Category.VOWELS, Category.CONSONANTS, Category.SIGNS].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`
                px-5 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all
                ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-indigo-100 shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}
              `}
            >
              {t[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
        {filteredAlphabet.map(letter => (
          <LetterCard key={letter.id} letter={letter} onClick={handleLetterClick} />
        ))}
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="p-4 animate-fadeIn">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => setView('home')} className="w-10 h-10 flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t.rules}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {PHONICS_RULES.map(rule => (
          <RuleCard key={rule.id} rule={rule} language={language} onClick={handleRuleClick} />
        ))}
      </div>
    </div>
  );

  const renderLetterDetail = () => {
    if (!selectedLetter) return null;
    return (
      <div className="p-4 animate-slideUp">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView('alphabet')} className="w-10 h-10 flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-xl font-black text-gray-800 uppercase tracking-widest">{t.letterDetails}</h1>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden mb-8">
          <div className={`p-12 flex flex-col items-center justify-center ${
            selectedLetter.category === Category.VOWELS ? 'bg-red-50' : 
            selectedLetter.category === Category.CONSONANTS ? 'bg-blue-50' : 'bg-gray-50'
          }`}>
            <span className="text-9xl font-black text-gray-900 mb-4 drop-shadow-sm">
              {selectedLetter.uppercase}{selectedLetter.lowercase}
            </span>
            <div className="flex items-center gap-6 mt-4">
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase font-black tracking-widest">{t.letterName}</div>
                <div className="text-2xl font-bold text-gray-800">
                  {selectedLetter.name} 
                  <span className="ipa-font text-indigo-500 opacity-60 ml-2">{selectedLetter.nameIpa}</span>
                </div>
              </div>
              <AudioButton text={`${selectedLetter.name}`} size="lg" className="h-16 w-16 text-2xl" />
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-10">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{t.pronunciations}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedLetter.pronunciations.map((pron, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:bg-white">
                    <div className="flex flex-col">
                      {pron.label && <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">{t[pron.label] || pron.label}</span>}
                      <span className="ipa-font text-4xl text-indigo-600 font-bold">{pron.ipa}</span>
                    </div>
                    <div className="flex gap-2">
                       <AudioButton text={pron.audioPrompt} size="lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{t.usageContext}</h3>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                {language === 'zh' ? selectedLetter.descriptionZh : selectedLetter.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">{t.levelExamples}</h3>
              <div className="space-y-4">
                {selectedLetter.examples.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-gray-900">{ex.word}</span>
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-md text-[10px] font-black uppercase tracking-tighter">
                          {ex.word.length} {t.lettersCount}
                        </span>
                      </div>
                      <div className="text-base text-gray-500 font-medium mt-1">
                        <span className="ipa-font opacity-60">{ex.transcription}</span> — {language === 'zh' ? ex.translationZh : ex.translation}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <AudioButton text={ex.word} />
                      <AudioButton text={ex.word} speed="slow" size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRuleDetail = () => {
    if (!selectedRule) return null;
    return (
      <div className="p-4 animate-slideUp">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView('rules')} className="w-10 h-10 flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-xl font-black text-gray-800 uppercase tracking-widest">{t.ruleInsight}</h1>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 mb-8">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-black uppercase tracking-widest mb-6">
            {t[selectedRule.category] || selectedRule.category}
          </span>
          <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
            {language === 'zh' ? selectedRule.titleZh : selectedRule.title}
          </h1>
          <p className="text-2xl text-gray-600 leading-relaxed mb-12 font-medium">
            {language === 'zh' ? selectedRule.descriptionZh : selectedRule.description}
          </p>

          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">{t.appliedExamples}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedRule.examples.map((ex, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] group transition-all hover:bg-white hover:border-emerald-200 hover:shadow-xl">
                <div>
                  <div className="text-3xl font-black text-gray-900">{ex.word}</div>
                  <div className="ipa-font text-lg text-gray-500 font-medium mt-1">
                    {ex.transcription} — {language === 'zh' ? ex.translationZh : ex.translation}
                  </div>
                </div>
                <div className="flex gap-2">
                  <AudioButton text={ex.word} />
                  <AudioButton text={ex.word} speed="slow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-slate-50 pb-12 transition-colors duration-500">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-6 py-4 flex justify-between items-center md:rounded-b-3xl md:mt-2 md:shadow-sm">
        <div onClick={() => setView('home')} className="font-black text-indigo-900 text-2xl tracking-tighter cursor-pointer">{t.appTitle}</div>
        <div className="flex gap-3">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors"
          >
            <i className="fas fa-globe text-xs"></i>
            {language === 'en' ? 'EN' : '中文'}
          </button>
          <button onClick={() => setView('home')} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
            <i className="fas fa-home text-xl"></i>
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto">
        {view === 'home' && renderHome()}
        {view === 'alphabet' && renderAlphabet()}
        {view === 'rules' && renderRules()}
        {view === 'reader' && renderReader()}
        {view === 'reader-output' && renderReaderOutput()}
        {view === 'letter-detail' && renderLetterDetail()}
        {view === 'rule-detail' && renderRuleDetail()}
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default App;
