<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{AppName}}




          <q-icon class="cart" size="lg" color="orange" name="mdi-cart"> </q-icon>
        </q-toolbar-title>

        <q-toggle
        v-model="toggleValue"

        color="black"
        @click="changemode"


      />

        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click = "handleLogout">
              <q-item-selection>
                <q-item-lable>
                  Se déconnecter
                </q-item-lable>
              </q-item-selection>
            </q-item>
          </q-list>
        </q-btn-dropdown>





      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
         <strong>  Menu </strong>
        </q-item-label>

        <EssentialLink
          v-if="admin"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <EssentialLink

          v-for="link in essentialLinks2"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref , onMounted} from 'vue'

import EssentialLink from 'components/EssentialLink.vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import {useQuasar} from 'quasar'
import TweenMax from 'gsap'

const {user } = useAuthUser()


const AppName = process.env.QUASAR_APP_NAME

const linksList = [

  {
    title: 'Catégories *',
    caption: 'Voir mes catégories',
    icon: 'mdi-sitemap',
    color: 'red',
    size : "md",
    routername : "category"

  },
  {
    title: 'Produit *',
    caption: 'Voir mes produits',
    icon: 'mdi-tshirt-crew',
    color: 'red',
    size : "md",
    routername : "product"

  },


]


const linksList2 = [
  {
    title: 'Accueil',
    caption: 'Bienvenu',
    icon: 'mdi-home',
    size : "xl",

    routername : "me",


  },
  {
    title: 'Mes produits',
    caption: 'Voir mes produits',
    icon: 'mdi-tshirt-v',
    size : "xl",

    routername : "product-public",
    paramvalue : user.value.user_metadata.name


  },
  {
    title: 'Mon caddie',
    caption: 'Voir mon caddie',
    icon: 'mdi-cart',
    size : "xl",

    routername : "mycart",
    paramvalue : user.value.user_metadata.name



  },


]









export default defineComponent({
  name: 'MainLayout',
  colorDarkModeBtn : "red",


  components: {
    EssentialLink
  },




  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const {logout,user , checkUserAdmin} = useAuthUser()
    const leftDrawerOpen = ref(false)


    const admin = ref(false)

    const handleCheckBig = async (message) =>  {

      admin.value = await checkUserAdmin(message)

    }


    const handleLogout = async () => {
      $q.dialog({
        title: 'Se déconnecter',
        message: 'Voulez vous vraiement vous déconnecter ?',
        cancel : true,
        persistence: true
      }).onOk(
        async () => {
          await logout()
          router.replace({name:'login'})
        }
      )

    }






    onMounted(()=> {

      handleCheckBig(user.value.id)
      TweenMax.set(".cart", { scaleX: 1, transformOrigin: "center center" });
      TweenMax.from(".cart",{duration : 4, rotation:-45})
      TweenMax.from(".cart",{duration : 3,opacity:0.5, x:'600%',ease:'bounce'})
      TweenMax.from(".cart", {delay: 4, duration : 2 , rotationY: 180});





    })


    return {
      essentialLinks: linksList,
      essentialLinks2 : linksList2,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout,
      toggleValue: ref(false),
      user,
      admin,
      AppName


    }
  },

  methods : {
    changemode : function () {
    //this.$q.dark.set(this.toggleValue)
    this.$q.dark.set(true) }
  }
})
</script>

<style>
  .header{
    background: rgb(63,251,236);
    background: linear-gradient(182deg, rgba(63,251,236,0.9500175070028011) 0%, rgba(24,66,180,1) 68%);
  }
</style>
