
import {ref} from 'vue'
//import useSupabase from 'src/supabase' // not necessary

import { supabase } from 'src/supabase'

const user = ref(null)
export default function useAuthUser () {

  //const {supabase} = useSupabase      // not necessary

  const login = async ({email,password}) => {

    const {user, error} = await supabase.auth.signIn({email,password})

    if (error) throw error
    return user
  }

  const loginWithSocialProvider = async (provider) => {
    const {user, error} = await supabase.auth.signIn({provider})
    if (error) throw error
    return user
  }

  const logout = async () => {
    const {user,error} = await supabase.auth.signOut()
    if (error) throw error

  }

  const isLoggedIn = () => {
    return !!userSettvfvfver.value
  }

  const register = async ({email,password, ...meta}) => {
    const {user, error} = await supabase.auth.signUp(
      {
        email,
        password
      },
      {
        data: meta,
        redirectTo: '${windows.location.origin}/me?fromEmail=registrationConfirmation'
      }

      )
      if (error) throw error
      return user
  }

  const update = async (data) => {
    const { user,error} = await supabase.auth.update(data)
    if (error) throw error
    return user
  }


  const sendPasswordRestEmail = async (email) => {
    const { user,error} = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail
  }
}
