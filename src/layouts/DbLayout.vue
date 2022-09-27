<template>

  DB page

  <button @click="handleLog"> clcick </button>

</template>

<script>
  import { defineComponent, ref } from 'vue'


  import { supabase } from '../supabase'
export default defineComponent({

  name: 'DbLayout',

  setup(){


    const handleLog = async ()=>{
      try {
        console.log("test log")

        let { data, error } = await supabase
        .from('list1')
        .select('*')



        console.log(data)

      } catch (error) {
        console.log(error)
      }
    }
    return{
      handleLog

  }
  }




  })
</script>
