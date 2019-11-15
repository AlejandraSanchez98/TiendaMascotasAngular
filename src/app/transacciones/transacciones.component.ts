import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../api.service';
import { IVentas } from '../api.service';
import { ICompras } from '../api.service';


@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {
  public arregloTransaccionesVentas:IVentas[];
  public arregloTransaccionesCompras:ICompras[];

  displayedColumns: string[] = ['idVenta', 'montoSinIVA','IVA','montoConIVA','cantidadTotalProductos','pago','cambio','fechaRegistro','nombreProducto','nombreUsuario','nombreCliente','tipoPago'];
  dataSource:MatTableDataSource<IVentas>;

  displayedColumnsCompras: string[] = ['idCompra', 'montoTotal','fechaRegistro','nombreProveedor','nombreUsuario','nombreProducto','cantidadProducto'];
  dsCompras:MatTableDataSource<ICompras>;



  constructor(public API:ApiService) {
    this.arregloTransaccionesVentas=[];
    this.arregloTransaccionesCompras=[];
  }

  //listar ventas
  public listarVentas (){
    this.API.listarVentas().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.arregloTransaccionesVentas=success.respuesta;
        this.dataSource = new MatTableDataSource(this.arregloTransaccionesVentas);
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }

  //listar compras
  public listarCompras (){
    this.API.listarCompras().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.arregloTransaccionesCompras=success.respuesta;
        this.dsCompras = new MatTableDataSource(this.arregloTransaccionesCompras);
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }


  ngOnInit() {
    this.listarVentas();
    this.listarCompras();
  }

}
