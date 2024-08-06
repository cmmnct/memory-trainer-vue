<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Statistieken</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeStatistics">
            Sluiten
          </ion-button>
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
          <ion-select-option v-for="month in monthOptions" :key="month" :value="month">
            {{ month }}
          </ion-select-option>
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
import { useGameStore } from '@/stores/gameStore';

// Registreer de benodigde componenten
Chart.register(...registerables);

const router = useRouter();
const gameStore = useGameStore();
const viewMode = ref("average");
const selectedMonth = ref("");
const chart = ref<Chart | null>(null);

const closeStatistics = () => {
  router.push('/game');
};

const renderChart = () => {
  const ctx = document.getElementById("resultsChart") as HTMLCanvasElement;
  if (!ctx) return;

  const selectedDate = new Date(selectedMonth.value);
  const filteredResults = gameStore.state.results.filter((result) => {
    const resultDate = new Date(result.date);
    return (
      resultDate.getFullYear() === selectedDate.getFullYear() &&
      resultDate.getMonth() === selectedDate.getMonth()
    );
  });

  const uniqueDates = Array.from(
    new Set(
      filteredResults.map((result) =>
        new Date(result.date).toLocaleDateString()
      )
    )
  ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const mappedData = (results: any[], gridSize: number, playerId: string) =>
    uniqueDates.map((date) => {
      const resultsOnDate = results.filter(
        (result) =>
          result.gridSize === gridSize &&
          result.playerId === playerId &&
          new Date(result.date).toLocaleDateString() === date
      );
      if (viewMode.value === "best") {
        return Math.min(...resultsOnDate.map((result) => result.attempts));
      }
      return (
        resultsOnDate.reduce((sum, result) => sum + result.attempts, 0) /
        resultsOnDate.length
      );
    });

  const data = {
    labels: uniqueDates,
    datasets: gameStore.state.players.map((player) => ({
      label: `${player.name} - 4 x 4`,
      data: mappedData(filteredResults, 16, player.id),
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    })),
  };

  const config: ChartConfiguration = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          time: {
            unit: "day",
          },
          title: {
            display: true,
            text: "Datum",
          },
        },
        y: {
          title: {
            display: true,
            text: "Aantal pogingen",
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

const getMonthOptions = () => {
  const now = new Date();
  const months = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`);
  }
  return months;
};

onMounted(async () => {
  await gameStore.fetchResults();
  selectedMonth.value = new Date().toISOString().substring(0, 7); // Maand selecteren
  renderChart();
});

const monthOptions = getMonthOptions();
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
