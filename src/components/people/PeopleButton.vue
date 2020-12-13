<template>
  <button type="button" :class="['btn', 'btn-sm', className]" @click="doAction">
    {{ action }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { PeopleAction, PeopleItem } from '@/store/state'
import { useStore } from 'vuex'
import { MutationType } from '@/store/mutations'

export default defineComponent({
  name: 'PeopleButton',

  props: {
    item: {
      type: Object as () => PeopleItem,
      required: true,
    },
    action: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const className = computed((): string | undefined => {
      let res = ''
      if (props.action === PeopleAction.add) {
        res += 'btn-success'
      } else if (props.action === PeopleAction.rm) {
        res += 'btn-danger'
      }
      return res
    })

    const store = useStore()
    const doAction = () => {
      const payload = {
        ...props.item,
        action: props.action,
      }
      store.commit(MutationType.SetAction, payload)
      store.commit(MutationType.CreateHistory, {
        ...payload,
        updatedAt: Date.now(),
      })
    }

    return {
      className,
      doAction,
    }
  },
})
</script>

<style lang="scss" scoped>
.btn {
  min-width: 2rem;
  font-size: 1rem;
}
</style>
