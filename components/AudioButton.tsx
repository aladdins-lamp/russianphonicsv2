
import React, { useState, useCallback } from 'react';
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

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading || isPlaying) return;

    setIsLoading(true);
    try {
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
    } catch (err) {
      console.error("语音播放异常:", err);
    } finally {
      setIsLoading(false);
    }
  }, [text, isLoading, isPlaying, isSlow]);

  // Styling logic: 
  // Both normal and slow now use bg-white. 
  // Slow button uses a lighter text/border and a more subtle hover effect.
  const baseColors = isSlow
    ? 'bg-white text-indigo-300 border-indigo-50 hover:bg-indigo-50/20 shadow-sm'
    : 'bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50 shadow-sm';
    
  const activeColors = isSlow 
    ? 'bg-indigo-300 text-white border-indigo-300 shadow-md' 
    : 'bg-indigo-600 text-white border-indigo-600 shadow-lg';

  const loadingColors = 'bg-indigo-50 text-indigo-200';

  return (
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
  );
};

export default AudioButton;
