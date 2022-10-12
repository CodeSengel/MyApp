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
          My store
          <q-icon size="lg" color="orange" name="mdi-cart"> </q-icon>
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
          v-for="link in essentialLinks"
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
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Accueil',
    caption: 'Bienvenu',
    icon: 'mdi-home',
    size : "md",
    routername : "me"

  },
  {
    title: 'Produit',
    caption: 'Voir tous mes produits',
    icon: 'mdi-tshirt-crew',
    size : "md",
    routername : "category"

  },

]


import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import {useQuasar} from 'quasar'

export default defineComponent({
  name: 'MainLayout',
  colorDarkModeBtn : "red",


  components: {
    EssentialLink
  },




  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const {logout} = useAuthUser()

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



    const leftDrawerOpen = ref(false)



    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handleLogout,
      toggleValue: ref(false),

    }
  },

  methods : {
    changemode : function () {

    this.$q.dark.set(this.toggleValue) }
  }
})
</script>

<style>
  .header{
    background: rgb(63,251,236);
    background: linear-gradient(182deg, rgba(63,251,236,0.9500175070028011) 0%, rgba(24,66,180,1) 68%);
  }
</style>
