<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center"> Login </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[val=>(val && val.length > 0) || 'Une adresse email est obligatoire']"
          type ="email"
        />

        <q-input
          label="Mot de passe"
          v-model="form.password"
          lazy-rules
          :rules="[val=>(val && val.length > 0) || 'Un mot de passe est obligatoire']"
          type ="password"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="S'identifier"
            color="primary"
            class="full-width"

            rounded
            type="submit"
          />



        </div>
        <div class="full-width q-pt-md q-gutter-y-sm">

          <q-btn
            label="S'inscrire"
            color="primary"
            class="full-width"
            flat
            rounded
            to="/register"
          />

          <q-btn
            label="Mot de passe oublié "
            color="primary"
            class="full-width"
            flat
            :to="{name : 'forgot-password'}"
          />



        </div>

      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent,ref} from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'


export default defineComponent({
  name: 'PageLogin',

  setup () {

    const router = useRouter()
    const {login} = useAuthUser()
    const {notifyError,notifySuccess} = useNotify()


    const form = ref({
      email:'',
      password: ''
    })

    const handleLogin = async () => {
      try {

        await login(form.value)

        router.push({name:'me'})
        notifySuccess('Bienvenu !')

      } catch (error) {
        notifyError(error.message)

      }
    }

    return {
      form,
      handleLogin
    }

  }
})
</script>
