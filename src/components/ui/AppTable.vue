<template>
  <table :class="config.tableClass ? config.tableClass : 'table'">
    <thead class="table-light">
      <tr>
        <slot name="columns">
          <th
            v-for="(column, index) in columns"
            :key="index"
            :class="config.thClass ? config.thClass : 'th'"
          >
            {{ column }}
          </th>
        </slot>
      </tr>
    </thead>
    <tbody>
      <slot name="row">
        <template v-if="data && data.length">
          <tr v-for="(item, index) in data" :key="index">
            <td
              v-for="(column, index) in columns"
              :key="index"
              :class="config.tdClass ? config.tdClass : 'td'"
            >
              {{ itemValue(item, column) }}
            </td>
          </tr>
        </template>
        <tr v-else>
          <td :colspan="(columns && columns.length) || 1">
            {{ config.emptyText ? config.emptyText : 'There is no data yet.' }}
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'

interface TableConfig {
  tableClass?: string
  thClass?: string
  tdClass?: string
  emptyText?: string
}

export default defineComponent({
  name: 'AppTable',

  props: {
    config: {
      type: Object as () => TableConfig,
      default: {},
    },
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const getItemKey = (columnName: string): string => {
      let words = columnName.split(' ')
      words = words.map((item, index) => {
        const firstLetter =
          index === 0
            ? item.charAt(0).toLowerCase()
            : item.charAt(0).toUpperCase()
        return firstLetter + item.slice(1)
      })
      return words.join('')
    }
    const itemValue = (item: any, column: string): string | number => {
      return item[getItemKey(column)]
    }

    return {
      getItemKey,
      itemValue,
    }
  },
})
</script>
