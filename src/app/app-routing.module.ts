import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {ProductosComponent} from './productos/productos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AccesosComponent } from './accesos/accesos.component';
import {AgregarVentaCarritoComponent } from './agregar-venta-carrito/agregar-venta-carrito.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';
import { ReportesComponent } from './reportes/reportes.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { ComprasProveedorComponent } from './compras-proveedor/compras-proveedor.component';
import { EnviosComponent } from './envios/envios.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'productos', component:ProductosComponent},
  {path: 'proveedores', component:ProveedoresComponent},
  {path: 'clientes', component:ClientesComponent},
  {path: 'devoluciones', component: DevolucionesComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'accesos', component: AccesosComponent},
  {path: 'carrito', component: AgregarVentaCarritoComponent},
  {path: 'metodoPago', component: MetodoPagoComponent},
  {path: 'reportes', component:ReportesComponent},
  {path: 'transacciones', component:TransaccionesComponent},
  {path: 'compras', component:ComprasProveedorComponent},
  {path:'envios', component:EnviosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
