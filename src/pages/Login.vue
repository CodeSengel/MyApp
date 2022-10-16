<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLoginWithEmail">
      <p class="col-12 text-h5 text-center"> S'identifier </p>
      <div class=" col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
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
          autocomplete="on"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="S'identifier"
            class="full-width mybutton"
            color="primary"
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

<!-- Comment
          <q-btn
            label="Google"
            color="primary"


            rounded
            @click="handleLoginWithGoogleAccount"
            :to="'/me'"
          />
-->


        </div>

        <q-img
        style="width:50%; margin-left: 30%;"
        src="https://cdn.pixabay.com/photo/2014/04/02/10/53/shopping-cart-304843_960_720.png"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent,ref, onMounted,} from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'





export default defineComponent({
  name: 'PageLogin',


  setup () {

    const router = useRouter()
    const {login , isLoggedIn,loginWithSocialProvider} = useAuthUser()
    const {notifyError,notifySuccess} = useNotify()
    const refresh= ref(false)


    const form = ref({
      email:'',
      password: ''
    })






    onMounted(() => {

      if (isLoggedIn) {

        router.push({name:'me'})
      }else{console.log("is not logged in")}
    })

    const checkEmailExist = ref(false)

    const handleLoginWithEmail = async () => {

        try {

              await login(form.value)

              router.push({name:'me'})
              notifySuccess('Bienvenu !')

            } catch (error) {
              notifyError(error.message)

            }



    }

    const   handleLoginWithGoogleAccount = async () => {

       await loginWithSocialProvider('google')


    }







        /*
        console.log("check1"),
        router.go(router.currentRoute),
        console.log("check2") */



    return {
      form,
      handleLoginWithEmail,
      handleLoginWithGoogleAccount,



    }

  }
})
</script>



