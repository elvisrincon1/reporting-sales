import React from 'react';
import { useData } from '../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { formatCurrency, formatDate } from '../lib/utils';
import { VentasList } from '../components/VentasList';

const Dashboard = () => {
  const { ventas, productos, afiliados } = useData();

  // Calcular estadísticas
  const totalVentas = ventas.reduce((sum, venta) => sum + venta.precioVenta, 0);
  const totalProductosVendidos = ventas.reduce((sum, venta) => sum + venta.cantidad, 0);
  const ventasHoy = ventas.filter(venta => 
    new Date(venta.fecha).toDateString() === new Date().toDateString()
  ).length;

  // Productos más vendidos
  const productosVendidos = ventas.reduce((acc, venta) => {
    const producto = productos.find(p => p.id === venta.productoId);
    if (!producto) return acc;
    
    acc[venta.productoId] = {
      nombre: producto.nombre,
      cantidad: (acc[venta.productoId]?.cantidad || 0) + venta.cantidad,
      total: (acc[venta.productoId]?.total || 0) + venta.precioVenta
    };
    return acc;
  }, {} as Record<string, { nombre: string; cantidad: number; total: number }>);

  const productosMasVendidos = Object.entries(productosVendidos)
    .sort(([, a], [, b]) => b.cantidad - a.cantidad)
    .slice(0, 5);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard de Ventas</h1>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ventas Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalVentas)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Productos Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProductosVendidos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ventas Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ventasHoy}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Afiliados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{afiliados.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Productos más vendidos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Productos Más Vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productosMasVendidos.map(([id, data]) => (
              <div key={id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{data.nombre}</p>
                  <p className="text-sm text-muted-foreground">
                    Cantidad vendida: {data.cantidad}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(data.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de ventas con funcionalidades de edición y eliminación */}
      <VentasList />
    </div>
  );
};

export default Dashboard;
