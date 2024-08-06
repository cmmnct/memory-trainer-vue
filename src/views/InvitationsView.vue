<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Uitnodigingen</ion-title>
          <ion-buttons slot="end">
          <ion-button @click="closeInvitations">
            Sluiten
          </ion-button>
        </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item v-for="invitation in invitations" :key="invitation.id">
            <ion-label>
              Uitnodiging van {{ invitation.from }}
            </ion-label>
            <ion-buttons slot="end">
              <ion-button @click="accept(invitation.id)">
                Accepteren
              </ion-button>
              <ion-button @click="decline(invitation.id)">
                Weigeren
              </ion-button>
            </ion-buttons>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, computed } from 'vue';
  import { useInvitationStore } from '../stores/invitationStore';
  import { useRouter } from 'vue-router';
  
  const invitationStore = useInvitationStore();
  const router = useRouter();
  const invitations = computed(() => invitationStore.invitations);
  
  onMounted(() => {
    invitationStore.fetchInvitations();
  });
  
  const accept = (invitationId: string) => {
    invitationStore.acceptInvitation(invitationId);
  };
  
  const decline = (invitationId: string) => {
    invitationStore.declineInvitation(invitationId);
  };

  const closeInvitations = () => {
  router.push('/game');
};

  </script>
  
  <style scoped>
  /* Voeg je stijlen hier toe */
  </style>
  