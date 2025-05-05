export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      proveedores: {
        Row: {
          id: string
          nombre: string
          contacto: string
          telefono: string
          email: string
        }
        Insert: {
          id?: string
          nombre: string
          contacto: string
          telefono: string
          email: string
        }
        Update: {
          id?: string
          nombre?: string
          contacto?: string
          telefono?: string
          email?: string
        }
      }
      afiliados: {
        Row: {
          id: string
          nombre: string
          identificacion: string
          contacto: string
        }
        Insert: {
          id?: string
          nombre: string
          identificacion: string
          contacto: string
        }
        Update: {
          id?: string
          nombre?: string
          identificacion?: string
          contacto?: string
        }
      }
      productos: {
        Row: {
          id: string
          nombre: string
          precioCompra: number
          precioVenta: number
          proveedor1Id: string
          proveedor2Id: string | null
        }
        Insert: {
          id?: string
          nombre: string
          precioCompra: number
          precioVenta: number
          proveedor1Id: string
          proveedor2Id?: string | null
        }
        Update: {
          id?: string
          nombre?: string
          precioCompra?: number
          precioVenta?: number
          proveedor1Id?: string
          proveedor2Id?: string | null
        }
      }
      ventas: {
        Row: {
          id: string
          fecha: string
          afiliadoId: string
          productoId: string
          cantidad: number
          precioVenta: number
          precioCompra: number
        }
        Insert: {
          id?: string
          fecha: string
          afiliadoId: string
          productoId: string
          cantidad: number
          precioVenta: number
          precioCompra: number
        }
        Update: {
          id?: string
          fecha?: string
          afiliadoId?: string
          productoId?: string
          cantidad?: number
          precioVenta?: number
          precioCompra?: number
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
