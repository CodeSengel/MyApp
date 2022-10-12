<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header" elevated>
      <q-toolbar>


        <q-toolbar-title>
          {{AppName}}

          <q-icon size="lg" color="orange" name="mdi-cart"> </q-icon>


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

<style>
  .header{
    background: linear-gradient(to top, #30cfd0 0%, #330867 120%);
  }
</style>
