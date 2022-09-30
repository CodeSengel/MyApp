<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center"> Register </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

        <q-input
          label="Nom"
          v-model="form.name"
          lazy-rules
          :rules="[val=>(val && val.length > 0) || 'Un nom est obligatoire']"

        />

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
          :rules="[val=>(val && val.length >= 6) || 'Un mot de passe est obligatoire avec 6 caractères au minimum']"
          type = "password"


        />

        <div class="full-width q-pt-md q-gutter-y-md">
          <q-btn
            label="S'inscrire"
            color="primary"
            class="full-width"

            rounded
            type="submit"
          />
          <q-btn
            label="Retourner"
            color="primary"
            class="full-width"
            outline
            rounded
            :to="{name:'login'}"
          />
        </div>


      </div>
    </q-form>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser';
import {useRouter} from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageRegister',
  setup (){
    const {notifyError,notifySuccess} = useNotify()
    const router = useRouter()
    const {register} = useAuthUser()

    const form = ref({
      name:'',
      email:'',
      password:''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        router.push({
          name:'email-confirmation',
          query :{email: form.value.email}
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
