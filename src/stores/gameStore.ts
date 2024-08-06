import { defineStore } from 'pinia';
import { ref } from 'vue';
import { cardService } from '@/services/cardService';
import { db, auth, onAuthStateChanged } from '@/firebase';
import { doc, setDoc, onSnapshot, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

export interface Card {
  name: string;
  set: string;
  exposed?: boolean;
}

export interface Result {
  date: string;
  attempts: number;
  gridSize: number;
  score: number;
  playerId: string;
}

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface State {
  players: Player[];
  currentPlayerId: string;
  firstCard: Card | null;
  secondCard: Card | null;
  lockBoard: boolean;
  attempts: number;
  gridSize: number;
  cards: Card[];
  results: Result[];
}

export interface CardSet {
  set: string;
  card1?: string;
  card2?: string;
}

export const useGameStore = defineStore('gameStore', () => {
  const state = ref<State>({
    players: [],
    currentPlayerId: '',
    firstCard: null,
    secondCard: null,
    lockBoard: false,
    attempts: 0,
    gridSize: 16, // Standaard gridSize
    cards: [],
    results: [],
  });


  let stateLoaded = false;

  const initializeGame = async (gridSize: number, players: Player[], gameId: string) => {
    const cards = await cardService.initializeCards(gridSize);
    state.value.cards = cards;
    state.value.gridSize = gridSize;
    state.value.attempts = 0;
    state.value.lockBoard = false;
    state.value.firstCard = null;
    state.value.secondCard = null;
    state.value.players = players;
    state.value.currentPlayerId = players[0].id;
    await saveState(gameId);
  };

  const handleCardClick = async (index: number, gameId: string, updateCallback: () => void) => {
    const clickedCard = state.value.cards[index];
    if (state.value.lockBoard || clickedCard === state.value.firstCard || clickedCard.exposed) return;

    clickedCard.exposed = true;
    updateCallback();

    if (!state.value.firstCard) {
      state.value.firstCard = clickedCard;
      await saveState(gameId);
      return;
    }

    state.value.secondCard = clickedCard;
    state.value.attempts++;
    state.value.lockBoard = true;
    updateCallback();

    if (state.value.firstCard.set === state.value.secondCard.set) {
      const currentPlayer = state.value.players.find(player => player.id === state.value.currentPlayerId);
      if (currentPlayer) currentPlayer.score++;

      if (!state.value.cards.some(card => !card.exposed)) {
        setTimeout(() => {
          alert("Gefeliciteerd! Je hebt alle kaarten gevonden.");
          addResult(gameId);
        }, 1000);
      }
      resetState();
      updateCallback();
    } else {
      setTimeout(() => {
        state.value.firstCard!.exposed = false;
        state.value.secondCard!.exposed = false;
        resetState();
        updateCallback();
      }, 1000);
    }

    const currentPlayerIndex = state.value.players.findIndex(player => player.id === state.value.currentPlayerId);
    state.value.currentPlayerId = state.value.players[(currentPlayerIndex + 1) % state.value.players.length].id;
    await saveState(gameId);
  };

  const resetState = () => {
    state.value.firstCard = null;
    state.value.secondCard = null;
    state.value.lockBoard = false;
  };

  const addResult = async (gameId: string) => {
    const result: Result = {
      date: new Date().toISOString(),
      attempts: state.value.attempts,
      gridSize: state.value.gridSize,
      score: Math.max(0, state.value.gridSize * 2 - state.value.attempts),
      playerId: state.value.currentPlayerId
    };
    const gameDoc = doc(db, `games/${gameId}`);
    await updateDoc(gameDoc, {
      results: [...state.value.results, result]
    });
    state.value.results.push(result);
  };

  const saveState = async (gameId: string) => {
    const gameDoc = doc(db, `games/${gameId}`);
    await setDoc(gameDoc, state.value, { merge: true });
  };

  const loadState = async (gameId: string) => {
    if (stateLoaded) return;

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const gameDoc = doc(db, `games/${gameId}`);
        onSnapshot(gameDoc, (docSnap) => {
          if (docSnap.exists()) {
            const savedState = docSnap.data() as State;
            state.value = {
              ...state.value,
              ...savedState,
            };
          }
        });
        stateLoaded = true;
      }
    });
  };

  const fetchResults = async () => {
    if (auth.currentUser) {
      const results: Result[] = [];
      const q = query(collection(db, 'games'), where('players', 'array-contains', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.results) {
          results.push(...data.results);
        }
      });
      state.value.results = results;
    }
  };

  return {
    state,
    initializeGame,
    handleCardClick,
    resetState,
    addResult,
    saveState,
    loadState,
    fetchResults,
    get stateLoaded() {
      return stateLoaded;
    },
  };
});
