import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {ApiService} from '../api.service';
import { IDevoluciones } from '../api.service';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.scss']
})
export class DevolucionesComponent implements OnInit {
  public arregloDevoluciones:IDevoluciones[];
  public arregloClientesSelect:IDevoluciones[];
  public arregloTipoDevolucionSelect:IDevoluciones[];
  public arregloProductosSelect:IDevoluciones[];

  public modal: NgbModalRef;
  public frmDevoluciones:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;

  displayedColumns: string[] = ['idDevolucion', 'montoDevolucion', 'motivoDevolucion', 'nombreCliente', 'tipoDevolucion', 'nombreProducto'];
  dataSource: MatTableDataSource<IDevoluciones>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo="";
    this.arregloDevoluciones=[];
    this.arregloClientesSelect=[];
    this.arregloTipoDevolucionSelect=[];
    this.arregloProductosSelect=[];

    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmDevoluciones= this.formBuilder.group({
      idDevolucion:[""],
      montoDevolucion:["",Validators.required],
      motivoDevolucion:["",Validators.required],
      idCliente:["",Validators.required],
      idTipoDevolucion:["",Validators.required],
      idProducto:["",Validators.required]
    });
  }


  //Abrir modal
  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Producto"
  }

  //listar devoluciones
  public  listarDevoluciones(){
    this.API.listarDevoluciones().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.dataSource = new MatTableDataSource(this.arregloDevoluciones=success.respuesta);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }

  public agregarDevolucion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let montoDevolucionForm = this.frmDevoluciones.get('montoDevolucion').value;
    let motivoDevolucionForm = this.frmDevoluciones.get('motivoDevolucion').value;
    let idClienteForm = this.frmDevoluciones.get('idCliente').value;
    let idTipoDevolucionForm = this.frmDevoluciones.get('idTipoDevolucion').value;
    let idProductoForm = this.frmDevoluciones.get('idProducto').value;
    //SE AGREGAN REGISTROS MEDIANTE POST
    this.API.agregarDevolucion(montoDevolucionForm,motivoDevolucionForm,idClienteForm,idTipoDevolucionForm,idProductoForm).subscribe(
      (success:any)=>{
        console.log("Exito"+success);
        location.reload();
      },
      (error)=>{
        console.log("Error"+ error);
      }
    )
  }


  //listar el select de clientes
  public listarClientes(){
    this.API.listarClientes().subscribe(
      (success:any)=>{
        return this.arregloClientesSelect = success.respuesta;
      },
      (error)=>{
        console.log("Error", error)
      }
    );
  }

  //listar el select de tipo de devoluciones
  public listarTiposDevoluciones(){
    this.API.listarTiposDevoluciones().subscribe(
      (success:any)=>{
        return this.arregloTipoDevolucionSelect = success.respuesta;
      },
      (error)=>{
        console.log("Error", error)
      }
    );
  }

  //listar el select de productos
  public listarProductos(){
    this.API.listarProductos().subscribe(
      (success:any)=>{
        return this.arregloProductosSelect = success.respuesta;
      },
      (error)=>{
        console.log("Error", error)
      }
    );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit() {
    this.listarDevoluciones();
    this.listarClientes();
    this.listarTiposDevoluciones();
    this.listarProductos();
  }
}
