import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


export interface IProveedores {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  email: string;
  rfc: string;
  razonsocial: string;
}


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  public arregloProveedores:IProveedores[];
  public modal: NgbModalRef;
  public idProveedor:number;

  public frmProveedores:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;

  displayedColumns = ['id', 'nombre', 'direccion', 'telefono', 'ciudad', 'email', 'rfc','razonsocial','acciones'];
  dataSource: MatTableDataSource<IProveedores>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private modalService: NgbModal, public router:Router,public formBuilder: FormBuilder, public API:ApiService) {

    //inicializacion
    this.titulo="";
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmProveedores= this.formBuilder.group({
      id:[""],
      nombre:["",Validators.required],
      direccion:["",Validators.required],
      telefono:["",Validators.required],
      ciudad:["",Validators.required],
      email:["",Validators.required],
      rfc:["",Validators.required],
      razonsocial:["",Validators.required]
    });

  }


  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Proveedor";
  }


  public openEditar(content, id: number, nombre: string, direccion:string, telefono:string, ciudad:string, email:string, rfc:string,razonsocial:string){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Proveedor";

    this.frmProveedores.controls['id'].setValue(id);
    this.frmProveedores.controls['nombre'].setValue(nombre);
    this.frmProveedores.controls['direccion'].setValue(direccion);
    this.frmProveedores.controls['telefono'].setValue(telefono);
    this.frmProveedores.controls['ciudad'].setValue(ciudad);
    this.frmProveedores.controls['email'].setValue(email);
    this.frmProveedores.controls['rfc'].setValue(rfc);
    this.frmProveedores.controls['razonsocial'].setValue(razonsocial);


  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL
  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let nombreForm = this.frmProveedores.get('nombre').value;
    let direccionForm = this.frmProveedores.get('direccion').value;
    let telefonoForm = this.frmProveedores.get('telefono').value;
    let ciudadForm = this.frmProveedores.get('ciudad').value;
    let emailForm = this.frmProveedores.get('email').value;
    let rfcForm = this.frmProveedores.get('rfc').value;
    let razonsocialForm = this.frmProveedores.get('razonsocial').value;



    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Proveedor") {

      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarProveedor(nombreForm, direccionForm, telefonoForm, ciudadForm, emailForm, rfcForm, razonsocialForm).subscribe(
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
    if (this.titulo == "Editar Proveedor") {
      //OBTENEMOS LOS VALORES DEL FORMULARIO
      let id = this.frmProveedores.get('id').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let nombreForm = this.frmProveedores.get('nombre').value;
      let direccionForm = this.frmProveedores.get('direccion').value;
      let telefonoForm = this.frmProveedores.get('telefono').value;
      let ciudadForm = this.frmProveedores.get('ciudad').value;
      let emailForm = this.frmProveedores.get('email').value;
      let rfcForm = this.frmProveedores.get('rfc').value;
      let razonsocialForm = this.frmProveedores.get('razonsocial').value;

      //EJECUTANDO PETICION PUT
      this.API.editarProveedor(id, nombreForm, direccionForm,telefonoForm, ciudadForm, emailForm, rfcForm, razonsocialForm).subscribe(
        (success: any)=>{
          console.log("Registro editado: "+success);
          location.reload();//recarga la pagina para poder notar lo cambios
        },
        (error)=>{
          console.log("Lo siento: "+error);
        }
      );
    }
  }

  //eliminar categoria
  public eliminarProveedor(id:number){
    this.API.eliminarProveedor(id).subscribe(
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
  public  listarProveedores(){
    this.API.listarProveedores().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.dataSource = new MatTableDataSource(this.arregloProveedores=success.respuesta);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error)=>{
        console.log("Lo sentimos"+error);
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
    this.listarProveedores();
  }
}
