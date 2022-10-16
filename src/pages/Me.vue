<template>
  <q-page class="flex flex-center">

    <div class="row">
      <q-page-sticky

        position="top-right"
        :offset="[2,2]" >

       <q-icon    :color=" admin ? 'black' : 'indigo' " name="mdi-circle" />

      </q-page-sticky>








    </div>

    <div v-if=user>
      <p> Azul {{user.user_metadata.name}} </p>



    </div>

  </q-page>
</template>

<script>
import useAuthUser from 'src/composables/UseAuthUser'
import { defineComponent,ref, onMounted } from 'vue'
import useApi from  'src/composables/UseApi'


export default defineComponent({
  name: 'PageMe',




  setup (){

    const {user , checkUserAdmin} = useAuthUser()
    const {list,post} = useApi()
    const admin = ref(false)

    const handleCheckBig = async (message) =>  {

      admin.value = await checkUserAdmin(message)

    }



    onMounted(()=> {

      handleCheckBig(user.value.id)

    })

    return {
      user,
      admin

    }
  }






})
</script>
