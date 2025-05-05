export const initialAfiliados = [
  {
    id: "1",
    nombre: "Juan Pérez",
    identificacion: "V-12345678",
    contacto: "0412-1234567"
  },
  {
    id: "2",
    nombre: "María González",
    identificacion: "V-23456789",
    contacto: "0414-2345678"
  },
  {
    id: "3",
    nombre: "Carlos Rodríguez",
    identificacion: "V-34567890",
    contacto: "0416-3456789"
  }
];

export const initialProductos = [
  {
    id: "1",
    nombre: "Laptop HP",
    precioCompra: 500,
    precioVenta: 800,
    proveedor1Id: "1"
  },
  {
    id: "2",
    nombre: "Monitor Dell",
    precioCompra: 150,
    precioVenta: 250,
    proveedor1Id: "1"
  },
  {
    id: "3",
    nombre: "Teclado Mecánico",
    precioCompra: 30,
    precioVenta: 60,
    proveedor1Id: "2"
  }
];

export const initialProveedores = [
  {
    id: "1",
    nombre: "TechSupply Inc",
    contacto: "John Smith",
    telefono: "0212-5551234",
    email: "techsupply@example.com"
  },
  {
    id: "2",
    nombre: "Hardware Plus",
    contacto: "Jane Doe",
    telefono: "0212-5555678",
    email: "hardwareplus@example.com"
  }
];

export const initialVentas = [
  {
    id: "1",
    fecha: "2024-05-05",
    afiliadoId: "1",
    productoId: "1",
    cantidad: 1,
    precioVenta: 800,
    precioCompra: 500
  },
  {
    id: "2",
    fecha: "2024-05-05",
    afiliadoId: "2",
    productoId: "2",
    cantidad: 2,
    precioVenta: 500,
    precioCompra: 300
  }
];
