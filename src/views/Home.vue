<template>
  <div class="home">
    <div class="row align-items-start">
      <div class="col-sm">
        <PeopleSearch class="mb-3" @search="search = $event" />
        <AppTable :columns="['Id', 'Name', 'Action']" :key="peopleActions.add">
          <template v-if="items" v-slot:row>
            <tr v-for="item in items" :key="item.id + peopleActions.add">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <PeopleButton
                  :action="peopleActions.add"
                  :item="item"
                  class="align-self-end"
                />
              </td>
            </tr>
          </template>
        </AppTable>
      </div>
      <div class="col-sm-2 d-flex justify-content-center">
        <span class="home-arrow">-></span>
      </div>
      <div class="home-right col-sm d-flex">
        <AppTable :columns="['Id', 'Name', 'Action']" :key="peopleActions.rm">
          <template v-if="itemsAdded" v-slot:row>
            <tr v-for="item in itemsAdded" :key="item.id + peopleActions.rm">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <PeopleButton
                  :action="peopleActions.rm"
                  :item="item"
                  class="align-self-end"
                />
              </td>
            </tr>
          </template>
        </AppTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import PeopleSearch from '@/components/people/PeopleSearch.vue'
import PeopleButton from '@/components/people/PeopleButton.vue'
import AppTable from '@/components/ui/AppTable.vue'
import { PeopleItem, PeopleAction } from '@/store/state'
const store = useStore()

interface PersonSorted extends PeopleItem {
  matchesCount?: number
}

export default defineComponent({
  name: 'Home',

  components: {
    PeopleSearch,
    PeopleButton,
    AppTable,
  },

  setup() {
    const search = ref('')
    const peopleActions = {
      add: PeopleAction.add,
      rm: PeopleAction.rm,
    }

    const itemsAdded = computed(() => store.getters.itemsAdded)

    const items = computed(() => {
      if (!search.value) return store.getters.itemsNonAdded

      const regExp = new RegExp(search.value, 'gi')
      const itemsFiltered = store.getters.itemsNonAdded.reduce(
        (acc: PersonSorted[], curr: PersonSorted) => {
          let matchesCount = 0
          const nameMatches = curr.name.match(regExp)
          if (nameMatches) {
            matchesCount += nameMatches.length
          }
          if (curr.items) {
            const itemsMatches = curr.items.reduce((acc, curr) => {
              const nameMatches = curr.name.match(regExp)
              if (nameMatches) {
                acc += nameMatches.length
              }
              return acc
            }, 0)
            matchesCount += itemsMatches
          }
          if (matchesCount) {
            acc.push({ ...curr, matchesCount })
          }
          return acc
        },
        []
      )

      const itemsSorted = itemsFiltered.sort((a, b) => {
        if (!a.matchesCount) {
          return -1
        } else if (b.matchesCount && a.matchesCount) {
          return b.matchesCount - a.matchesCount
        } else {
          return -1
        }
      })

      return itemsSorted
    })

    return {
      search,
      peopleActions,
      items,
      itemsAdded,
    }
  },
})
</script>

<style lang="scss" scoped>
.home-arrow {
  margin-top: 96px;
}
.home-right {
  margin-top: 86px;
}
</style>
