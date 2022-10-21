<template>

  <q-page padding class="justify-center">




<!--
    <q-dialog v-model="dialog">

        <q-img :src="dialogimg"/>

    </q-dialog>

  -->
  <q-dialog v-model="dialog" >

    <q-card >

      <q-card-section class="row">


        <div class="col-10">
          <strong>  Détails </strong>
        </div>
        <div class="col-2">
          <strong> <q-icon name="mdi-heart"></q-icon> {{dialoginfo.likes}} </strong>
        </div>






      </q-card-section>

      <q-card-section class="q-pa-xs">
        <q-img v-if="dialoginfo.img_url" :src="dialoginfo.img_url" style="max-height:300px ; min-height:250px"  ></q-img>
      </q-card-section>

      <q-card-section>
        <div class="text-h6">
          {{dialoginfo.name}}
        </div>
        <div class="text-subtitle2">
          {{dialoginfo.price}} DA
        </div>
        <div class="text-subtitle3" v-html="dialoginfo.description"/>
      </q-card-section>

      <q-card-section class=" justify-center row q-gutter-md">
            <q-btn class=" col-2" label="J'aime" flat round :color=" dialoginfo.liked ? 'red' : 'grey' " icon="favorite"   @click="liketrigger(dialoginfo.liked,dialoginfo.id)"/>
            <q-btn class="col-3" label="Acheter"  flat round color="green" icon="mdi-cart" />
            <q-btn class="col-3" label="Partager" flat round color="orange" icon="share" />
      </q-card-section>

    </q-card>
  </q-dialog>






    <div  class=" table ">




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



      <template  v-slot:top>
        <span >
         <strong > Mes produits </strong>
        </span >
        <q-space/>

        <q-input debounce="300" outlined dense v-model="filter" placeholder = "Chercher un produit">
          <template v-slot:append>
            <q-icon name="search" />
          </template>

        </q-input>




      </template>


      <template  v-slot:item="props">
        <!--         q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition -->
        <div class="  q-pa-xs col-xs-6 col-sm-6 col-md-4 col-lg-2 grid-style-transition">

          <q-card style="border-top-right-radius: 10%;border-top-left-radius: 10%;">

                <div v-ripple:primary  >


                  <q-img  style="border-top-right-radius: 10%;border-top-left-radius: 10%;" @click="dialogtrigger(props.row)  ,  dialog = true " :src="props.row.img_url" :ratio="4/3">


                  </q-img>
                </div>

                <div class="  text-center  text-white ">




                <figcaption  class="  imglegendtitle2">
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
                      <q-btn class="q-pa-none" @click="liketrigger(props.row.liked,props.row.id)">
                        <q-icon  class="hearticon"   :color=" props.row.liked ? 'red' : 'grey' "  size="md"   name="mdi-heart">

                      </q-icon>
                      </q-btn>





                    </div>


                </div>







                </figcaption>







              </div>





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
import TweenMax from 'gsap'







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



    const dialoginfo=ref({})



    const handleCheckBig = async (message) =>  {
    admin.value = await checkUserAdmin(message)
    }

    const handleListProducts = async () => {

      try {
        loading.value = true
        //products.value = await list(CategoriesTabName)
        productsliked.value = await productlistwithlikeditem(user.value.id)


        loading.value = false

      } catch (error) {
        notifyError(error.message)

      }




    }



    const dialogtrigger = (message) => {

      dialoginfo.value = message





    }

    const liketrigger = (liked , message) => {
      if (liked) {
        dislikefunction(message , user.value.id)
        setTimeout(() => {handleListProducts()}, 250);
        setTimeout(() => {
          productsliked.value.filter(function(el,key){
            if(el.id == message ) {
              dialoginfo.value = el
            }
          })
        }
        , 500);

        hearticon


      } else {
        likefunction(message , user.value.id)
        setTimeout(() => {handleListProducts()}, 250);
        setTimeout(() => {
         productsliked.value.filter(function(el){
            if(el.id == message ) {
              dialoginfo.value = el
            }
          })
        }
        , 500);
      }
    }











    onMounted (() => {


      handleListProducts().then(TweenMax.from(".table",{duration : 2,opacity:0, y:'-50%'}))

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
      dialoginfo,
      liketrigger,



    }
  }

  })
</script>

<style>

  .hearticon:hover {
    /*background-color: rgb(219, 241, 23);*/
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
