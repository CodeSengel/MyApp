<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>


        <q-toolbar-title>
          {{AppName}}
        </q-toolbar-title>

        <q-toggle
        v-model="toggleValue"

        color="black"
        @click="changemode"


      />


      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent,ref } from 'vue'



export default defineComponent({
  name: 'LoginLayout',
  toggleValue : ref(true),

  setup () {



    var AppName = process.env.QUASAR_APP_NAME

    return {
      AppName,
      toggleValue: ref(true),
    }
  },

  methods : {
    changemode : function () {

    this.$q.dark.set(this.toggleValue) }
  }
})
</script>
