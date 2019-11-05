import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //CABECERAS
  public headers= new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'), //token almacenado en LS
    'Content-Type': 'application/json',//tipo de contenido JSON
    'Accept': 'application/json' //acepta el cuerpo de la peticion JSON
  });

  constructor(public http:HttpClient) { }

  // METODOS QUE CONTIENEN LOS DIFERENTES TIPOS DE PETICIONES DEL MODULO DE CATEGORIA
  public listarCategorias(){
    return this.http.get('http://localhost:3000/categoria/listarCategorias',{headers:this.headers});
  }

  public agregarCategoria(nombreCategoria: string, subCategoria:string, descripcion: string){
    return this.http.post('http://localhost:3000/categoria/agregarCategoria',{nombreCategoria,subCategoria,descripcion},{headers:this.headers});
  }

  public editarCategoria(id:number,nombreCategoria: string, subCategoria:string, descripcion: string){
    return this.http.put('http://localhost:3000/categoria/modificarCategoria/'+id,{nombreCategoria,subCategoria,descripcion},{headers:this.headers});
  }

  public eliminarCategoria(id:number){
    return this.http.delete('http://localhost:3000/categoria/eliminarCategoria/'+id,{headers:this.headers});
  }



  // METODOS QUE CONTIENEN LOS DIFERENTES TIPOS DE PETICIONES DEL MODULO DE CLIENTES
  public listarClientes(){
    return this.http.get('http://localhost:3000/clientes/listarClientes',{headers:this.headers});
  }

  public agregarCliente(nombreCliente: string, direccionCliente:string, ciudadCliente:string, telefonoCliente: string, emailCliente:string, passwordCliente:string ){
    return this.http.post('http://localhost:3000/clientes/agregarCliente',{ nombreCliente,direccionCliente,ciudadCliente,telefonoCliente,emailCliente,passwordCliente},{headers:this.headers});
  }

  public editarCliente(id:number, nombreCliente: string, direccionCliente:string, ciudadCliente:string, telefonoCliente: string, emailCliente:string, passwordCliente:string){
    return this.http.put('http://localhost:3000/clientes/modificarCliente/'+id,{nombreCliente,direccionCliente,ciudadCliente,telefonoCliente,emailCliente,passwordCliente},{headers:this.headers});
  }

  public eliminarCliente(id:number){
    return this.http.delete('http://localhost:3000/clientes/eliminarCliente/'+id,{headers:this.headers});
  }



  // METODOS QUE CONTIENEN LOS DIFERENTES TIPOS DE PETICIONES DEL MODULO DE PROVEEDORES
  public listarProveedores(){
    return this.http.get('http://localhost:3000/proveedores/listarProveedores',{headers:this.headers});
  }

  public agregarProveedor(nombreProveedor:string, direccionProveedor:string, telefonoProveedor:string, ciudadProveedor:string, emailProveedor:string, RFCProveedor:string, razonSocial:string){
    return this.http.post('http://localhost:3000/proveedores/agregarProveedor',{nombreProveedor,direccionProveedor,telefonoProveedor,ciudadProveedor,emailProveedor,RFCProveedor,razonSocial},{headers:this.headers});
  }

  public editarProveedor(id:number, nombreProveedor:string, direccionProveedor:string, telefonoProveedor:string, ciudadProveedor:string, emailProveedor:string, RFCProveedor:string, razonSocial:string){
    return this.http.put('http://localhost:3000/proveedores/modificarProveedor/'+ id,{nombreProveedor,direccionProveedor,telefonoProveedor,ciudadProveedor,emailProveedor,RFCProveedor,razonSocial}, {headers:this.headers});
  }

  public eliminarProveedor(id:number){
    return this.http.delete('http://localhost:3000/proveedores/eliminarProveedor/'+id,{headers:this.headers});
  }



  // METODOS QUE CONTIENEN LOS DIFERENTES TIPOS DE PETICIONES DEL MODULO DE PRODUCTOS
  public listarProductos(){
    return this.http.get('http://localhost:3000/productos/listarProductos',{headers:this.headers});
  }

  public agregarProducto(nombreProducto:string, precioUnitario:number, descripcionProducto:string, stock:number, idCategoria:string){
    return this.http.post('http://localhost:3000/productos/agregarProducto',{nombreProducto,precioUnitario,descripcionProducto,stock,idCategoria},{headers:this.headers});
  }

  public editarProducto(id:number, nombreProducto:string, precioUnitario:number, descripcionProducto:string, stock:number, idCategoria:number){
    return this.http.put('http://localhost:3000/productos/modificarProducto/'+ id,{nombreProducto,precioUnitario,descripcionProducto,stock,idCategoria}, {headers:this.headers});
  }

  public eliminarProducto(id:number){
    return this.http.delete('http://localhost:3000/productos/eliminarProducto/'+id,{headers:this.headers});
  }



  // METODOS QUE CONTIENEN LOS DIFERENTES TIPOS DE PETICIONES DEL MODULO DE VIAENVIO
  public listarMediosEnvios(){
    return this.http.get('http://localhost:3000/viaEnvios/listarMediosEnvios',{headers:this.headers});
  }

  public agregarMedioEnvio(medioEnvio:string, descripcion:string){
    return this.http.post('http://localhost:3000/viaEnvios/agregarMedioEnvio',{medioEnvio,descripcion},{headers:this.headers});
  }

  public editarMedioEnvio(id:number, medioEnvio:string, descripcion:string){
    return this.http.put('http://localhost:3000/viaEnvios/modificarMedioEnvio/'+ id,{medioEnvio,descripcion}, {headers:this.headers});
  }

  public eliminarMedioEnvio(id:number){
    return this.http.delete('http://localhost:3000/viaEnvios/eliminarMedioEnvio/'+id,{headers:this.headers});
  }


  // METODOS QUE CONTIENEN LOS DIFERENTES TIPOS DE PETICIONES DEL MODULO DE VIAENVIO
  public listarMetodosPago(){
    return this.http.get('http://localhost:3000/metodoPago/listarMetodosPago',{headers:this.headers});
  }

  public agregarMetodoPago(tipoPago:string){
    return this.http.post('http://localhost:3000/metodoPago/agregarMetodoPago',{tipoPago},{headers:this.headers});
  }

  public editarMetodoPago(id:number, tipoPago:string ){
    return this.http.put('http://localhost:3000/metodoPago/modificarMetodoPago/'+ id,{tipoPago}, {headers:this.headers});
  }

  public eliminarMetodoPago(id:number){
    return this.http.delete('http://localhost:3000/metodoPago/eliminarMetodoPago/'+id,{headers:this.headers});
  }


  // METODOS QUE CONTIENEN LOS DIFERENTES TIPOS DE PETICIONES DEL MODULO DE USUARIOS
  public listarUsuarios(){
    return this.http.get('http://localhost:3000/usuarios/listarUsuarios',{headers:this.headers});
  }

  public agregarUsuario(nombreUsuario:string, telefonoUsuario:string, direccionUsuario:string, correo:string, passwordUsuario:string, tipoUsuario:string){
    return this.http.post('http://localhost:3000/usuarios/agregarUsuario',{nombreUsuario, telefonoUsuario, direccionUsuario, correo, passwordUsuario, tipoUsuario},{headers:this.headers});
  }

  public editarUsuario(id:number, nombreUsuario:string, telefonoUsuario:string, direccionUsuario:string, correo:string, passwordUsuario:string, tipoUsuario:string){
    return this.http.put('http://localhost:3000/usuarios/modificarUsuario/'+ id,{nombreUsuario, telefonoUsuario, direccionUsuario, correo, passwordUsuario,tipoUsuario}, {headers:this.headers});
  }

  public eliminarUsuario(id:number){
    return this.http.delete('http://localhost:3000/usuarios/eliminarUsuario/'+id,{headers:this.headers});
  }


  // METODOS QUE CONTIENEN LOS DIFERENTES TIPOS DE PETICIONES DEL MODULO DE TIPOS DE DEVOLUCION
  public listarTiposDevoluciones(){
    return this.http.get('http://localhost:3000/tipoDevolucion/listarTiposDevoluciones',{headers:this.headers});
  }

  public agregarTipoDevolucion(tipoDevolucion:string, descripcion:string){
    return this.http.post('http://localhost:3000/tipoDevolucion/agregarTipoDevolucion',{tipoDevolucion, descripcion},{headers:this.headers});
  }

  public editarTipoDevolucion(id:number, tipoDevolucion:string, descripcion:string){
    return this.http.put('http://localhost:3000/tipoDevolucion/modificarTipoDevolucion/'+ id,{tipoDevolucion,descripcion}, {headers:this.headers});
  }

  public eliminarTipoDevolucion(id:number){
    return this.http.delete('http://localhost:3000/tipoDevolucion/eliminarTipoDevolucion/'+id,{headers:this.headers});
  }


  //PETICIÓN PARA OBTENER LOS PRODUCTOS MÁS VENDIDOS
  public productosMasVendidos(){
    return this.http.get('http://localhost:3000/productosMasVendidos/productosMasVendidos',{headers:this.headers});
  }


  //PETICIÓN PARA OBTENER LOS VENDEDORES CON MÁS VENTAS
  public vendedoresMasVentas(){
    return this.http.get('http://localhost:3000/vendedoresMasVentas/vendedoresMasVentas',{headers:this.headers});
  }


  //PETICIÓN PARA OBTENER LOS VENDEDORES CON MÁS VENTAS
  public productoStockMinimo(){
    return this.http.get('http://localhost:3000/productoStockMinimo/productoStockMinimo',{headers:this.headers});
  }


  //PETICIÓN PARA OBTENER LA UTILIDAD
  public utilidad(){
    return this.http.get('http://localhost:3000/utilidad/calcularUtilidad',{headers:this.headers});
  }
}
