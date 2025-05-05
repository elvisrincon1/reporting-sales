import React, { useState } from 'react';
import { useData, Venta } from '../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';
import { formatCurrency, formatDate } from '../lib/utils';

export const VentasList = () => {
  const { ventas, productos, afiliados, updateVenta, deleteVenta } = useData();
  const [editingVenta, setEditingVenta] = useState<Venta | null>(null);
  const [cantidad, setCantidad] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (venta: Venta) => {
    setEditingVenta(venta);
    setCantidad(venta.cantidad);
    setDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingVenta) return;

    const producto = productos.find(p => p.id === editingVenta.productoId);
    if (!producto) return;

    const updatedVenta: Venta = {
      ...editingVenta,
      cantidad,
      precioVenta: producto.precioVenta * cantidad,
      precioCompra: producto.precioCompra * cantidad
    };

    updateVenta(updatedVenta);
    setDialogOpen(false);
    setEditingVenta(null);
    toast.success('Venta actualizada exitosamente');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar esta venta?')) {
      deleteVenta(id);
      toast.success('Venta eliminada exitosamente');
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ventas.map((venta) => {
              const producto = productos.find(p => p.id === venta.productoId);
              const afiliado = afiliados.find(a => a.id === venta.afiliadoId);

              return (
                <div key={venta.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{producto?.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      Vendido por: {afiliado?.nombre}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Fecha: {formatDate(venta.fecha)}
                    </p>
                    <p className="text-sm">
                      Cantidad: {venta.cantidad} - Total: {formatCurrency(venta.precioVenta)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(venta)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(venta.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Venta</DialogTitle>
          </DialogHeader>
          {editingVenta && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cantidad</label>
                <Input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Producto</p>
                <p className="text-sm">
                  {productos.find(p => p.id === editingVenta.productoId)?.nombre}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Afiliado</p>
                <p className="text-sm">
                  {afiliados.find(a => a.id === editingVenta.afiliadoId)?.nombre}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Fecha</p>
                <p className="text-sm">{formatDate(editingVenta.fecha)}</p>
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpdate}>
                  Guardar Cambios
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
