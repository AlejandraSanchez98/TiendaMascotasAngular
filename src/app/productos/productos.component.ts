import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


export interface IProductos{
  id: number;
  nombre: string;
  preciounitario: number;
  descripcion: string;
  stock: number;
  nombreCategoria:string;
}

interface ICategoria{
  nombreCategoria:string
}


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public arregloProductos:IProductos[];
  public arregloCategoria:ICategoria[];
  public modal: NgbModalRef;
  public frmProductos:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;
  displayedColumns = ['id', 'nombre', 'preciounitario', 'descripcion', 'stock', 'nombreCategoria','acciones'];
  dataSource: MatTableDataSource<IProductos>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo=""
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmProductos= this.formBuilder.group({
      id:[""],
      nombre:["",Validators.required],
      preciounitario:["",Validators.required],
      descripcion:["",Validators.required],
      stock:["",Validators.required],
      nombreCategoria:["",Validators.required]
    });
  }
  
  //Abrir modal
  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Producto"
  }

  public openEditar(content, id: number, nombre: string, preciounitario:number, descripcion:string, stock:number, nombreCategoria:string){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Producto";
    this.frmProductos.controls['id'].setValue(id);
    this.frmProductos.controls['nombre'].setValue(nombre);
    this.frmProductos.controls['preciounitario'].setValue(preciounitario);
    this.frmProductos.controls['descripcion'].setValue(descripcion);
    this.frmProductos.controls['stock'].setValue(stock);
    this.frmProductos.controls['nombreCategoria'].setValue(nombreCategoria);
    alert("idCategoria:  " + nombreCategoria);
  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL //anteriormente se llamaba darAlta
  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let nombreForm = this.frmProductos.get('nombre').value;
    let preciounitarioForm = this.frmProductos.get('preciounitario').value;
    let descripcionForm = this.frmProductos.get('descripcion').value;
    let stockForm = this.frmProductos.get('stock').value;
    let idCategoria = this.frmProductos.get('nombreCategoria').value;
    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Producto") {
      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarProducto(nombreForm, preciounitarioForm, descripcionForm, stockForm, idCategoria ).subscribe(
        (success: any)=>{
          this.arregloProductos = success;
          alert("exito: "+ JSON.stringify(this.arregloProductos));
          alert("Pelicula Agregada");
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
      let id = this.frmProductos.get('id').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let nombreForm = this.frmProductos.get('nombre').value;
      let preciounitarioForm = this.frmProductos.get('preciounitario').value;
      let descripcionForm = this.frmProductos.get('descripcion').value;
      let stockForm = this.frmProductos.get('stock').value;
      let idCategoria = this.frmProductos.get('nombreCategoria').value;
      //EJECUTANDO PETICION PUT
      this.API.editarProducto(id,nombreForm,preciounitarioForm,descripcionForm,stockForm,idCategoria).subscribe(
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
  public eliminarProducto (id:number){
    this.API.eliminarProducto(id).subscribe(
      (success:any)=>{
        console.log("Exito"+success);
        location.reload();
      },
      (error)=>{
        console.log("Error"+ error);
      }
    )
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
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
