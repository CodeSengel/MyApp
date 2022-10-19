<template>

  <q-page padding class="justify-center">




<!--
    <q-dialog v-model="dialog">

        <q-img :src="dialogimg"/>

    </q-dialog>

  -->
  <q-dialog v-model="dialog" >


    <q-card class="my-card" flat bordered>
      <q-card-section dense vertical>



       <p> {{dialogdescription}} </p>
      </q-card-section>




      <q-card-section vertical>
        <q-img
          class="row"
          :src="dialogimg"

          style="height:100% ;width : 100%"
        >

      </q-img>



      </q-card-section>


      <q-page-sticky
          class="stickyb justify-center"
          position="bottom-right"
          :offset="[20,100]" >

        <q-card-section>
          <q-card-actions horizontal class=" justify-center row q-gutter-none">


            <q-btn class="col-3" label="J'aime" flat round color="red" icon="favorite" />
            <q-btn class="col-3" label="Acheter"  flat round color="green-2" icon="mdi-cart" />
            <q-btn class="col-3" label="Partager" flat round color="orange" icon="share" />
          </q-card-actions>


        </q-card-section>

      </q-page-sticky>





    </q-card>
  </q-dialog>






    <div class=" table ">




      <q-table

        grid
        title="Categories"
        :rows="productsliked "
        :columns="columnsProduct"
        row-key="id"
        :hide-pagination="true"
        :rows-per-page-options="[0]"
        :filter ="filter"
        :loading="loading"


      >

      <template v-slot:top>
        <span >
         <strong> Mes produits </strong>
        </span >
        <q-space/>

        <q-input debounce="300" outlined dense v-model="filter" placeholder = "Chercher un produit">
          <template v-slot:append>
            <q-icon name="search" />
          </template>

        </q-input>




      </template>


      <template v-slot:item="props">
        <!--         q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition -->
        <div class="  q-pa-xs col-xs-6 col-sm-6 col-md-4 col-lg-2 grid-style-transition">

          <q-card >

                <div v-ripple >


                  <q-img @click="dialogtrigger(props.row)  ,  dialog = true " :src="props.row.img_url" :ratio="4/3">


                  </q-img>
                </div>

                <q-card-sectio class=" bg-red text-center  text-white ">




                <figcaption class="  imglegendtitle2">
                  <div class="row text-center">
                    <div class="col-10">
                      <div style="font-size:15px ;">
                        {{ props.row.name }}
                      </div>
                    </div>



                    <div  class="col-2 q-mt-md" style="font-size: 10px ;">

                      {{ props.row.likes }}
                    </div>

                  </div>


                  <div class="row justify-center">
                    <div class="col-10 ">
                      {{props.row.price}} DA
                    </div>
                    <div class="col-2 ">

                      <q-icon  @click="liketrigger(props.row.liked,props.row.id)" :color=" props.row.liked ? 'red' : 'grey' "  size="md" class="hearticon"   name="mdi-heart">



                      </q-icon>
                    </div>


                </div>







                </figcaption>







            </q-card-sectio>





          </q-card>
        </div>



      </template>




      </q-table>


    </div>




  </q-page>

</template>


<script>
import { defineComponent,ref, onMounted} from 'vue'

import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import{columnsProduct} from './table'
import useAuthUser from 'src/composables/UseAuthUser'



export default defineComponent ({
  name : 'PageProductPublic',

  setup(){

    const CategoriesTabName = process.env.QUASAR_APP_TAB_NAME_PRODUITS
    const products = ref([])
    const productsliked = ref([])
    const {list,likefunction,dislikefunction,productlistwithlikeditem} = useApi()
    const {notifyError} = useNotify()
    const loading = ref(true)
    const loadingAllPage = ref(true)
    const {user , checkUserAdmin} = useAuthUser()



    const admin = ref(false)
    const filter = ref('')
    const dialog = ref(false)
    const dialogimg = ref('')
    const dialogdescription = ref('')
    const dialogprice = ref('')



    const handleCheckBig = async (message) =>  {
    admin.value = await checkUserAdmin(message)
    }

    const handleListProducts = async () => {

      try {
        loading.value = true
        //products.value = await list(CategoriesTabName)
        productsliked.value = await productlistwithlikeditem(user.value.id)
        console.log('voici 1 ',products)
        console.log('voici 2 ',productsliked)

        loading.value = false
      } catch (error) {
        notifyError(error.message)

      }

    }



    const dialogtrigger = (message) => {


      dialogimg.value = message.img_url
      dialogdescription.value = message.description
      dialogprice.value = message.price


    }

    const liketrigger = (liked , message) => {



      if (liked) {
        dislikefunction(message , user.value.id)
        handleListProducts()
        handleListProducts()
      } else {
        likefunction(message , user.value.id)
        handleListProducts()
        handleListProducts()
      }




    }











    onMounted (() => {


      handleListProducts()

    })




    return{
      columnsProduct,
      products,
      productsliked,
      loading,
      admin,
      filter,
      dialogtrigger,
      dialog,
      dialogimg,
      dialogdescription,
      dialogprice,

      liketrigger


    }
  }

  })
</script>

<style>

  .hearticon:hover {
    background-color: rgb(219, 241, 23);
  }

  .my-card{
    width: 100%;
  }


  .stickyb{

    background: linear-gradient(182deg, rgba(73, 4, 249, 0.95) 0%, rgb(65, 62, 62) 68%);
    border-radius: 10%;
  }

  .imglegendtitle1{

    background: linear-gradient(90deg, rgba(73, 4, 249, 0.95) 0%, rgb(65, 62, 62) 100%);
  }
  .imglegendtitle2{

  background:rgba(2, 139, 2, 0.6)

  }
</style>
