<template>

  <q-page padding class="justify-center">

    <div class="row">

      <q-table
        title="Categories"
        :rows="rows"
        :columns="columns"
        row-key="id"
        class="col-12"
      >

      <template v-slot:top>
        <span>
          category
        </span>
        <q-space/>
        <q-btn
          label = "Ajouter"
          color = "primary"
        />
      </template>


      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn icon="mdi-pencil-outline" color="info" dense size="sm">
            <q-tooltip>
              modifier
            </q-tooltip>
          </q-btn>

          <q-btn icon="mdi-delete-outline" color="negative" dense size="sm">
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
import { defineComponent,ref, onMounted,} from 'vue'
const columns = [

  { name: 'name', align: 'left', label: 'name', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: true },


]

const rows = [
  {
    id : '123',
    name : 'Sport'
  },
  {
    id : '123',
    name : 'Hiver'
  },
  {
    id : '123',
    name : 'Eté'
  },

]
export default defineComponent ({
  name : 'PageCategoryList',

  setup(){
    return{
      columns,
      rows

    }
  }

  })
</script>
