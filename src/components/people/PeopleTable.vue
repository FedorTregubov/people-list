<template>
  <table class="table table-hover align-middle">
    <thead class="table-light">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="people.length">
        <PeopleRow
          v-for="person in people"
          :key="person.id"
          :person="person"
          :action="action"
        />
      </template>
      <template v-else>
        <tr>
          <td colspan="3">There is no people yet.</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PeopleRow from '@/components/people/PeopleRow.vue'

export default defineComponent({
  name: 'PeopleTable',

  components: { PeopleRow },

  props: {
    people: {
      type: Array,
      required: true,
    },
    action: {
      type: String,
      default: '',
    },
  },
})
</script>
