<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6 q-mt-md">
          Liste des catégories
        </p>
      </div>

      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent ="handleSubmit">

        <q-input

          label = "Nom"
          v-model = "form.name"
          :rules="[val=>(val && val.length > 0) || 'Le nom de la nouvelle catégorie est obligatoire']"
        />

        <q-btn
          :label=" isUpdate ? 'Modifier' : 'Ajouter'"
          color="primary"
          class="full-width"
          rounded
          type="submit"
        />

        <q-btn
          label="Annuler"
          color="primary"
          class="full-width"
          flat
          :to = "{name : 'category'}"
        />





      </q-form>



    </div>

  </q-page>
</template>


<script>

  import {defineComponent , ref , onMounted , computed } from 'vue'
  import {useRouter , useRoute} from 'vue-router'
  import useApi from 'src/composables/UseApi'
  import useNotify from 'src/composables/UseNotify'

  export default defineComponent ({
    name : 'PageFormCategory',
    setup () {
      const table = process.env.QUASAR_APP_TAB_NAME_CATEGORIES
      const router = useRouter()
      const route = useRoute()
      const {post , getById, update} = useApi()
      const {notifyError,notifySuccess} = useNotify()
      const isUpdate = computed (() => route.params.id)
      let category = {}
      const form = ref ({
        name : ''
      })

      onMounted(()=> {
        if(isUpdate.value){
          handleGetCategory(isUpdate.value)
        }
      })


      const handleSubmit = async () => {
        try {

          if(isUpdate.value){
            await update(table, form.value)
            notifySuccess('Modifications enregistrées')
          } else {
            await post(table , form.value)
            notifySuccess('Nouvelle catégorie crée')

          }

          router.push({name:'category'})
        } catch (error) {

          notifyError(error.message)
        }
      }

      const handleGetCategory = async (id) => {
        try {
          category = await getById(table, id)
          form.value = category
        } catch (error) {
          notifyError(error.message)
        }

      }

      return {
        handleSubmit,
        form,
        handleGetCategory,
        isUpdate,
      }
    }


  })
</script>
