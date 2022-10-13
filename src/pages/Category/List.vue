<template>

  <q-page padding class="justify-center">

    <div class="row ">

      <q-linear-progress v-if="loading" indeterminate />

      <q-table
        title="Categories"
        :rows="categories "
        :columns="columns"
        row-key="id"
        class="col-12"

      >

      <template v-slot:top>
        <span >
         <strong> Categories </strong>
        </span >
        <q-space/>
        <q-btn
          label = "Ajouter"
          color = "primary"
          icon = "mdi-plus"
          :to= "{name : 'form-category'}"
        />
      </template>


      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)" >
            <q-tooltip>
              modifier
            </q-tooltip>
          </q-btn>

          <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveCategory(props.row)">
            <q-tooltip>
              supprimer
            </q-tooltip>
          </q-btn>



        </q-td>
      </template>

      </q-table>





    </div>

  </q-page>

</template>


<script>
import { defineComponent,ref, onMounted} from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import {useQuasar} from 'quasar'
const columns = [

  { name: 'name', align: 'left', label: 'Nom', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: true },


]


export default defineComponent ({
  name : 'PageCategoryList',

  setup(){
    const CategoriesTabName = process.env.QUASAR_APP_TAB_NAME_CATEGORIES
    const categories = ref([])
    const {list,remove} = useApi()
    const {notifyError, notifySuccess} = useNotify()
    const loading = ref(true)
    const loadingAllPage = ref(true)
    const router = useRouter()
    const $q = useQuasar()


    const handleListCategories = async () => {

      try {
        loading.value = true
        categories.value = await list(CategoriesTabName)
        loading.value = false
      } catch (error) {
        notifyError(error.message)

      }

    }

    const handleEdit = (category) => {
      router.push({name : 'form-category',  params : {id: category.id}})
    }

    const handleRemoveCategory = async (category) => {

      try {
        $q.dialog({
          title : 'Confirmer !',
          message : 'Voulez-vous vraiement supprimer ' + '" ' +  category.name + ' "' + ' ?',
          cancel: true,
          persistent : true
        }).onOk(async () => {
          await remove(CategoriesTabName , category.id )
          notifySuccess('la catégory a bien été supprimée ')
          handleListCategories()
        })
      } catch (error) {
        notifyError(error.message)

      }

    }

    onMounted (() => {
      handleListCategories()

    })




    return{
      columns,
      categories,
      loading,
      handleEdit,
      handleRemoveCategory


    }
  }

  })
</script>
