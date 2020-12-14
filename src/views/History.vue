<template>
  <div class="history">
    <h1>{{ headerPrefix }}History</h1>
    <AppTable :columns="['Id', 'Name', 'Action', 'Updated At']" :key="action">
      <template v-if="history" v-slot:row>
        <tr v-for="item in history" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.action }}</td>
          <td>{{ formatDate(item.updatedAt) }}</td>
        </tr>
      </template>
    </AppTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import AppTable from '@/components/ui/AppTable.vue'
import { PeopleAction } from '@/store/state'
import { useStore } from 'vuex'
import { formatDate } from '@/utils/formatters'

export default defineComponent({
  name: 'History',

  components: { AppTable },

  props: {
    action: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const headerPrefix = computed((): string => {
      if (props.action === PeopleAction.add) {
        return 'Add '
      } else if (props.action === PeopleAction.rm) {
        return 'Removals '
      } else {
        return ''
      }
    })

    const store = useStore()
    const history = computed((): [] => {
      if (props.action === PeopleAction.add) {
        return store.getters.historyAdd
      } else if (props.action === PeopleAction.rm) {
        return store.getters.historyRm
      } else {
        return store.state.history
      }
    })

    return {
      history,
      headerPrefix,
      formatDate,
    }
  },
})
</script>
