<template>
  <q-item
    clickable
    :to = "({name : routername , params : {'id' : paramvalue} })"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" :color="color" :size="size" />
    </q-item-section>

    <q-item-section>
      <q-item-label style="font-size:large">  {{ title }}   </q-item-label>
      <q-item-label caption style="font-size:small" >{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent,onMounted } from 'vue'

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
    },
    color : {
      type: String,
      default: ''
    },
    paramvalue : {
      type: String,
      default: ''
    }

  },


})
</script>
