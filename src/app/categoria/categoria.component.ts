import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { error } from '@angular/compiler/src/util';

export interface ICategoria {
  id: number;
  nombre: string;
  subcategoria: string;
  descripcion: string;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  public arregloCategorias:ICategoria[];
  public modal: NgbModalRef;

  public frmCategorias:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;

  displayedColumns = ['id', 'nombre', 'subcategoria', 'descripcion','acciones'];
  dataSource:MatTableDataSource<ICategoria>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;





  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo=""
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmCategorias= this.formBuilder.group({
      id:[""],
      nombre:["",Validators.required],
      subcategoria:["",Validators.required],
      descripcion:["",Validators.required]
    });
  }

  //Abrir modal
  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Categoria"
  }

  public openEditar(content, id: number, nombre: string, subcategoria:string, descripcion:string){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Categoria";

    this.frmCategorias.controls['id'].setValue(id);
    this.frmCategorias.controls['nombre'].setValue(nombre);
    this.frmCategorias.controls['subcategoria'].setValue(subcategoria);
    this.frmCategorias.controls['descripcion'].setValue(descripcion);
  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL //anteriormente se llamaba darAlta
  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let nombreForm = this.frmCategorias.get('nombre').value;
    let subcategoriaForm = this.frmCategorias.get('subcategoria').value;
    let descripcionForm = this.frmCategorias.get('descripcion').value;
    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Categoria") {

      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarCategoria(nombreForm, subcategoriaForm, descripcionForm).subscribe(
        (success: any)=>{
          alert("exito: "+ JSON.stringify(success));
          location.reload();
        },
        (error)=>{
          console.log("Lo siento: "+error);
        }
      );
      this.modal.close();
    }
    if (this.titulo == "Editar Categoria") {
      //OBTENEMOS LOS VALORES DEL FORMULARIO
      let id = this.frmCategorias.get('id').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let nombreForm = this.frmCategorias.get('nombre').value;
      let subcategoriaForm = this.frmCategorias.get('subcategoria').value;
      let descripcionForm = this.frmCategorias.get('descripcion').value;

      //EJECUTANDO PETICION PUT
      this.API.editarCategoria(id,nombreForm,subcategoriaForm,descripcionForm).subscribe(
        (success: any)=>{
          console.log("Registro editado: "+success);
          location.reload();//recarga la pagina para poder notar lo cambios
        },
        (error)=>{
          console.log("Lo siento: "+error);
        }
      );
    }
  }//----------------------fin operaciones-------------------------------------------------------------------

  //eliminar categoria
  public eliminarCategoria(id:number){
    this.API.eliminarCategoria(id).subscribe(
      (success:any)=>{
        console.log("Exito"+success);
        location.reload();
      },
      (error)=>{
        console.log("Error"+ error);
      }
    )
  }

  //listar categorias
  public  listarCategorias(){
    this.API.listarCategorias().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.dataSource = new MatTableDataSource(this.arregloCategorias=success.respuesta);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }
  
  ngOnInit() {
    this.listarCategorias();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
