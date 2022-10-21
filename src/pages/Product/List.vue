<template>

  <q-page v-if="admin" padding class="justify-center">

    <div class="row-11 ">


      <q-linear-progress v-if="loading" indeterminate />

      <q-table
        title="Categories"
        :rows="products "
        :columns="columnsProduct"
        row-key="id"
        class="col-12"
        :rows-per-page-options="[0]"


      >

      <template v-slot:top>
        <span >
         <strong> Produits </strong>
        </span >
        <q-space/>
        <q-btn
          v-if="$q.platform.is.desktop"
          label = "Ajouter"
          color = "primary"
          icon = "mdi-plus"
          :to= "{name : 'form-product'}"
        />
      </template>


      <template  v-slot:body-cell-img_url="props">

        <q-td :props="props">
          <q-avatar  v-if="props.row.img_url">
            <img  :src = "props.row.img_url"  />
          </q-avatar>

          <q-avatar v-else color="grey-4" icon="mdi-image-off" />

        </q-td>
      </template>


      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)" >
            <q-tooltip>
              modifier
            </q-tooltip>
          </q-btn>

          <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveProduct(props.row)">
            <q-tooltip>
              supprimer
            </q-tooltip>
          </q-btn>



        </q-td>
      </template>

      </q-table>


    </div>

      <q-page-sticky
      v-if="$q.platform.is.mobile"
      position="bottom-right"
      :offset="[20,100]" >

        <q-btn fab icon="mdi-plus" color = "indigo" :to= "{name : 'form-product'}" />

      </q-page-sticky>


  </q-page>

</template>


<script>
import { defineComponent,ref, onMounted} from 'vue'

import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import {useQuasar} from 'quasar'
import{columnsProduct} from './table'
import useAuthUser from 'src/composables/UseAuthUser'



export default defineComponent ({
  name : 'PageProductList',

  setup(){

    const CategoriesTabName = process.env.QUASAR_APP_TAB_NAME_PRODUITS
    const products = ref([])
    const {list,remove,removefromlikes} = useApi()
    const {notifyError, notifySuccess} = useNotify()
    const loading = ref(true)
    const loadingAllPage = ref(true)
    const router = useRouter()
    const $q = useQuasar()
    const {user , checkUserAdmin} = useAuthUser()
    const admin = ref(false)

    const handleCheckBig = async (message) =>  {

    admin.value = await checkUserAdmin(message)

    }

    const handleListProducts = async () => {

      try {
        loading.value = true
        products.value = await list(CategoriesTabName)
        loading.value = false
      } catch (error) {
        notifyError(error.message)

      }

    }

    const handleEdit = (product) => {
      router.push({name : 'form-product',  params : {id: product.id}})
    }

    const handleRemoveProduct = async (product) => {

      try {
        $q.dialog({
          title : 'Confirmer !',
          message : 'Voulez-vous vraiement supprimer ' + '" ' +  product.name + ' "' + ' ?',
          cancel: true,
          persistent : true
        }).onOk(async () => {

          await removefromlikes('produits_likes','product_id',product.id)
          await remove(CategoriesTabName , product.id )
          notifySuccess('le produit a bien été supprimée ')
          handleListProducts()
        })
      } catch (error) {
        notifyError(error.message)

      }

    }

    onMounted (() => {
      handleCheckBig(user.value.id)
      handleListProducts()

    })




    return{
      columnsProduct,
      products,
      loading,
      handleEdit,
      handleRemoveProduct,
      admin


    }
  }

  })
</script>
