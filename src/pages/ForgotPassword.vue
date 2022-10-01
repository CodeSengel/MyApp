<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordForgot">
      <p class="col-12 text-h5 text-center"> Mot de passe oublié  </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="email"
          lazy-rules
          :rules="[val=>(val && val.length > 0) || 'Une adresse email est obligatoire']"
          type ="email"
        />



        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Envoyer un email de récupération"
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
            :to ="{name:'login'}"
          />
        </div>


      </div>
    </q-form>


  </q-page>
</template>

<script>
import { defineComponent,ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'



export default defineComponent({
  name: 'PageForgotPassword',
  setup (){
    const {notifyError,notifySuccess} = useNotify()

    const {sendPasswordResetEmail,checkUserExist} = useAuthUser()
    const email = ref('')
    var EmailAlredyExist = ref(true)

    const handlePasswordForgot = async () => {

      console.log('check1')

      try {
        EmailAlredyExist =true
        console.log('check2')
        await checkUserExist(email.value)
        console.log('check3')
      } catch (error) {
        console.log('check4')
        if (error && error.code == 23503){
          console.log('check5')
          EmailAlredyExist=false
          console.log('check6')

        } else {console.log('check7') , EmailAlredyExist=true , console.log('check8')}

      }

      console.log('voici le check  : ',EmailAlredyExist)
      if(EmailAlredyExist == true) {
        console.log('check9')

        try {
          console.log('check10')
          await sendPasswordResetEmail(email.value)
          console.log('check11')
          notifySuccess("Password reset email sent to : " + email.value)
          console.log('check12')
        } catch (error) {
          console.log('check13')
          notifyError(error.message)
          console.log('check14')
        }


        }

      else{

        console.log('check15')
        notifyError("compte n'existe pas " )
        console.log('check16')


      }









    }

     return {
      email,
      handlePasswordForgot
    }
  }
})
</script>
