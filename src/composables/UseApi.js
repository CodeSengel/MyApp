import { supabase } from 'src/supabase'
import useAuthUser from './UseAuthUser'

export default function useApi() {

  const {user} = useAuthUser

// My my functions :  Get rows from table

  const GetColFromTable = async (table,col) => {
    /* pull data of a table (or specific row)
       if you want all the data , put '*' in col inpu
    */
    const {data, error} = await supabase
    .from(table)
    .select(col)

    if(error) throw error
    return data
  }

  //  // // //


  const list = async (table) => {
    const {data, error} = await supabase
    .from(table)
    .select('*')

    if(error) throw error
    return data
  }



  const getById = async (table, id) => {
    const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id);
    if (error) throw error;
    return data[0];
  }

  const post = async (table, form) => {
    const { data, error } = await supabase
    .from(table)
    .insert([
      {
        ...form,
        user_id: user.value.id,
      },
    ]);
    if (error) throw error;
    return data;
  }

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update([
        {
          ...form,
        },
      ])
      .match({ id: form.id });

    if (error) {
      console.log("erreur", error.value);
      throw error;
    }

    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id });

    if (error) throw error;

    return data, error;
  };


  return {
    list,
    post,
    getById,
    update,
    remove
  }
}
