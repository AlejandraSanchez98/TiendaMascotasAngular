import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

export interface IClientes {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  email: string;
  password:string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public arregloClientes:IClientes[];
  public closeResult:string;
  public modal: NgbModalRef;
  public idCliente:number;

  public frmClientes:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;


  displayedColumns = ['id', 'nombre', 'direccion', 'ciudad', 'telefono', 'email','acciones'];
  dataSource: MatTableDataSource<IClientes>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo="";
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmClientes= this.formBuilder.group({
      id:[""],
      nombre:["",Validators.required],
      direccion:["",Validators.required],
      ciudad:["",Validators.required],
      telefono:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    });
  }

  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Cliente"
  }


  public openEditar(content, id: number, nombre: string, direccion:string, ciudad:string, telefono:string, email:string, password:string, ){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Cliente";

    this.frmClientes.controls['id'].setValue(id);
    this.frmClientes.controls['nombre'].setValue(nombre);
    this.frmClientes.controls['direccion'].setValue(direccion);
    this.frmClientes.controls['ciudad'].setValue(ciudad);
    this.frmClientes.controls['telefono'].setValue(telefono);
    this.frmClientes.controls['email'].setValue(email);
    this.frmClientes.controls['password'].setValue(password);
    alert("pass"+email);
    alert("pass"+password);
  }

  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let nombreForm = this.frmClientes.get('nombre').value;
    let direccionForm = this.frmClientes.get('direccion').value;
    let ciudadForm = this.frmClientes.get('ciudad').value;
    let telefonoForm = this.frmClientes.get('telefono').value;
    let emailForm = this.frmClientes.get('email').value;
    let passwordForm = this.frmClientes.get('password').value;

    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Cliente") {
      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarCliente(nombreForm, direccionForm, ciudadForm,telefonoForm,emailForm,passwordForm).subscribe(
        (success: any)=>{
          console.log("exito: "+ JSON.stringify(success));
          location.reload();
        },
        (error)=>{
          console.log("Lo siento: "+error);
        }
      );
      this.modal.close();
    }
    if (this.titulo == "Editar Cliente") {
      //OBTENEMOS LOS VALORES DEL FORMULARIO
      let id = this.frmClientes.get('id').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let nombreForm = this.frmClientes.get('nombre').value;
      let direccionForm = this.frmClientes.get('direccion').value;
      let ciudadForm = this.frmClientes.get('ciudad').value;
      let telefonoForm = this.frmClientes.get('telefono').value;
      let emailForm = this.frmClientes.get('email').value;
      let passwordForm = this.frmClientes.get('password').value;
      //EJECUTANDO PETICION PUT
      this.API.editarCliente(id,nombreForm,direccionForm,ciudadForm,telefonoForm,emailForm,passwordForm).subscribe(
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
  public eliminarCliente(id:number){
    this.API.eliminarCliente(id).subscribe(
      (success:any)=>{
        console.log("Exito"+success);
        location.reload();
      },
      (error)=>{
        console.log("Error"+ error);
      }
    )
  }

  //listar clientes
  public  listarClientes(){
    this.API.listarClientes().subscribe(
      (success:any)=>{
        this.dataSource = new MatTableDataSource(this.arregloClientes=success.respuesta);

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
    this.listarClientes();
  }
}
