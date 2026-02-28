import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterType } from '../types';
import { CHARACTERS } from '../constants';
import { TRANSLATIONS } from '../translations';
import { User as UserIcon, Search, Brain, Scale, Puzzle } from 'lucide-react';

export default function Tutorial({ onComplete }: { onComplete: (name: string, character: CharacterType, language: 'JA' | 'EN' | 'ZH' | 'KO') => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedChar, setSelectedChar] = useState<CharacterType | null>(null);
  const [selectedLang, setSelectedLang] = useState<'JA' | 'EN' | 'ZH' | 'KO'>('JA');

  const t = TRANSLATIONS[selectedLang];

  const steps = [
    {
      title: "Language / 言語",
      content: (
        <div className="space-y-6">
          <p className="text-center text-stone-400">Please select your preferred language.<br />使用する言語を選択してください。</p>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {(['JA', 'EN', 'ZH', 'KO'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`p-4 rounded-2xl border-2 transition-all font-bold ${
                  selectedLang === lang 
                    ? 'border-neon-cyan bg-neon-cyan/20 text-white shadow-[0_0_15px_rgba(0,243,255,0.3)]' 
                    : 'border-white/10 bg-white/5 hover:border-white/30 text-stone-400'
                }`}
              >
                {lang === 'JA' ? '日本語' : lang === 'EN' ? 'English' : lang === 'ZH' ? '中文' : '한국어'}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: t.tutorial_welcome_title,
      content: (
        <div className="space-y-4 text-center">
          <p className="text-xl font-medium whitespace-pre-line text-white">{t.tutorial_welcome_text}</p>
          <p className="text-stone-400">{t.tutorial_name_prompt}</p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.tutorial_name_placeholder}
              className="w-full px-4 py-3 rounded-xl border-2 border-white/10 bg-white/5 focus:border-neon-cyan text-white outline-none transition-colors text-center font-bold"
            />
            <button 
              onClick={() => {
                const randomId = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                const anonName = selectedLang === 'JA' ? `ロジカー${randomId}` : `Logicker${randomId}`;
                setName(anonName);
              }}
              className="text-xs text-stone-500 hover:text-neon-cyan underline"
            >
              {t.tutorial_name_anon}
            </button>
          </div>
        </div>
      )
    },
    {
      title: t.tutorial_logic_title,
      content: (
        <div className="space-y-6 text-lg leading-relaxed text-stone-300">
          <p className="whitespace-pre-line">{t.tutorial_logic_q}</p>
          <p className="text-white font-bold">{t.tutorial_logic_a}</p>
          <ul className="space-y-2 text-stone-400">
            {t.tutorial_logic_list.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-neon-cyan">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-neon-cyan font-bold">{t.tutorial_logic_power}</p>
        </div>
      )
    },
    {
      title: t.tutorial_quality_title,
      content: (
        <div className="space-y-6 text-lg">
          <p className="whitespace-pre-line text-stone-300">{t.tutorial_quality_text}</p>
          <div className="grid grid-cols-1 gap-3">
            {t.tutorial_quality_list.map((item, i) => (
              <div key={i} className="flex items-center gap-3 glass-panel p-4 rounded-xl border border-white/10 shadow-lg">
                <div className="w-6 h-6 rounded-full bg-neon-emerald/20 text-neon-emerald flex items-center justify-center text-sm font-bold border border-neon-emerald/30">✓</div>
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
          <p className="whitespace-pre-line text-stone-400 text-sm italic">{t.tutorial_quality_footer}</p>
        </div>
      )
    },
    {
      title: t.tutorial_partner_title,
      content: (
        <div className="space-y-4">
          <p className="text-center mb-6 whitespace-pre-line text-stone-300">{t.tutorial_partner_text}</p>
          <div className="grid grid-cols-2 gap-4">
            {(Object.entries(CHARACTERS) as [CharacterType, any][]).map(([key, char]) => (
              <button
                key={key}
                onClick={() => setSelectedChar(key)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedChar === key 
                    ? 'border-neon-cyan bg-neon-cyan/20 text-white shadow-[0_0_15px_rgba(0,243,255,0.3)] scale-[1.02]' 
                    : 'border-white/10 bg-white/5 hover:border-white/30 text-stone-400'
                }`}
              >
                <div className="text-3xl mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{char.icon}</div>
                <div className={`font-bold text-lg ${selectedChar === key ? 'text-white' : 'text-stone-300'}`}>{char.name}</div>
                <div className="text-[10px] opacity-70 mt-1 uppercase tracking-wider">{char.description}</div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: selectedLang === 'JA' ? "準備はいい？" : "Are you ready?",
      content: (
        <div className="space-y-6 text-center py-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-black leading-tight whitespace-pre-line text-white"
          >
            {selectedLang === 'JA' ? (
              <>
                よし！さあ、準備はいい？<br />
                ここから君の<br />
                論理トレーニングが始まる。<br />
                <span className="text-neon-cyan drop-shadow-[0_0_10px_#00f3ff]">Re:LOGIC</span>へようこそ。<br />
                考えることを、楽しもう！
              </>
            ) : (
              <>
                Alright! Are you ready?<br />
                Your logical training<br />
                starts here.<br />
                Welcome to <span className="text-neon-cyan drop-shadow-[0_0_10px_#00f3ff]">Re:LOGIC</span>.<br />
                Enjoy the thinking process!
              </>
            )}
          </motion.div>
        </div>
      )
    }
  ];

  const next = () => {
    if (step === 1 && !name.trim()) return;
    if (step === 4 && !selectedChar) return;
    if (step === steps.length - 1) {
      if (selectedChar) onComplete(name, selectedChar, selectedLang);
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 bg-cyber-black flex items-center justify-center p-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="scanline" />
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl glass-panel border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden cyber-glow"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            className="h-full bg-neon-cyan shadow-[0_0_10px_#00f3ff]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            className="min-h-[450px] flex flex-col justify-center relative z-10"
          >
            <div className="text-[10px] font-mono tracking-[0.5em] uppercase text-neon-cyan/60 mb-4">
              System Initialization // Step {step + 1} of {steps.length}
            </div>
            <h2 className="text-4xl font-black mb-10 font-tech tracking-tight italic text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              {steps[step].title}
            </h2>
            {/* ここが重要：個別コンテンツの文字色は各コンテンツ内で管理 */}
            <div>
              {steps[step].content}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-between items-center relative z-10">
          <button 
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className={`text-[10px] font-bold uppercase tracking-[0.3em] font-mono transition-all ${step === 0 ? 'opacity-0' : 'text-stone-500 hover:text-neon-cyan'}`}
          >
            {t.back}
          </button>
          <button 
            onClick={next}
            disabled={(step === 1 && !name.trim()) || (step === 4 && !selectedChar)}
            className="px-12 py-5 bg-white text-cyber-black rounded-2xl font-bold font-tech tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
          >
            {step === steps.length - 1 ? t.tutorial_start : t.next}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
