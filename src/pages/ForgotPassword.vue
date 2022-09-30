<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center"> Login </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
        />



        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />

          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            :to ="{name:'login'}"
          />
        </div>


      </div>
    </q-form>


  </q-page>
</template>

<script>
import useAuthUser from 'src/composables/UseAuthUser'
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'PageMe',
  setup (){
    const {user} = useAuthUser()


    return {
      user
    }
  }
})
</script>
