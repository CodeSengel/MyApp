<template>
  <q-page class="flex flex-center">

    <div v-if=user>
      <p> Azul {{user.user_metadata.name}} </p>

    </div>

  </q-page>
</template>

<script>
import useAuthUser from 'src/composables/UseAuthUser'
import { defineComponent,ref } from 'vue'
import useApi from  'src/composables/UseApi'


export default defineComponent({
  name: 'PageMe',




  setup (){

    const {user} = useAuthUser()
    const {list,post} = useApi()


    const handlelist = async () => {
      var test = ref()
      test = await list ('list1',"id")
      console.log(test)
    }
    const handlepost = async () => {

      await list ('list1',{id : '3' , Name:'testfromfunc'})
      console.log(test)
    }

    return {
      user,
      handlelist,
      handlepost
    }
  }






})
</script>
