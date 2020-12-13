<template>
  <div class="people-search">
    <label for="people-search" class="form-label">Name:</label>
    <input
      type="search"
      id="people-search"
      class="form-control"
      placeholder="Person name"
      :value="displayValue"
      @input="debounceListener"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PeopleSearch',

  setup(_, { emit }) {
    let timeoutRef: number | null = null
    const displayValue = ref('')
    const debouncedValue = ref('')

    type HTMLElementEvent<T extends HTMLElement> = Event & {
      target: T
    }

    const debounceListener = (e: HTMLElementEvent<HTMLTextAreaElement>) => {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef)
      }

      displayValue.value = e.target.value
      timeoutRef = setTimeout(() => {
        debouncedValue.value = e.target.value
        emit('search', debouncedValue.value.toLowerCase())
      }, 500)
    }

    return { debouncedValue, displayValue, debounceListener }
  },
})
</script>
