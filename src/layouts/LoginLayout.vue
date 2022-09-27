<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>


        <q-toolbar-title>
          {{AppName}}
        </q-toolbar-title>


      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'



export default defineComponent({
  name: 'LoginLayout',

  setup () {



    var AppName = process.env.QUASAR_APP_NAME

    return {
      AppName
    }
  }
})
</script>
