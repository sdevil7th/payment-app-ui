<template>
  <div
    :class="
      $q.screen.lt.md
        ? 'bg-white q-pa-lg scrollContent'
        : 'bg-white q-py-lg q-pl-lg scrollContent'
    "
  >
    <q-expansion-item expand-separator class="expansionItem">
      <template v-slot:header>
        <q-item-section avatar class="expansionHeaderIcon">
          <img src="../assets/icons/card-details.svg" />
        </q-item-section>

        <q-item-section class="text-blue-10 text-weight-bold">
          Card details
        </q-item-section>
      </template>
      <q-card class="expansionCardContent">
        <q-card-section>
          <p class="loremIpsum">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </p>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      v-if="selectedCardTxns.length"
      expand-separator
      class="q-mt-lg expansionItem"
    >
      <template v-slot:header>
        <q-item-section avatar class="expansionHeaderIcon">
          <img src="../assets/icons/recent-txn.svg" />
        </q-item-section>

        <q-item-section class="text-blue-10 text-weight-bold">
          Recent transactions
        </q-item-section>
      </template>
      <q-card class="expansionCardContent">
        <q-card-section>
          <div
            v-for="txn in selectedCardTxns"
            :key="txn.id"
            class="q-px-md txnItem"
          >
            <div class="row items-start justify-between">
              <div
                v-if="txn.category === 'flight'"
                class="bg-green-1 txnTypeImgContainer"
              >
                <img src="../assets/icons/flights.svg" />
              </div>
              <div
                v-if="txn.category === 'unknown'"
                class="bg-blue-1 txnTypeImgContainer"
              >
                <img src="../assets/icons/file-storage.svg" />
              </div>
              <div
                v-if="txn.category === 'entertainment'"
                class="bg-pink-1 txnTypeImgContainer"
              >
                <img src="../assets/icons/megaphone.svg" />
              </div>
              <div class="txnDetailContainer">
                <div class="row justify-between items-start">
                  <div>
                    <p class="text-grey-10 text-weight-bold q-mb-xs">
                      {{ txn.name }}
                    </p>
                    <p class="text-grey-5 q-mb-md">{{ txn.date }}</p>
                  </div>
                  <div class="row items-center">
                    <p
                      v-if="txn.txnType === 'credit'"
                      class="text-primary text-weight-bold q-mr-md q-mb-none"
                    >
                      + S$ {{ txn.amount }}
                    </p>
                    <p
                      v-else
                      class="text-grey-10 text-weight-bold q-mr-md q-mb-none"
                    >
                      - S$ {{ txn.amount }}
                    </p>
                    <img
                      src="../assets/icons/next.svg"
                      class="txnDetailLinkIcon"
                    />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="q-mr-sm descIconContainer">
                    <img src="../assets/icons/card-white.svg" />
                  </div>
                  <span class="text-blue-10 text-weight-bold">{{
                    txn.desc
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <div
      v-if="selectedCardTxns.length"
      class="row items-center justify-center q-pa-md bg-green-1 text-primary text-weight-bold viewAllTxnsLink"
    >
      View all card transactions
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '../stores/account-store';
import { storeToRefs } from 'pinia';

const accStore = useAccountStore();
const { selectedCardTxns } = storeToRefs(accStore);
</script>

<style scoped>
.expansionItem {
  border: 1px solid #f0f0f0;
}
.expansionHeaderIcon {
  width: 24px;
  min-width: 24px;
  margin-right: 12px;
}
.expansionCardContent {
  border-radius: 12px;
}
.txnItem {
  border-bottom: 1px solid #f5f5f5;
  padding: 14px 0px;
}
.txnItem:last-child {
  border-bottom: 0;
}
.txnItem:hover {
  cursor: pointer;
  background: #fafcff;
}
.txnTypeImgContainer {
  width: 48px;
  height: 48px;
  padding: 16px;
  border-radius: 50%;
}
.txnDetailContainer {
  flex-grow: 1;
  margin-left: 12px;
}
.descIconContainer {
  padding: 4px 12px;
  background: #325baf;
  border-radius: 14px;
}
.txnDetailLinkIcon {
  height: 12px;
}
.scrollContent {
  pointer-events: all;
  min-height: calc(100vh - 530px);
  min-width: 325px;
  width: 100%;
}
.viewAllTxnsLink {
  padding-top: 36px;
  margin-top: -20px;
  border-radius: 12px;
  margin-bottom: 70px;
}
.viewAllTxnsLink:hover {
  cursor: pointer;
}
.loremIpsum {
  max-width: 420px;
}
</style>
