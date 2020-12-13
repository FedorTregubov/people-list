<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link
      :to="{ name: 'home' }"
      title="Home"
      class="navbar-brand"
      active-class="navbar-brand active"
      exact
    >
      Home
    </router-link>

    <ul class="navbar-nav">
      <li v-for="menuItem in menu" :key="menuItem.title" class="nav-link">
        <router-link
          :to="{ name: menuItem.name, params: menuItem.params }"
          :title="menuItem.title"
          class="nav-link"
          active-class="active"
          exact
        >
          {{ menuItem.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PeopleAction } from '@/store/state'

interface MenuItem {
  name: string
  title: string
  params?: object
}

export default defineComponent({
  name: 'AppNav',

  setup() {
    const menu: Array<MenuItem> = [
      { name: 'history', title: 'History' },
      {
        name: 'history',
        title: 'Removals history',
        params: { action: PeopleAction.rm },
      },
      {
        name: 'history',
        title: 'Add history',
        params: { action: PeopleAction.add },
      },
    ]

    return {
      menu,
    }
  },
})
</script>
