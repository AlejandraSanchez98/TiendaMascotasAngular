import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from '../api.service';

export interface IProductosMasVendidos {
  id: number;
  nombreProducto: string;
  cantidadProducto:number;
}

export interface IVendedoresMasVentas {
  id: number;
  nombreUsuario: string;
  montoConIVA:number;
}

export interface IProductoStockMinimo {
  id: number;
  nombreProducto: string;
  precioUnitario:number;
  descripcionProducto:string;
  stock:number;
}


export interface IUtilidad {
  MontoTotalVentas: number;
  MontoTotalCompras: number;
  Utilidad:number;
}


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  public arregloProductosMasVendidos:IProductosMasVendidos[];
  public arregloVendedoresMasVentas:IVendedoresMasVentas[];
  public arregloProductoStockMinimo:IProductoStockMinimo[];
  public arregloUtilidad : IUtilidad[];

  displayedColumns = ['id', 'nombreProducto','cantidadProducto'];
  dataSource:MatTableDataSource<IProductosMasVendidos>;

  dcVendedoresMasVentas = ['id','nombreUsuario','montoConIVA'];
  dsVendedoresMasVentas:MatTableDataSource<IVendedoresMasVentas>;

  dcProductoStockMinimo = ['id','nombreProducto','precioUnitario', 'descripcionProducto', 'stock'];
  dsProductoStockMinimo:MatTableDataSource<IProductoStockMinimo>;

  dcUtilidad = ['MontoTotalVentas','MontoTotalCompras','Utilidad'];
  dsUtilidad:MatTableDataSource<IUtilidad>;
  //dataSource: MatTableDataSource<TableRecord> = new MatTableDataSource([])


  constructor(public API:ApiService) { }

  //listar productosMasVendidos
  public  productosMasVendidos(){
    this.API.productosMasVendidos().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.arregloProductosMasVendidos=success.respuesta;
        this.dataSource = new MatTableDataSource(this.arregloProductosMasVendidos);
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }

  //listar vendedoresMasVentas
  public  vendedoresMasVentas(){
    this.API.vendedoresMasVentas().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.arregloVendedoresMasVentas=success.respuesta;
        this.dsVendedoresMasVentas = new MatTableDataSource(this.arregloVendedoresMasVentas);
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }

  //listar productoStockMinimo
  public  productoStockMinimo(){
    this.API.productoStockMinimo().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.arregloProductoStockMinimo=success.respuesta;
        this.dsProductoStockMinimo = new MatTableDataSource(this.arregloProductoStockMinimo);
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }

  /*//listar utilidad
  public utilidad(){
  this.API.utilidad().subscribe(
  (success:any)=>{
  alert("Exito"+success);
  public ventas [0],[1]

  this.arregloUtilidad=success.respuesta;
  this.dsUtilidad = new MatTableDataSource([this.arregloUtilidad]);
},
(error)=>{
console.log("Lo sentimos"+error);
});
}*/
ngOnInit() {
  this.productosMasVendidos();
  this.vendedoresMasVentas();
  this.productoStockMinimo();
  //this.utilidad();
}
}
