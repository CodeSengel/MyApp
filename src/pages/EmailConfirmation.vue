<template>
  <q-page padding class="row justify-center">
    <p>
      Thank you for your registration
    </p>
    <br>
    <p>
      We just sent an email to : <strong> {{$route.query.email}} </strong> please confirm to complete the registration.
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
