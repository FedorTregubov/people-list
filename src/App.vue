<template>
  <div class="wrapper">
    <div class="container">
      <AppNav />
    </div>
    <div class="page container mt-3" :class="{ loading }">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import AppNav from '@/components/system/AppNav.vue'
import { useStore } from 'vuex'
import { ActionTypes } from './store/actions'

export default defineComponent({
  components: {
    AppNav,
  },
  setup() {
    const store = useStore()

    const loading = computed(() => store.state.loading)
    onMounted(() => store.dispatch(ActionTypes.FetchPeople))

    return { loading }
  },
})
</script>

<style lang="scss" scoped>
.page {
  min-height: 300px;
}
.loading {
  position: relative;
  &:after {
    content: 'Loading...';
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
</style>
