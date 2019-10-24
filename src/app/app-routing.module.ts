import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {PaginaPrincipalComponent} from './pagina-principal/pagina-principal.component';
import { CategoriaComponent } from './categoria/categoria.component';
import {ProductosComponent} from './productos/productos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { VentasComponent } from './ventas/ventas.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AccesosComponent } from './accesos/accesos.component';

import { from } from 'rxjs';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'paginaPrincipal', component: PaginaPrincipalComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'productos', component:ProductosComponent},
  {path: 'proveedores', component:ProveedoresComponent},
  {path: 'clientes', component:ClientesComponent},
  {path: 'vendedores', component:VendedoresComponent},
  {path: 'ventas', component:VentasComponent},
  {path: 'devoluciones', component: DevolucionesComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'accesos', component: AccesosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
