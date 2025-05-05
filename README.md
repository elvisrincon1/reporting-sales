# Sistema de Ventas - Reporting Sales

Sistema de gestión de ventas con dashboard integrado para el seguimiento de métricas importantes.

## Características

- Dashboard con métricas en tiempo real
- Gestión de ventas
- Control de inventario
- Gestión de proveedores
- Gestión de afiliados
- Generación de informes
- Interfaz moderna y responsive

## Tecnologías Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/elvisrincon1/reporting-sales.git
cd reporting-sales
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

- `/src/components`: Componentes reutilizables
- `/src/pages`: Páginas principales de la aplicación
- `/src/context`: Contextos de React para el manejo de estado
- `/src/hooks`: Hooks personalizados
- `/src/lib`: Utilidades y funciones auxiliares
- `/src/integrations`: Integraciones con servicios externos (Supabase)

## Módulos Principales

1. **Dashboard**
   - Resumen de ventas totales
   - Productos más vendidos
   - Métricas diarias
   - Total de afiliados

2. **Reportar Venta**
   - Formulario de registro de ventas
   - Selección de productos y afiliados
   - Cálculo automático de totales

3. **Inventario**
   - Listado de productos
   - Control de stock
   - Precios de compra y venta

4. **Proveedores**
   - Gestión de proveedores
   - Información de contacto
   - Historial de compras

5. **Afiliados**
   - Gestión de afiliados
   - Historial de ventas por afiliado
   - Comisiones

6. **Informes**
   - Generación de reportes
   - Exportación de datos
   - Análisis de ventas

## Contribución

1. Fork el proyecto
2. Cree una rama para su característica (`git checkout -b feature/AmazingFeature`)
3. Commit sus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abra un Pull Request

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.
