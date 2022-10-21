<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header" elevated>
      <q-toolbar>


        <q-toolbar-title class=" row appname">

          <div class="appname" >
            {{AppName}}
          </div>

          <div >
            <q-icon class="cart"  size="lg" color="orange" name="mdi-cart"> </q-icon>

          </div>





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
import { defineComponent,ref, onMounted } from 'vue'
import TweenMax from 'gsap'
import {useQuasar} from 'quasar'





export default defineComponent({
  name: 'LoginLayout',
  toggleValue : ref(true),


  setup () {
    const $q = useQuasar()

    onMounted(()=> {

      console.log('aqlagh !! ',$q.platform.is.mobile)

        TweenMax.to(".cart",{duration : 2.5,opacity:1, x:'50%'})

        TweenMax.from(".cart",{opacity:1,duration : 2, rotation:100})
        TweenMax.fromTo(".appname", {x:'-100%'}, {duration : 2,opacity:1, x:'10%'})
        TweenMax.to(".cart",{duration : 2,opacity:1, x:'0%',delay:3, ease:'bounce'})
        TweenMax.to(".appname",{duration : 1.5,opacity:1, x:'0%',delay:3})






      })



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
