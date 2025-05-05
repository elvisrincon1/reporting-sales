import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../integrations/supabase/client';

export type Proveedor = {
  id: string;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
};

export type Afiliado = {
  id: string;
  nombre: string;
  identificacion: string;
  contacto: string;
};

export type Producto = {
  id: string;
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  proveedor1Id: string;
  proveedor2Id?: string;
};

export type Venta = {
  id: string;
  fecha: string;
  afiliadoId: string;
  productoId: string;
  cantidad: number;
  precioVenta: number;
  precioCompra: number;
};

interface DataContextType {
  proveedores: Proveedor[];
  afiliados: Afiliado[];
  productos: Producto[];
  ventas: Venta[];
  addProveedor: (proveedor: Proveedor) => Promise<void>;
  updateProveedor: (proveedor: Proveedor) => Promise<void>;
  deleteProveedor: (id: string) => Promise<void>;
  addAfiliado: (afiliado: Afiliado) => Promise<void>;
  updateAfiliado: (afiliado: Afiliado) => Promise<void>;
  deleteAfiliado: (id: string) => Promise<void>;
  addProducto: (producto: Producto) => Promise<void>;
  updateProducto: (producto: Producto) => Promise<void>;
  deleteProducto: (id: string) => Promise<void>;
  addVenta: (venta: Venta) => Promise<void>;
  updateVenta: (venta: Venta) => Promise<void>;
  deleteVenta: (id: string) => Promise<void>;
  getProductoById: (id: string) => Producto | undefined;
  getAfiliadoById: (id: string) => Afiliado | undefined;
  getProveedorById: (id: string) => Proveedor | undefined;
  getVentaById: (id: string) => Venta | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [afiliados, setAfiliados] = useState<Afiliado[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);

  // Cargar datos desde Supabase al iniciar
  useEffect(() => {
    const fetchData = async () => {
      const { data: proveedoresData, error: proveedoresError } = await supabase.from('proveedores').select('*');
      if (proveedoresError) console.error(proveedoresError);
      else setProveedores(proveedoresData || []);

      const { data: afiliadosData, error: afiliadosError } = await supabase.from('afiliados').select('*');
      if (afiliadosError) console.error(afiliadosError);
      else setAfiliados(afiliadosData || []);

      const { data: productosData, error: productosError } = await supabase.from('productos').select('*');
      if (productosError) console.error(productosError);
      else setProductos(productosData || []);

      const { data: ventasData, error: ventasError } = await supabase.from('ventas').select('*');
      if (ventasError) console.error(ventasError);
      else setVentas(ventasData || []);
    };

    fetchData();

    // Suscripción a cambios en ventas usando la nueva API de Supabase 2.x
    const channel = supabase
      .channel('public:ventas')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ventas' }, payload => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Funciones para agregar, actualizar y eliminar usando Supabase
  const addProveedor = async (proveedor: Proveedor) => {
    const { error } = await supabase.from('proveedores').insert(proveedor);
    if (error) console.error(error);
  };

  const updateProveedor = async (proveedor: Proveedor) => {
    const { error } = await supabase.from('proveedores').update(proveedor).eq('id', proveedor.id);
    if (error) console.error(error);
  };

  const deleteProveedor = async (id: string) => {
    const { error } = await supabase.from('proveedores').delete().eq('id', id);
    if (error) console.error(error);
  };

  const addAfiliado = async (afiliado: Afiliado) => {
    const { error } = await supabase.from('afiliados').insert(afiliado);
    if (error) console.error(error);
  };

  const updateAfiliado = async (afiliado: Afiliado) => {
    const { error } = await supabase.from('afiliados').update(afiliado).eq('id', afiliado.id);
    if (error) console.error(error);
  };

  const deleteAfiliado = async (id: string) => {
    const { error } = await supabase.from('afiliados').delete().eq('id', id);
    if (error) console.error(error);
  };

  const addProducto = async (producto: Producto) => {
    const { error } = await supabase.from('productos').insert(producto);
    if (error) console.error(error);
  };

  const updateProducto = async (producto: Producto) => {
    const { error } = await supabase.from('productos').update(producto).eq('id', producto.id);
    if (error) console.error(error);
  };

  const deleteProducto = async (id: string) => {
    const { error } = await supabase.from('productos').delete().eq('id', id);
    if (error) console.error(error);
  };

  const addVenta = async (venta: Venta) => {
    const { error } = await supabase.from('ventas').insert(venta);
    if (error) console.error(error);
  };

  const updateVenta = async (venta: Venta) => {
    const { error } = await supabase.from('ventas').update(venta).eq('id', venta.id);
    if (error) console.error(error);
  };

  const deleteVenta = async (id: string) => {
    const { error } = await supabase.from('ventas').delete().eq('id', id);
    if (error) console.error(error);
  };

  const getProductoById = (id: string) => productos.find(p => p.id === id);
  
  const getAfiliadoById = (id: string) => afiliados.find(a => a.id === id);
  
  const getProveedorById = (id: string) => proveedores.find(p => p.id === id);

  const getVentaById = (id: string) => ventas.find(v => v.id === id);

  return (
    <DataContext.Provider
      value={{
        proveedores,
        afiliados,
        productos,
        ventas,
        addProveedor,
        updateProveedor,
        deleteProveedor,
        addAfiliado,
        updateAfiliado,
        deleteAfiliado,
        addProducto,
        updateProducto,
        deleteProducto,
        addVenta,
        updateVenta,
        deleteVenta,
        getProductoById,
        getAfiliadoById,
        getProveedorById,
        getVentaById
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
