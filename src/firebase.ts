import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';


const firebaseConfig = {
    apiKey: "AIzaSyDMBclQnPZrcNsevFZ0IYgTMC_0yzv-74w",
    authDomain: "memory-game-10538.firebaseapp.com",
    projectId: "memory-game-10538",
    storageBucket: "memory-game-10538.appspot.com",
    messagingSenderId: "1089085032321",
    appId: "1:1089085032321:web:f7680e66059670f1db8a80"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Stel de persistentie in (local storage)
setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error('Failed to set persistence:', error);
  });

  const messaging = getMessaging(app);

// Vraag toestemming voor meldingen en verkrijg een token
export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BOt1xkfusvSZsqXH97QibVz-WY5Izw3CH_n7kXxnedPQySKyvcW-rJrqAZ0RBOKp_TzyYr8nVcV8OMjws-IS3pw' }).then((currentToken) => {
    if (currentToken) {
      console.log('Huidige token voor client: ', currentToken);
      // Voer hier eventuele andere noodzakelijke acties uit met de token
    } else {
      console.log('Geen registratie token beschikbaar. Vraag toestemming om er een te genereren.');
    }
  }).catch((err) => {
    console.log('Er is een fout opgetreden bij het ophalen van de token. ', err);
  });
};

// Luister naar inkomende berichten
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });