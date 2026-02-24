
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { generateSpeech, decodeAudioData } from '../services/geminiService';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'normal' | 'slow';
  className?: string;
}

let sharedAudioContext: AudioContext | null = null;

const AudioButton: React.FC<AudioButtonProps> = ({ 
  text, 
  size = 'md', 
  speed = 'normal',
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isSlow = speed === 'slow';

  const sizeClasses = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-lg'
  };

  const voicesRef = useRef<SpeechSynthesisVoice[] | null>(null);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const load = () => {
      try {
        const vs = window.speechSynthesis.getVoices();
        if (vs && vs.length) voicesRef.current = vs;
        // 尝试设置首个俄语语音名称
        if (vs && vs.length) {
          const ruVoice = vs.find(v => v.lang && v.lang.toLowerCase().startsWith('ru')) || vs.find(v => /ru|russian/i.test(v.name || ''));
          if (ruVoice) setSelectedVoiceName(ruVoice.name || `${ruVoice.lang}`);
        }
      } catch (err) {
        // ignore
      }
    };

    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading || isPlaying) return;

    setIsLoading(true);
    try {
      // 优先尝试浏览器内建的 Web Speech API（无网络、延迟极低）
      const supportSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
      if (supportSpeech) {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'ru-RU';
        utter.rate = isSlow ? 0.75 : 1.0;
        utter.pitch = 1.0;

        // 选取优先的俄语语音（若可用）
        const voices = voicesRef.current && voicesRef.current.length ? voicesRef.current : window.speechSynthesis.getVoices();
        if (voices && voices.length) {
          // 优先根据 lang，再按 name 匹配俄语
          const ruVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ru'))
            || voices.find(v => /ru|russian/i.test(v.name || ''));
          if (ruVoice) utter.voice = ruVoice;
          if (ruVoice) setSelectedVoiceName(ruVoice.name || `${ruVoice.lang}`);
        }

        utter.onend = () => setIsPlaying(false);
        utter.onerror = (ev) => {
          console.error('SpeechSynthesis error', ev);
          setIsPlaying(false);
        };

        setIsPlaying(true);
        window.speechSynthesis.cancel(); // 取消挂起的语音，优先播放当前
        window.speechSynthesis.speak(utter);
      } else {
        // 回退到网络 TTS（如 Gemini 服务）——保留原有逻辑
        if (!sharedAudioContext) {
          sharedAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }

        if (sharedAudioContext.state === 'suspended') {
          await sharedAudioContext.resume();
        }

        const audioData = await generateSpeech(text, isSlow);

        if (audioData && sharedAudioContext) {
          const audioBuffer = await decodeAudioData(audioData, sharedAudioContext);
          const source = sharedAudioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(sharedAudioContext.destination);

          source.onended = () => setIsPlaying(false);
          setIsPlaying(true);
          source.start(0);
        }
      }
    } catch (err) {
      console.error("语音播放异常:", err);
    } finally {
      setIsLoading(false);
    }
  }, [text, isLoading, isPlaying, isSlow]);
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        disabled={isLoading}
        title={isSlow ? "慢速朗读" : "标准语速"}
        className={`
          ${sizeClasses[size]} 
          flex items-center justify-center rounded-full border
          transition-all duration-300 transform active:scale-75
          ${isLoading ? `${loadingColors} cursor-wait` : 
            isPlaying ? `${activeColors} scale-110` : 
            `${baseColors} hover:scale-105`}
          ${className}
        `}
        aria-label={`播放${isSlow ? '慢速' : '标准'}发音: ${text}`}
      >
        {isLoading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : isPlaying ? (
          <i className="fas fa-volume-up"></i>
        ) : (
          <i className={`fas fa-play ml-0.5 ${isSlow ? 'opacity-50' : ''}`}></i>
        )}
      </button>
      {selectedVoiceName && (
        <div className="text-[10px] text-gray-500 mt-1 select-none">{selectedVoiceName}</div>
      )}
    </div>
  );
}

export default AudioButton;
