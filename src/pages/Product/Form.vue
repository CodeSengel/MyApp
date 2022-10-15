<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6 q-mt-md">
          Ajouter un produit
        </p>
      </div>

      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent ="handleSubmit">

        <q-input

          label = "Nom"
          v-model = "form.name"
          :rules="[val=>(val && val.length > 0) || 'Le nom du produit est obligatoire']"
        />

        <q-input
          label = "Photo"
          v-model = "img"
          type = "file"
          accept = "image/*"
        />

        <q-editor
          v-model="form.description"
          min-height ="5rem"

        />

        <q-input

          label = "Quantité"
          v-model = "form.amount"
          :rules="[val=> !!val  || 'La quantité est obligatoire']"
          type = "number"
          />

        <q-input

          label = "Prix (DA)"
          v-model = "form.price"
          :rules="[val=> !!val  || 'Le prix est obligatoire']"
          type = "number"


        />

        <q-select
          v-model = "form.category_id"
          :options = "optionsCategory"
          lable="Categorie"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[val => !!val || 'La catégorie est obligatoire']"
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
          :to = "{name : 'product'}"
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
      const table = process.env.QUASAR_APP_TAB_NAME_PRODUITS
      const tableCategoy = process.env.QUASAR_APP_TAB_NAME_CATEGORIES
      const storageProduct = process.env.QUASAR_APP_STORAGE_NAME_PRODUITS
      const router = useRouter()
      const route = useRoute()
      const {post , getById, update,list , uploadImg} = useApi()
      const {notifyError,notifySuccess} = useNotify()
      const isUpdate = computed (() => route.params.id)
      let product = {}
      const optionsCategory = ref([])
      const form = ref ({
        name : '',
        description: '',
        amount: 0,
        price : 0,
        category_id:'',
        img_url : ''
      })
      const img = ref([])

      onMounted(()=> {
        handleListCategories()
        if(isUpdate.value){
          handleGetProduct(isUpdate.value)
        }
      })

      const handleListCategories = async () => {
        optionsCategory.value = await list(tableCategoy)
      }


      const handleSubmit = async () => {
        try {



          if(img.value.length > 0) {
            const imgUrl = await uploadImg(img.value[0], storageProduct )

            form.value.img_url = imgUrl
          }

          if(isUpdate.value){
            await update(table, form.value)
            notifySuccess('Modifications enregistrées')
          } else {
            await post(table , form.value)
            notifySuccess('Nouveau produit créé')

          }

          router.push({name:'product'})
        } catch (error) {

          notifyError(error.message)
        }
      }

      const handleGetProduct = async (id) => {
        try {
          product = await getById(table, id)
          form.value = product
        } catch (error) {
          notifyError(error.message)
        }

      }

      return {
        handleSubmit,
        form,
        optionsCategory,
        isUpdate,
        img

      }
    }


  })
</script>
