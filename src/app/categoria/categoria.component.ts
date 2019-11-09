import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {ApiService} from '../api.service';
import { ICategoria } from '../api.service';
import { error } from '@angular/compiler/src/util';


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

  displayedColumns: string[] = ['idCategoria', 'nombreCategoria', 'subCategoria', 'descripcion','acciones'];
  dataSource:MatTableDataSource<ICategoria>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo="";
    this.arregloCategorias=[];
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmCategorias= this.formBuilder.group({
      idCategoria:[""],
      nombreCategoria:["",Validators.required],
      subCategoria:["",Validators.required],
      descripcion:["",Validators.required]
    });
  }

  //Abrir modal
  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Categoria"
  }

  public openEditar(content, idCategoria: number, nombreCategoria: string, subCategoria:string, descripcion:string){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Categoria";

    this.frmCategorias.controls['idCategoria'].setValue(idCategoria);
    this.frmCategorias.controls['nombreCategoria'].setValue(nombreCategoria);
    this.frmCategorias.controls['subCategoria'].setValue(subCategoria);
    this.frmCategorias.controls['descripcion'].setValue(descripcion);
  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL //anteriormente se llamaba darAlta
  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let nombreCategoriaForm = this.frmCategorias.get('nombreCategoria').value;
    let subCategoriaForm = this.frmCategorias.get('subCategoria').value;
    let descripcionForm = this.frmCategorias.get('descripcion').value;
    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Categoria") {

      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarCategoria(nombreCategoriaForm, subCategoriaForm, descripcionForm).subscribe(
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
      let idCategoria = this.frmCategorias.get('idCategoria').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let nombreCategoriaForm = this.frmCategorias.get('nombreCategoria').value;
      let subCategoriaForm = this.frmCategorias.get('subCategoria').value;
      let descripcionForm = this.frmCategorias.get('descripcion').value;

      //EJECUTANDO PETICION PUT
      this.API.editarCategoria(idCategoria,nombreCategoriaForm,subCategoriaForm,descripcionForm).subscribe(
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
  public eliminarCategoria(idCategoria:number){
    this.API.eliminarCategoria(idCategoria).subscribe(
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
