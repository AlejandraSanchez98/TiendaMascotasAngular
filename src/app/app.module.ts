import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CategoriaComponent} from './categoria/categoria.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductosComponent } from './productos/productos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AccesosComponent } from './accesos/accesos.component';
import { AgregarVentaCarritoComponent } from './agregar-venta-carrito/agregar-venta-carrito.component';
import { ViaEnvioComponent } from './via-envio/via-envio.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';
import { TipoDevolucionComponent } from './tipo-devolucion/tipo-devolucion.component';
import { ReportesComponent } from './reportes/reportes.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaPrincipalComponent,
    CategoriaComponent,
    ProductosComponent,
    ProveedoresComponent,
    ClientesComponent,
    VentasComponent,
    DevolucionesComponent,
    UsuariosComponent,
    AccesosComponent,
    AgregarVentaCarritoComponent,
    ViaEnvioComponent,
    MetodoPagoComponent,
    TipoDevolucionComponent,
    ReportesComponent,
    TransaccionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
