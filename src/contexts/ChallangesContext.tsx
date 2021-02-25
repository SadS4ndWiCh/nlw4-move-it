import { createContext, useState, ReactNode, useEffect } from 'react';
import challanges from '../../challanges.json';

interface ChallangesProviderProps {
  children: ReactNode;
}

interface Challange {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallangesContextData {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
  activeChallange: Challange;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallange: () => void;
  resetChallange: () => void;
  completeChallange: () => void;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({ children }: ChallangesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challangesCompleted, setChallangesCompleted] = useState(0);
  
  const [activeChallange, setActiveChallange] = useState(null);

  const experienceToNextLevel = Math.floor(Math.pow((level + 1) * 4, 2));

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallange() {
    const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
    const challange = challanges[randomChallangeIndex];
    
    setActiveChallange(challange);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        icon: '/favicon.png',
        body: `Valendo ${challange.amount}xp!`,
      });
    }
  }

  function resetChallange() {
    setActiveChallange(null);
  }

  function completeChallange() {
    if(!activeChallange) return;

    const { amount } = activeChallange;

    let finalExperience = currentExperience + amount;
    if(finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;

      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallange(null);
    setChallangesCompleted(challangesCompleted + 1);
  }

  return (
    <ChallangesContext.Provider
      value={{
        level,
        currentExperience,
        challangesCompleted,
        activeChallange,
        experienceToNextLevel,
        levelUp,
        startNewChallange,
        resetChallange,
        completeChallange,
      }}
    >
      { children }
    </ChallangesContext.Provider>
  )
}