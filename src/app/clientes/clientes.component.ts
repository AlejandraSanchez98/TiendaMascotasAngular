import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { sha256, sha224 } from 'js-sha256';
import {ApiService} from '../api.service';
import { IClientes } from '../api.service';

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


  displayedColumns: string[] = ['idCliente', 'nombreCliente', 'direccionCliente', 'ciudadCliente', 'telefonoCliente', 'emailCliente','acciones'];
  dataSource: MatTableDataSource<IClientes>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo="";
    this.arregloClientes=[];
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmClientes= this.formBuilder.group({
      idCliente:[""],
      nombreCliente:["",Validators.required],
      direccionCliente:["",Validators.required],
      ciudadCliente:["",Validators.required],
      telefonoCliente:["",Validators.required],
      emailCliente:["",Validators.required],
      passwordCliente:["",Validators.required]
    });
  }

  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Cliente"
  }


  public openEditar(content, idCliente: number, nombreCliente: string, direccionCliente:string, ciudadCliente:string, telefonoCliente:string, emailCliente:string, passwordCliente:string){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Cliente";

    this.frmClientes.controls['idCliente'].setValue(idCliente);
    this.frmClientes.controls['nombreCliente'].setValue(nombreCliente);
    this.frmClientes.controls['direccionCliente'].setValue(direccionCliente);
    this.frmClientes.controls['ciudadCliente'].setValue(ciudadCliente);
    this.frmClientes.controls['telefonoCliente'].setValue(telefonoCliente);
    this.frmClientes.controls['emailCliente'].setValue(emailCliente);
  }

  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let nombreClienteForm = this.frmClientes.get('nombreCliente').value;
    let direccionClienteForm = this.frmClientes.get('direccionCliente').value;
    let ciudadClienteForm = this.frmClientes.get('ciudadCliente').value;
    let telefonoClienteForm = this.frmClientes.get('telefonoCliente').value;
    let emailClienteForm = this.frmClientes.get('emailCliente').value;
    let passwordClienteForm = this.frmClientes.get('passwordCliente').value;

    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Cliente") {
      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarCliente(nombreClienteForm, direccionClienteForm, ciudadClienteForm,telefonoClienteForm,emailClienteForm,passwordClienteForm).subscribe(
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
      let idCliente = this.frmClientes.get('idCliente').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let nombreClienteForm = this.frmClientes.get('nombreCliente').value;
      let direccionClienteForm = this.frmClientes.get('direccionCliente').value;
      let ciudadClienteForm = this.frmClientes.get('ciudadCliente').value;
      let telefonoClienteForm = this.frmClientes.get('telefonoCliente').value;
      let emailClienteForm = this.frmClientes.get('emailCliente').value;
      let passwordClienteForm = sha256(this.frmClientes.get('passwordCliente').value);
      //EJECUTANDO PETICION PUT
      this.API.editarCliente(idCliente,nombreClienteForm,direccionClienteForm,ciudadClienteForm,telefonoClienteForm,emailClienteForm,passwordClienteForm).subscribe(
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
  public eliminarCliente(idCliente:number){
    this.API.eliminarCliente(idCliente).subscribe(
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
