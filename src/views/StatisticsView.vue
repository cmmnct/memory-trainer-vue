<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Statistieken</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goBack">Terug</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>Weergave:</ion-label>
        <ion-select v-model="viewMode" @ionChange="renderChart">
          <ion-select-option value="average">Gemiddelde score</ion-select-option>
          <ion-select-option value="best">Beste score</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Maand:</ion-label>
        <ion-select v-model="selectedMonth" @ionChange="renderChart">
          <ion-select-option v-for="month in monthOptions" :key="month" :value="month">{{ month }}</ion-select-option>
        </ion-select>
      </ion-item>
      <div class="chart-container">
        <canvas id="resultsChart"></canvas>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Chart, registerables } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';
import { useGameStore, Result } from '@/stores/gameStore';

// Registreer de benodigde componenten
Chart.register(...registerables);

const router = useRouter();
const gameStore = useGameStore();

const results = ref<Result[]>([]);
const viewMode = ref<'average' | 'best'>('average');
const selectedMonth = ref('');
const chart = ref<Chart | null>(null);

const now = new Date();
selectedMonth.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

const monthOptions = ref<string[]>([]);
for (let i = 0; i < 12; i++) {
  const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
  monthOptions.value.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
}

const fetchResults = async () => {
  console.log('fetchResults called');
  await gameStore.fetchResults();
  console.log('Results fetched:', gameStore.state.results);
  results.value = gameStore.state.results as Result[];
  renderChart();
};

const renderChart = () => {
  const ctx = (document.getElementById('resultsChart') as HTMLCanvasElement).getContext('2d');
  if (!ctx) return;

  const selectedDate = new Date(selectedMonth.value);
  const filteredResults = results.value.filter((result: Result) => {
    const resultDate = new Date(result.date);
    return resultDate.getFullYear() === selectedDate.getFullYear() && resultDate.getMonth() === selectedDate.getMonth();
  });

  const uniqueDates = Array.from(new Set(filteredResults.map((result: Result) => new Date(result.date).toLocaleDateString()))).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const mappedData = (results: Result[], gridSize: number) =>
    uniqueDates.map((date) => {
      const resultsOnDate = results.filter((result) => result.gridSize === gridSize && new Date(result.date).toLocaleDateString() === date);
      if (viewMode.value === 'best') {
        return Math.min(...resultsOnDate.map((result) => result.attempts));
      }
      return resultsOnDate.reduce((sum, result) => sum + result.attempts, 0) / resultsOnDate.length;
    });

  const data = {
    labels: uniqueDates,
    datasets: [
      {
        label: '4 x 4',
        data: mappedData(filteredResults, 16),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: '5 x 5',
        data: mappedData(filteredResults, 25),
        fill: false,
        borderColor: 'rgba(192, 75, 192, 1)',
        backgroundColor: 'rgba(192, 75, 192, 0.2)',
      },
      {
        label: '6 x 6',
        data: mappedData(filteredResults, 36),
        fill: false,
        borderColor: 'rgba(192, 192, 75, 1)',
        backgroundColor: 'rgba(192, 192, 75, 0.2)',
      },
    ],
  };

  const config: ChartConfiguration = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          time: {
            unit: 'day',
          },
          title: {
            display: true,
            text: 'Datum',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Aantal pogingen',
          },
        },
      },
    },
  };

  if (chart.value) {
    chart.value.destroy();
  }

  chart.value = new Chart(ctx, config);
};

function goBack() {
  router.push('/game');
}

onMounted(() => {
  console.log('onMounted in StatisticsView called');
  fetchResults();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  min-height: 50vh;
}
ion-select {
  margin: 10px;
}
</style>
