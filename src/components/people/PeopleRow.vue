<template>
  <tr class="person-item">
    <td>{{ person.id }}</td>
    <td>{{ person.name }}</td>
    <td>
      <PeopleButton
        v-if="!!action"
        :action="action"
        :item="person"
        class="align-self-end"
      />
      <template v-else-if="person.action">
        {{ person.action }}
      </template>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PeopleButton from '@/components/people/PeopleButton.vue'

export default defineComponent({
  name: 'PeopleRow',

  components: { PeopleButton },

  props: {
    person: {
      type: Object,
      required: true,
    },
    action: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.people-item {
  &__name {
    margin: 0 1rem;
  }
}
</style>
