// src/stores/invitationStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, addDoc, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export interface Invitation {
  id: string;
  from: string;
  to: string;
  status: string;
  gameId: string;
}

export const useInvitationStore = defineStore('invitationStore', () => {
  const auth = getAuth();
  const invitations = ref<Invitation[]>([]);

  const sendInvitation = async (toUserId: string, gameId: string) => {
    const fromUserId = auth.currentUser?.uid;
    if (!fromUserId) return;

    await addDoc(collection(db, 'invitations'), {
      from: fromUserId,
      to: toUserId,
      status: 'pending',
      gameId: gameId,
    });
  };

  const acceptInvitation = async (invitationId: string) => {
    const invitationDoc = doc(db, 'invitations', invitationId);
    await updateDoc(invitationDoc, {
      status: 'accepted'
    });
  };

  const declineInvitation = async (invitationId: string) => {
    const invitationDoc = doc(db, 'invitations', invitationId);
    await updateDoc(invitationDoc, {
      status: 'declined'
    });
  };

  const fetchInvitations = () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const q = query(collection(db, 'invitations'), where('to', '==', userId), where('status', '==', 'pending'));
    onSnapshot(q, (querySnapshot) => {
      invitations.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Invitation[];
    });
  };

  return {
    invitations,
    sendInvitation,
    acceptInvitation,
    declineInvitation,
    fetchInvitations,
  };
});
