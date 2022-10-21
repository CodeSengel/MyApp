<template>
  <q-page padding >


    <div class=" iconcaddie q-ml-none " style="margin-top: 25%;">
      <q-icon size="200px" color="indigo" name="mdi-cart" />

    </div>



  </q-page>
</template>

<script>


  import TweenMax from 'gsap'
  import {defineComponent , ref , onMounted , computed } from 'vue'


  export default defineComponent ({

    setup(){


      onMounted(()=> {


        TweenMax.to(".iconcaddie",{duration : 4,opacity:0.5, x:'+150%',ease:'bounce'})

      })

    }


  })

</script>





<style>
  .iconcaddie{
    margin-left: 13%;

  }
</style>
