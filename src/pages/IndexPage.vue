<template>
  <q-page
    :class="
      $q.screen.lt.md
        ? 'col items-center justify-evenly relative-position mainPage'
        : 'col items-center justify-evenly q-pa-lg'
    "
  >
    <div class="q-pa-lg row justify-between items-end">
      <div :class="$q.screen.lt.md ? 'text-white' : 'text-grey-10'">
        <p v-if="$q.screen.lt.md" class="text-body1 text-weight-bold">
          Account Balance
        </p>
        <p v-else class="text-body1">Available Balance</p>
        <div class="row items-center">
          <div
            class="q-px-md q-py-xs q-mr-sm bg-primary text-white rounded-borders text-caption text-weight-bold"
          >
            S$
          </div>
          <span class="text-h5 text-weight-bold">{{
            balance.toLocaleString()
          }}</span>
        </div>
      </div>
      <div>
        <div v-if="$q.screen.lt.md" class="row justify-end logoIcon">
          <img src="../assets/logos/Logo-color-icon.svg" />
        </div>
        <div class="text-cyan-5">
          <q-btn
            icon="add_circle"
            label="New card"
            :class="
              $q.screen.lt.md
                ? 'q-pa-none q-mt-lg text-weight-bold newCardBtn'
                : 'bg-blue-10 text-white newCardBtn'
            "
            @click="showAddCard = true"
          />
        </div>
      </div>
    </div>

    <q-tabs
      v-model="tab"
      indicator-color="cyan-5"
      :align="'left'"
      :class="
        $q.screen.lt.md
          ? 'text-white q-px-lg cardsSelectorTabs'
          : 'text-grey-10 q-px-lg cardsSelectorTabs'
      "
    >
      <q-tab name="debit" label="My debit cards" />
      <q-tab name="all" label="All company cards" />
    </q-tabs>
    <!-- mobile only view -->
    <CardCarousel v-if="$q.screen.lt.md" :setShowAddCard="setShowAddCard" />
    <MobileTxnsContainer v-if="$q.screen.lt.md" />
    <!-- desktop view -->
    <q-card v-else class="q-ma-lg q-pa-xl shadow-6">
      <div class="row items-start justify-center">
        <div class="deskCardContainer q-pr-lg">
          <CardCarousel :setShowAddCard="setShowAddCard" />
          <FunctionBtnsGroup />
        </div>
        <div class="q-mt-lg deskCardDetailContainer">
          <CardDetail />
        </div>
      </div>
    </q-card>
    <q-dialog v-model="showAddCard" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="name"
            autofocus
            @keyup.enter="
              () => {
                if (name.length > 8) showAddCard = false;
              }
            "
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Add card"
            v-close-popup
            :disable="name.length < 8"
            @click="
              () => {
                addNewCard(name);
                name = '';
              }
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import MobileTxnsContainer from 'src/components/MobileTxnsContainer.vue';
import CardCarousel from 'src/components/CardCarousel.vue';
import CardDetail from 'src/components/CardDetail.vue';
import FunctionBtnsGroup from 'src/components/FunctionBtnsGroup.vue';
import { ref } from 'vue';
import { useAccountStore } from '../stores/account-store';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

const $q = useQuasar();
const accStore = useAccountStore();
const { addNewCard } = accStore;
const { balance } = storeToRefs(accStore);

const name = ref('');

const tab = ref('debit');
const showAddCard = ref(false);
function setShowAddCard() {
  showAddCard.value = true;
}
</script>

<style scoped>
.mainPage {
  background: #0c365a;
}
.newCardBtn::before {
  border: 0;
  outline: none;
  background: transparent;
  box-shadow: none;
}
.newCardBtn {
  text-transform: none;
  border-radius: 8px;
}
.cardsSelectorTabs {
  display: flex;
}
.cardsSelectorTabs .q-tab {
  flex-grow: 0;
  padding: 0;
  margin-right: 30px;
  text-transform: none;
}
.logoIcon {
  margin-top: -10px;
}
.cardCarouselControl {
  width: 8px;
  height: 8px;
}
.deskCardContainer {
  width: 420px;
}
.deskCardDetailContainer {
  flex-grow: 1;
}
</style>
