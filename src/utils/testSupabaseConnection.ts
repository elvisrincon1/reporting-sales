import { supabase } from '../integrations/supabase/client';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('proveedores').select('*').limit(1);
    if (error) {
      console.error('Error al consultar proveedores:', error);
      return false;
    }
    console.log('Conexión a Supabase exitosa. Datos de proveedores:', data);
    return true;
  } catch (err) {
    console.error('Error inesperado al conectar con Supabase:', err);
    return false;
  }
}
