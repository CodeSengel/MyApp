<template>
  <q-item
    clickable
    :to = "{name : routername}"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" :size="size" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    routername: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },
    size : {
      type: String,
      default: ''
    }
  }
})
</script>
