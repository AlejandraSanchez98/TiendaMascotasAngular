import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {ApiService} from '../api.service';
import { IProductos } from '../api.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public arregloProductos:IProductos[];
  public arregloProductosSelect:IProductos[];

  public modal: NgbModalRef;
  public frmProductos:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;

  displayedColumns: string[] = ['idProducto', 'nombreProducto', 'precioUnitario', 'descripcionProducto', 'stock', 'nombreCategoria','acciones'];
  dataSource: MatTableDataSource<IProductos>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo="";
    this.arregloProductos=[];
    this.arregloProductosSelect=[];

    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmProductos= this.formBuilder.group({
      idProducto:[""],
      nombreProducto:["",Validators.required],
      precioUnitario:["",Validators.required],
      descripcionProducto:["",Validators.required],
      stock:["",Validators.required],
      idCategoria:["",Validators.required]
    });
  }

  //Abrir modal
  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Producto"
  }

  public openEditar(content, idProducto: number, nombreProducto: string, precioUnitario:number, descripcionProducto:string, stock:number, idCategoria:number){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Producto";
    this.frmProductos.controls['idProducto'].setValue(idProducto);
    this.frmProductos.controls['nombreProducto'].setValue(nombreProducto);
    this.frmProductos.controls['precioUnitario'].setValue(precioUnitario);
    this.frmProductos.controls['descripcionProducto'].setValue(descripcionProducto);
    this.frmProductos.controls['stock'].setValue(stock);
    //this.frmProductos.controls['idCategoria'].setValue(idCategoria);
    //alert("idCategoria:  " + idCategoria);
  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL //anteriormente se llamaba darAlta
  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let nombreProductoForm = this.frmProductos.get('nombreProducto').value;
    let precioUnitarioForm = this.frmProductos.get('precioUnitario').value;
    let descripcionProductoForm = this.frmProductos.get('descripcionProducto').value;
    let stockForm = this.frmProductos.get('stock').value;
    let idCategoriaForm = this.frmProductos.get('idCategoria').value;
    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Producto") {
      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarProducto(nombreProductoForm, precioUnitarioForm, descripcionProductoForm, stockForm, idCategoriaForm ).subscribe(
        (success: any)=>{
          this.arregloProductos = success;
          alert("exito: "+ JSON.stringify(this.arregloProductos));
          location.reload();
        },
        (error)=>{
          console.log("Lo siento: "+error);
        }
      );
      this.modal.close();
    }
    if (this.titulo == "Editar Producto") {
      //OBTENEMOS LOS VALORES DEL FORMULARIO
      let idProducto = this.frmProductos.get('idProducto').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let nombreProductoForm = this.frmProductos.get('nombreProducto').value;
      let precioUnitarioForm = this.frmProductos.get('precioUnitario').value;
      let descripcionProductoForm = this.frmProductos.get('descripcionProducto').value;
      let stockForm = this.frmProductos.get('stock').value;
      let idCategoria = this.frmProductos.get('idCategoria').value;
      //EJECUTANDO PETICION PUT
      this.API.editarProducto(idProducto,nombreProductoForm,precioUnitarioForm,descripcionProductoForm,stockForm,idCategoria).subscribe(
        (success: any)=>{
          alert("Registro editado: "+ JSON.stringify(success));
          location.reload();//recarga la pagina para poder notar lo cambios
        },
        (error)=>{
          console.log("Lo siento: "+error);
        }
      );
    }
  }//----------------------fin operaciones-------------------------------------------------------------------

  //eliminar Producto
  public eliminarProducto (idProducto:number){
    this.API.eliminarProducto(idProducto).subscribe(
      (success:any)=>{
        console.log("Exito"+success);
        location.reload();
      },
      (error)=>{
        console.log("Error"+ error);
      }
    )
  }

  //listar el select de categorias
  public listarCategorias(){
    this.API.listarCategorias().subscribe(
      (success:any)=>{
        return this.arregloProductosSelect = success.respuesta;
      },
      (error)=>{
        console.log("Error", error)
      }
    );
  }

  //listar productos
  public  listarProductos(){
    this.API.listarProductos().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.dataSource = new MatTableDataSource(this.arregloProductos=success.respuesta);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }



  ngOnInit() {
    this.listarProductos();
    this.listarCategorias();

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
