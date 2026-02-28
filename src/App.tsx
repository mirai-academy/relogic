import { useState, useEffect } from 'react';
import { User, CharacterType } from './types';
import TitleScreen from './components/TitleScreen';
import Tutorial from './components/Tutorial';
import HomeScreen from './components/HomeScreen';
import LogicalLesson from './components/LogicalLesson';
import Gacha from './components/Gacha';
import Ranking from './components/Ranking';
import Settings from './components/Settings';
import Store from './components/Store';
import LoginBonus from './components/LoginBonus';
import LoadingScreen from './components/LoadingScreen';

// ユーザーデータの初期値
const INITIAL_USER: User = {
  name: '',
  rank: 'NOVICE',
  score: 0,
  logicalPercentage: 0,
  coins: 500,
  gems: 10,
  tickets: 3,
  character: 'ANALYSIS',
  profileIcon: 'NORMAL',
  theme: 'DARK',
  language: 'JA',
  loginDays: 1,
  lastLoginDate: new Date().toISOString().split('T')[0],
  loginBonusClaimedDate: ''
};

type Screen = 'TITLE' | 'TUTORIAL' | 'HOME' | 'LESSON' | 'GACHA' | 'RANKING' | 'SETTINGS' | 'STORE' | 'LOGIN_BONUS';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('TITLE');
  const [isLoading, setIsLoading] = useState(true);

  // 起動時にデータを読み込む
  useEffect(() => {
    const saved = localStorage.getItem('relogic_user_data');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    // 擬似的なローディング演出
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // ユーザーデータが更新されるたびに保存
  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const newUser = { ...user, ...updates };
    setUser(newUser);
    localStorage.setItem('relogic_user_data', JSON.stringify(newUser));
  };

  // チュートリアル完了時の処理
  const handleTutorialComplete = (name: string, character: CharacterType, language: 'JA' | 'EN' | 'ZH' | 'KO') => {
    const newUser = { 
      ...INITIAL_USER, 
      name, 
      character, 
      language,
      lastLoginDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    localStorage.setItem('relogic_user_data', JSON.stringify(newUser));
    setCurrentScreen('HOME');
  };

  if (isLoading) return <LoadingScreen theme={user?.theme || 'DARK'} />;

  // 画面遷移ロジック
  switch (currentScreen) {
    case 'TITLE':
      return (
        <TitleScreen 
          onStart={() => setCurrentScreen(user ? 'HOME' : 'TUTORIAL')} 
          language={user?.language || 'JA'} 
        />
      );

    case 'TUTORIAL':
      return <Tutorial onComplete={handleTutorialComplete} />;

    case 'HOME':
      return user ? (
        <HomeScreen 
          user={user} 
          onNavigate={setCurrentScreen} 
          onUpdateUser={updateUser} 
        />
      ) : null;

    case 'LESSON':
      return user ? (
        <LogicalLesson 
          user={user} 
          onUpdateUser={updateUser} 
          onBack={() => setCurrentScreen('HOME')} 
        />
      ) : null;

    case 'GACHA':
      return user ? (
        <Gacha 
          user={user} 
          onUpdateUser={updateUser} 
          onBack={() => setCurrentScreen('HOME')} 
        />
      ) : null;

    case 'SETTINGS':
      return user ? (
        <Settings 
          user={user} 
          onUpdateUser={updateUser} 
          onBack={() => setCurrentScreen('HOME')} 
        />
      ) : null;

    case 'RANKING':
      return user ? <Ranking user={user} onBack={() => setCurrentScreen('HOME')} /> : null;

    case 'STORE':
      return user ? <Store user={user} onBack={() => setCurrentScreen('HOME')} /> : null;

    case 'LOGIN_BONUS':
      return user ? (
        <LoginBonus 
          user={user} 
          onUpdateUser={updateUser} 
          onClose={() => setCurrentScreen('HOME')} 
        />
      ) : null;

    default:
      return null;
  }
}
