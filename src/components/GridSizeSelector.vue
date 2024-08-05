<template>
    <ion-modal :is-open="isOpen" @didDismiss="close">
      <ion-header>
        <ion-toolbar>
          <ion-title>Selecteer Grid Grootte</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="close">Sluiten</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item button @click="selectSize(16)">4x4</ion-item>
          <ion-item button @click="selectSize(25)">5x5</ion-item>
          <ion-item button @click="selectSize(36)">6x6</ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{ isOpen: boolean }>();
  const emit = defineEmits(['close', 'select']);
  
  function close() {
    emit('close');
  }
  
  function selectSize(size: number) {
    emit('select', size);
    close();
  }
  </script>
  
  <style scoped>
  /* Voeg hier je stijlen toe */
  </style>
  