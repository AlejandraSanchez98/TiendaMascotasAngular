import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService, IClientes,IUsuarios } from '../api.service';
import { IProductosCarrito } from '../api.service';
import { IVentasCarrito } from '../api.service';
import { IMetodosPagoCarrito } from '../api.service';


@Component({
  selector: 'app-agregar-venta-carrito',
  templateUrl: './agregar-venta-carrito.component.html',
  styleUrls: ['./agregar-venta-carrito.component.scss']
})
export class AgregarVentaCarritoComponent implements OnInit {
  displayedColumns: string[] = ['idVenta', 'fechaRegistro', 'cantidadTotalProductos'];//columnas tabla transacciones
  displayedColumnsProductos: string[] = ['nombreProducto','precioUnitario','cantidadProductos'];//columnas tabla transacciones
  public dsVentas:MatTableDataSource<IVentasCarrito>; //datasource para transacciones
  public dsProductos:MatTableDataSource<IProductosCarrito>; //dataSource para productos
  public frmVentas: FormGroup;
  public arregloProductosSelect: IProductosCarrito[] = [];
  public arregloProductosTabla: IProductosCarrito[] = [];
  public arregloClientesSelect: IClientes[] = [];
  public arregloUsuariosSelect: IUsuarios[] = [];
  public arregloMetodosPagoSelect: IMetodosPagoCarrito[] = [];
  public arregloMetodosPagoLista: IMetodosPagoCarrito[] = [];
  public arregloVentas:IVentasCarrito[] = [];
  public ultimaVenta:any;


  constructor(public formBuilder: FormBuilder, public API: ApiService) {
    this.frmVentas = this.formBuilder.group({
        idUsuario:["",Validators.required],
        idCliente:["",Validators.required],
        pago:["",Validators.required],
        idProducto:["",Validators.required],
        cantidadProducto:["",Validators.required],
        idMetodoPago:["",Validators.required]
      });
 }


 //llena el select de tipos de pagos
public listarMetodosPago(){
  this.API.listarMetodosPago().subscribe(
    (success:any)=>{
      return this.arregloMetodosPagoSelect = success.respuesta;
    },
    (error)=>{
      console.log("algo ocurrio: ",error)
    }
  );
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

//llena el select de clientes
public listarClientes(){
  this.API.listarClientes().subscribe(
    (success:any)=>{
      return this.arregloClientesSelect = success.respuesta;
    },
    (error)=>{
      console.log("algo ocurrio: ",error)
    }
  );
}

//llena el select de vendedores
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
      agregarValorID = this.frmVentas.get('idProducto').value;
      agregarValorCantidad = this.frmVentas.get('cantidadProducto').value;
      console.log("id",agregarValorID,"cantidad",agregarValorCantidad);
      this.arregloProductosTabla.push({idProducto:agregarValorID,cantidadProductos:agregarValorCantidad,nombreProducto:success.respuesta[agregarValorID-1].nombreProducto,precioUnitario:success.respuesta[agregarValorID-1].precioUnitario});
      this.dsProductos = new MatTableDataSource(this.arregloProductosTabla);//paso la info del arreglo al dataSource de la tabla para mostrarlos cada que se agregue un nuevo registro
      console.log("insertar productos: ",this.dsProductos);
    },
    (error)=>{
      console.log("algo ocurrio",error)
    }
  );
}

//almacena los tipos de pago selecionados del checkbox en un arreglo para su posterior uso.
public agregarMetodosPago(idMetodoPago:number){
  this.API.listarMetodosPago().subscribe(
    (success:any)=>{
        let prueba = this.frmVentas.get('idMetodoPago').value;
        //si el checkbox esta marcado
        if (prueba == true) {
          this.arregloMetodosPagoLista.push({idMetodoPago:idMetodoPago})
        }else if(prueba == false){//elimina los elementos desmarcados
            this.arregloMetodosPagoLista.splice(idMetodoPago-1,1)
        }
        alert("arreglo final: "+JSON.stringify(this.arregloMetodosPagoLista));
    },
    (error)=>{
      console.log("algo ocurrio: ",error)
    }
  );
}
//agregar una transaccion
public agregarVenta(){
 let idClienteForm:number = 0,idUsuarioForm:number = 0,pagoForm: number = 0;
 let arregloProductosForm:any[] = [],arregloMetodosPagoForm:any[] = [];
  idClienteForm = this.frmVentas.get('idCliente').value;
  idUsuarioForm = this.frmVentas.get('idUsuario').value;
  pagoForm = this.frmVentas.get('pago').value;
  arregloProductosForm = this.arregloProductosTabla;
  arregloMetodosPagoForm = this.arregloMetodosPagoLista;
  if (arregloProductosForm.length == 0) {
      alert(" presionar boton de agregar productos \n");
  }
//  alert("cte: "+idClienteForm+" vdor: "+idUsuarioForm+" pago: "+pagoForm+" arrpdtos: "+JSON.stringify(arregloProductosForm)+" arrtipag: "+JSON.stringify(arregloMetodosPagoForm));
  this.API.agregarVenta(idClienteForm,idUsuarioForm,pagoForm,arregloProductosForm,arregloMetodosPagoForm).subscribe(
    (success:any)=>{
      console.log("arreglo productos", arregloProductosForm.length)
      //console.log("entro con exito!")
      console.log("contenido de success: ",success)
      if(success.estatus > 0){
        console.log("supuestamente fue exitoso ",success.estatus)
        setTimeout(()=>{
          this.listarVentas();
        },500)
        //console.log("listando")
        //alert(":respuesta"+success.respuesta);
      }else if(success.estatus < 0) {
          //alert("No cuentas con el dinero suficiente | verifica tu pago :(");
      }else{
        alert("solo manda esto:"+JSON.stringify(success.respuesta));
      }

    },
    (error)=>{
      alert("error | "+ JSON.stringify(error));
    }
  );
}

//muestra la transaccion hecha despues de que se oprime el btn de vender
public listarVentas(){
    this.API.listarVentas().subscribe(
    (success:any)=>{
      this.arregloVentas = success.respuesta;
      //alert("arreglot: "+JSON.stringify(this.arregloVentas));
      this.ultimaVenta = this.arregloVentas[this.arregloVentas.length - 1];
      //alert("ultima venta: "+JSON.stringify(this.ultimaVenta));
      this.dsVentas = new MatTableDataSource([this.ultimaVenta]); //[prueba] convierto a array la variable prueba para que pueda ser iterada
      this.arregloVentas = [this.ultimaVenta];//aplico simbolo iterador para que pueda iterarlo en un loop
      //alert("arreglo mostrado: "+JSON.stringify(this.arregloTransacciones));
    },
    (error)=>{
      console.log("algo ocurrio: ",error)
    }
  );
}

ngOnInit() {
    this.listarMetodosPago();
    this.listarProductos();
    this.listarUsuarios();
    this.listarClientes();
  }

}
