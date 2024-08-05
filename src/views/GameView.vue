<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Memory Game</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openUserSettings">
            <ion-icon slot="icon-only" name="person-circle-outline"></ion-icon>
          </ion-button>
          <ion-button @click="selectGridSize">
            <ion-icon slot="icon-only" name="grid-outline"></ion-icon>
          </ion-button>
          <ion-button @click="showStatistics">
            <ion-icon slot="icon-only" name="bar-chart-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="loading" class="loading">
        <ion-spinner />
      </div>
      <div v-else class="game-grid">
        <CardComponent :card="card" v-for="(card, index) in state.cards" :key="`${card.set}-${card.name}-${index}`"
          :class="`grid${gridSize}`" @click="handleCardClick(index)" />
      </div>
    </ion-content>

    <!-- Modals -->
    <UserSettings :isOpen="showUserSettings" @close="showUserSettings = false" />
    <GridSizeSelector :isOpen="showGridSizeSelector" @close="showGridSizeSelector = false" @select="handleGridSizeChange" />
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGameStore } from '@/stores/gameStore';
import CardComponent from '@/components/CardComponent.vue';
import UserSettings from '@/components/UserSettings.vue';
import GridSizeSelector from '@/components/GridSizeSelector.vue';

const route = useRoute();
const router = useRouter();
const gameStore = useGameStore();
const gridSize = ref<number>(parseInt(route.query.gridSize as string) || gameStore.state.gridSize || 16);
const loading = ref(true);
const showUserSettings = ref(false);
const showGridSizeSelector = ref(false);

async function initializeGame() {
  if (!gameStore.stateLoaded) {
    await gameStore.loadState();
  }
  if (!gameStore.state.cards.length) {
    await gameStore.initializeCards(gridSize.value);
  }
  loading.value = false;
}

async function handleGridSizeChange(size: number) {
  gridSize.value = size;
  loading.value = true;
  await gameStore.initializeCards(gridSize.value);
  loading.value = false;
}

function handleCardClick(index: number) {
  gameStore.handleCardClick(index, () => {
    // Optional update callback
  });
}

function openUserSettings() {
  showUserSettings.value = true;
}

function selectGridSize() {
  showGridSizeSelector.value = true;
}

function showStatistics() {
  router.push('/statistics');
}

onMounted(async () => {
  await initializeGame();
});

watch(route, async () => {
  gridSize.value = parseInt(route.query.gridSize as string) || gameStore.state.gridSize || 16;
  await initializeGame();
});

const state = computed(() => gameStore.state);
</script>

<style scoped>
.game-grid {
  display: flex;
  flex-wrap: wrap;
  max-height: 85vh;
  max-width: 100vw;
  aspect-ratio: 1/1;
  margin: auto;
  justify-content: center;
}

.game-grid > div {
  margin: min(1vw, 10px);
}

.grid16 {
  max-width: calc(25% - 2vw);
}

.grid25 {
  max-width: calc(20% - 2vw);
}

.grid36 {
  max-width: calc(16.6666% - 2vw);
}
</style>
