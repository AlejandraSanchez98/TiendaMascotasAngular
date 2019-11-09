import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {ApiService} from '../api.service';
import { IProveedores } from '../api.service';


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

  displayedColumns: string[] = ['idProveedor', 'nombreProveedor', 'direccionProveedor', 'telefonoProveedor', 'ciudadProveedor', 'emailProveedor', 'RFCProveedor','razonSocial','acciones'];
  dataSource: MatTableDataSource<IProveedores>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private modalService: NgbModal, public router:Router,public formBuilder: FormBuilder, public API:ApiService) {

    //inicializacion
    this.titulo="";
    this.arregloProveedores=[];
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmProveedores= this.formBuilder.group({
      idProveedor:[""],
      nombreProveedor:["",Validators.required],
      direccionProveedor:["",Validators.required],
      telefonoProveedor:["",Validators.required],
      ciudadProveedor:["",Validators.required],
      emailProveedor:["",Validators.required],
      RFCProveedor:["",Validators.required],
      razonSocial:["",Validators.required]
    });

  }


  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Proveedor";
  }


  public openEditar(content, idProveedor: number, nombreProveedor: string, direccionProveedor:string, telefonoProveedor:string, ciudadProveedor:string, emailProveedor:string, RFCProveedor:string,razonSocial:string){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Proveedor";

    this.frmProveedores.controls['idProveedor'].setValue(idProveedor);
    this.frmProveedores.controls['nombreProveedor'].setValue(nombreProveedor);
    this.frmProveedores.controls['direccionProveedor'].setValue(direccionProveedor);
    this.frmProveedores.controls['telefonoProveedor'].setValue(telefonoProveedor);
    this.frmProveedores.controls['ciudadProveedor'].setValue(ciudadProveedor);
    this.frmProveedores.controls['emailProveedor'].setValue(emailProveedor);
    this.frmProveedores.controls['RFCProveedor'].setValue(RFCProveedor);
    this.frmProveedores.controls['razonSocial'].setValue(razonSocial);


  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL
  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let nombreProveedorForm = this.frmProveedores.get('nombreProveedor').value;
    let direccionProveedorForm = this.frmProveedores.get('direccionProveedor').value;
    let telefonoProveedorForm = this.frmProveedores.get('telefonoProveedor').value;
    let ciudadProveedorForm = this.frmProveedores.get('ciudadProveedor').value;
    let emailProveedorForm = this.frmProveedores.get('emailProveedor').value;
    let RFCProveedorForm = this.frmProveedores.get('RFCProveedor').value;
    let razonSocialForm = this.frmProveedores.get('razonSocial').value;



    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Proveedor") {

      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarProveedor(nombreProveedorForm, direccionProveedorForm, telefonoProveedorForm, ciudadProveedorForm, emailProveedorForm, RFCProveedorForm, razonSocialForm).subscribe(
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
      let idProveedor = this.frmProveedores.get('idProveedor').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let nombreProveedorForm = this.frmProveedores.get('nombreProveedor').value;
      let direccionProveedorForm = this.frmProveedores.get('direccionProveedor').value;
      let telefonoProveedorForm = this.frmProveedores.get('telefonoProveedor').value;
      let ciudadProveedorForm = this.frmProveedores.get('ciudadProveedor').value;
      let emailProveedorForm = this.frmProveedores.get('emailProveedor').value;
      let RFCProveedorForm = this.frmProveedores.get('RFCProveedor').value;
      let razonSocialForm = this.frmProveedores.get('razonSocial').value;

      //EJECUTANDO PETICION PUT
      this.API.editarProveedor(idProveedor, nombreProveedorForm, direccionProveedorForm,telefonoProveedorForm, ciudadProveedorForm, emailProveedorForm, RFCProveedorForm, razonSocialForm).subscribe(
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
  public eliminarProveedor(idProveedor:number){
    this.API.eliminarProveedor(idProveedor).subscribe(
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
