import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {PaginaPrincipalComponent} from './pagina-principal/pagina-principal.component';
import { CategoriaComponent } from './categoria/categoria.component';
import {ProductosComponent} from './productos/productos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AccesosComponent } from './accesos/accesos.component';
import {AgregarVentaCarritoComponent } from './agregar-venta-carrito/agregar-venta-carrito.component';
import { ViaEnvioComponent } from './via-envio/via-envio.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';
import { TipoDevolucionComponent } from './tipo-devolucion/tipo-devolucion.component';
import { ReportesComponent } from './reportes/reportes.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'paginaPrincipal', component: PaginaPrincipalComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'productos', component:ProductosComponent},
  {path: 'proveedores', component:ProveedoresComponent},
  {path: 'clientes', component:ClientesComponent},
  {path: 'ventas', component:VentasComponent},
  {path: 'devoluciones', component: DevolucionesComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'accesos', component: AccesosComponent},
  {path: 'carrito', component: AgregarVentaCarritoComponent},
  {path: 'viaEnvio', component: ViaEnvioComponent},
  {path: 'metodoPago', component: MetodoPagoComponent},
  {path: 'tipoDevolucion', component:TipoDevolucionComponent},
  {path: 'reportes', component:ReportesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
