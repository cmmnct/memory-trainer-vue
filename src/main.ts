import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { IonicVue } from '@ionic/vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



// Core CSS required for Ionic components to work properly
import '@ionic/vue/css/core.css';

// Basic CSS for apps built with Ionic
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

// Optional CSS utils that can be commented out
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// Theme variables
import './theme/variables.css';

// Import individual Ionic components
import { IonButtons, IonIcon, IonList, IonItem, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonSpinner, IonModal,IonLabel, IonDatetime, IonAvatar } from '@ionic/vue';

import { addIcons } from 'ionicons';
import { personCircleOutline, gridOutline, barChartOutline } from 'ionicons/icons';

const pinia = createPinia();

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia);

// Register Ionic components globally

app.component('ion-buttons', IonButtons);
app.component('ion-icon', IonIcon);
app.component('ion-list', IonList);
app.component('ion-item', IonItem);
app.component('ion-page', IonPage);
app.component('ion-header', IonHeader);
app.component('ion-toolbar', IonToolbar);
app.component('ion-title', IonTitle);
app.component('ion-content', IonContent);
app.component('ion-button', IonButton);
app.component('ion-input', IonInput);
app.component('ion-select', IonSelect);
app.component('ion-select-option', IonSelectOption);
app.component('ion-grid', IonGrid);
app.component('ion-row', IonRow);
app.component('ion-col', IonCol);
app.component('ion-spinner', IonSpinner);
app.component('ion-modal', IonModal);
app.component('ion-label', IonLabel);
app.component('ion-datetime', IonDatetime);
app.component('ion-avatar', IonAvatar);

addIcons({
  'person-circle-outline': personCircleOutline,
  'grid-outline': gridOutline,
  'bar-chart-outline': barChartOutline,
});

const auth = getAuth();
let appInitialized = false;

onAuthStateChanged(auth, (user) => {
  if (!appInitialized) {
    if (user) {
      router.push({ path: '/game' });
    } else {
      router.push({ path: '/login' });
    }
    app.mount('#app');
    appInitialized = true;
  }
});