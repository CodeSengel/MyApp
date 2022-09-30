import {useQuasar} from 'quasar'

export default function useNotify (){
  const $q= useQuasar()

  const notifySuccess = (message) => {
    $q.notify ({
      type: 'positive',
      message : message || 'Très bien !'
    })
  }

  const notifyError = (message) => {
    $q.notify ({
      type: 'negative',
      message : message || ' Erreur'
    })
  }



  return {
    notifySuccess,
    notifyError
  }

}
