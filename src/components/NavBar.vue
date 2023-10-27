<template>
  <q-footer
    v-if="$q.screen.lt.md"
    bordered
    class="bg-white text-primary shadow-5 q-pa-sm"
  >
    <q-tabs
      no-caps
      active-color="primary"
      indicator-color="transparent"
      class="text-grey-4 text-weight-bold"
      v-model="currTab"
    >
      <q-tab v-for="tab in tabs" :key="tab.name" :name="tab.name">
        <img
          v-if="currTab === tab.name"
          class="footerIcons"
          :src="imageUrl(tab.iconSrc)"
          alt=""
        />
        <img
          v-else
          class="footerIcons"
          alt=""
          :src="imageUrl(tab.inactiveIconSrc)"
        />
        {{ tab.label }}
      </q-tab>
    </q-tabs>
  </q-footer>
  <q-drawer v-else :model-value="true" bordered behavior="desktop" :width="340">
    <q-scroll-area class="fit sidebarContainer">
      <img src="../assets/logos/Logo-color-full.svg" class="q-mb-md" />
      <p class="q-mb-xl text-grey-7">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </p>
      <q-list>
        <template v-for="(tab, index) in tabs" :key="index">
          <q-item
            clickable
            :active="tab.name === currTab"
            @click="setCurrTab(tab.name)"
            v-ripple
            class="q-px-none q-py-md q-my-lg"
          >
            <q-item-section avatar class="q-px-none deskNavIcon">
              <img
                v-if="currTab === tab.name"
                class="footerIconsDesk"
                :src="imageUrl(tab.iconSrc)"
                alt=""
              />
              <img
                v-else
                class="footerIconsDesk"
                alt=""
                :src="imageUrl(tab.inactiveIconSrc)"
              />
            </q-item-section>
            <q-item-section
              :class="`${
                tab.name === currTab ? 'text-primary' : 'text-white'
              } text-weight-bold`"
            >
              {{ tab.label }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IFooterTabs } from './models';

const tabs: IFooterTabs[] = [
  {
    name: 'home',
    label: 'Home',
    iconSrc: 'logos/Logo-color-icon.svg',
    inactiveIconSrc: 'logos/Logo-white-icon.svg',
  },
  {
    name: 'cards',
    label: 'Cards',
    iconSrc: 'icons/cards-color.svg',
    inactiveIconSrc: 'icons/cards-inactive.svg',
  },
  {
    name: 'payments',
    label: 'Payments',
    iconSrc: 'icons/payments-color.svg',
    inactiveIconSrc: 'icons/payments-inactive.svg',
  },
  {
    name: 'credit',
    label: 'Credit',
    iconSrc: 'icons/Credit-color.svg',
    inactiveIconSrc: 'icons/Credit.svg',
  },
  {
    name: 'profile',
    label: 'Profile',
    iconSrc: 'icons/user-color.svg',
    inactiveIconSrc: 'icons/user.svg',
  },
];

const imageUrl = (path: string) =>
  new URL(`../assets/${path}`, import.meta.url).href;

const currTab = ref('cards');
const setCurrTab = (newTab: string) => (currTab.value = newTab);
</script>

<style scoped>
.footerIcons {
  height: 24px;
  width: 24px;
}
.footerIconsDesk {
  height: 24px;
  width: 24px;
}
.sidebarContainer {
  background: #0c365a;
  padding: 48px;
}
.deskNavIcon {
  min-width: 30px;
  margin-right: 16px;
}
</style>
