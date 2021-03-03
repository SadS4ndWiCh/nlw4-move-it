import { createContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import axios from '../services/api';

import challanges from '../../challanges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import useFetch from '../hooks/useFetch';

interface ChallangesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challangesCompleted: number;
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
  closeLevelUpModal: () => void;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({ children, ...rest }: ChallangesProviderProps) {
  const [session, loading] = useSession();
  const userName = session?.user.name;
  const { data, error, mutate } = useFetch(`/user/${userName}`);


  const [level, setLevel] = useState(rest.level);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
  const [challangesCompleted, setChallangesCompleted] = useState(rest.challangesCompleted);
  
  const [activeChallange, setActiveChallange] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.floor(Math.pow((level + 1) * 4, 2));

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    if(!loading) {
      const updatedUserData = { level, currentExperience, challangesCompleted };

      axios.put(`/user/${userName}`, updatedUserData);
  
      mutate(updatedUserData, false);
    }

  }, [level, currentExperience, challangesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
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
        closeLevelUpModal
      }}
    >
      { children }

      { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallangesContext.Provider>
  )
}