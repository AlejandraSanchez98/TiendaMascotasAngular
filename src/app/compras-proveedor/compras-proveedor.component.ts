import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {ApiService, IUsuarios, IProveedores} from '../api.service';
import { IProductosCompras } from '../api.service';
import { IComprasProveedor } from '../api.service';


@Component({
  selector: 'app-compras-proveedor',
  templateUrl: './compras-proveedor.component.html',
  styleUrls: ['./compras-proveedor.component.scss']
})
export class ComprasProveedorComponent implements OnInit {
  displayedColumns: string[] = ['idCompra', 'fechaRegistro', 'cantidadTotalProductos'];//columnas tabla transacciones
  displayedColumnsProductos: string[] = ['nombreProducto','precioUnitario','cantidadProducto'];//columnas tabla transacciones
  public dsCompras:MatTableDataSource<IComprasProveedor>; //datasource para transacciones
  public dsProductos:MatTableDataSource<IProductosCompras>; //dataSource para productos
  public frmCompras: FormGroup;
  public arregloProductosSelect: IProductosCompras[] = [];
  public arregloProductos: IProductosCompras[] = [];
  public arregloUsuariosSelect: IUsuarios[] = [];
  public arregloProveedoresSelect: IProveedores[] = [];
  public arregloCompras:IComprasProveedor[] = [];
  public ultimaVenta:any;


  constructor(public formBuilder: FormBuilder, public API: ApiService) {
    this.frmCompras = this.formBuilder.group({
        idUsuario:["",Validators.required],
        idProveedor:["",Validators.required],
        montoTotal:["",Validators.required],
        idProducto:["",Validators.required],
        cantidadProducto:["",Validators.required],
      });
 }

 //llena el select de productos
public listarProductos(){
  this.API.listarProductos().subscribe(
    (success:any)=>{
      return this.arregloProductosSelect = success.respuesta;
    },
    (error)=>{
      console.log("algo ocurrio: ",error)
    }
  );
}

//llena el select de proveedores
public listarProveedores(){
  this.API.listarProveedores().subscribe(
    (success:any)=>{
      return this.arregloProveedoresSelect = success.respuesta;
    },
    (error)=>{
      console.log("algo ocurrio: ",error)
    }
  );
}

//llena el select de usuarios
public listarUsuarios(){
  this.API.listarUsuarios().subscribe(
    (success:any)=>{
      return this.arregloUsuariosSelect = success.respuesta;
    },
    (error)=>{
      console.log("algo ocurrio: ",error)
    }
  );
}

public agregarProductos(){
  let agregarValorID: number = 0;
  let agregarValorCantidad: number = 0;

  this.API.listarProductos().subscribe(
    (success:any)=>{
      agregarValorID = this.frmCompras.get('idProducto').value;
      agregarValorCantidad = this.frmCompras.get('cantidadProducto').value;
      this.arregloProductos.push({idProducto:agregarValorID,cantidadProducto:agregarValorCantidad,nombreProducto:success.respuesta[agregarValorID-1].nombreProducto,precioUnitario:success.respuesta[agregarValorID-1].precioUnitario});
      this.dsProductos = new MatTableDataSource(this.arregloProductos);//paso la info del arreglo al dataSource de la tabla para mostrarlos cada que se agregue un nuevo registro
      console.log("insertar productos: ",this.dsProductos);
    },
    (error)=>{
      console.log("algo ocurrio",error)
    }
  );
}


//agregar una compra
public agregarCompra(){
 let idUsuarioForm:number = 0,idProveedorForm:number = 0,montoTotalForm: number = 0;
  let arregloProductosForm:any[] = []
  idUsuarioForm = this.frmCompras.get('idUsuario').value;
  idProveedorForm = this.frmCompras.get('idProveedor').value;
  montoTotalForm = this.frmCompras.get('montoTotal').value;
  arregloProductosForm = this.arregloProductos;
  if (arregloProductosForm.length == 0) {
      alert("entro");
      alert("presionar boton de agregar productos \n");
  }
  alert("cte: "+idUsuarioForm+" pdor: "+idProveedorForm+" monto: "+montoTotalForm+" arrpdtos: "+JSON.stringify(arregloProductosForm));

  this.API.agregarCompra(idUsuarioForm,idProveedorForm,montoTotalForm,arregloProductosForm).subscribe(
    (success:any)=>{
      if(success.estatus > 0){
        console.log("resultado",success.respuesta);
        this.listarCompras();
      }else if(success.estatus < 0) {
          alert("No cuentas con el dinero suficiente | verifica tu pago");
      }else{
        alert(JSON.stringify(success.respuesta));
      }

    },
    (error)=>{
      alert("algo anda mal | "+ JSON.stringify(error));
    }
  );
}

//muestra la transaccion hecha despues de que se oprime el btn de vender
public listarCompras(){
    this.API.listarCompras().subscribe(
    (success:any)=>{
      this.arregloCompras = success.respuesta;
      alert("arreglot: "+JSON.stringify(this.arregloCompras));
      this.ultimaVenta = this.arregloCompras[this.arregloCompras.length - 1];
      alert("ultima venta: "+JSON.stringify(this.ultimaVenta))
      this.dsCompras = new MatTableDataSource([this.ultimaVenta]); //[prueba] convierto a array la variable prueba para que pueda ser iterada
      this.arregloCompras = [this.ultimaVenta];//aplico simbolo iterador para que pueda iterarlo en un loop
    },
    (error)=>{
      console.log("algo ocurrio: ",error)
    }
  );
}



  ngOnInit() {
    this.listarProductos();
    this.listarProveedores();
    this.listarUsuarios();
  }

}
