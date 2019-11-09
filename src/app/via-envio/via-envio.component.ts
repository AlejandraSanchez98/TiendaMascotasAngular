import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { IViaEnvios } from '../api.service';


@Component({
  selector: 'app-via-envio',
  templateUrl: './via-envio.component.html',
  styleUrls: ['./via-envio.component.scss']
})
export class ViaEnvioComponent implements OnInit {

  public arregloViaEnvios:IViaEnvios[];
  public modal: NgbModalRef;

  public frmViaEnvios:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;

  displayedColumns: string[] = ['idViaEnvio', 'medioEnvio', 'descripcion','acciones'];
  dataSource:MatTableDataSource<IViaEnvios>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo="";
    this.arregloViaEnvios=[];
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmViaEnvios= this.formBuilder.group({
      idViaEnvio:[""],
      medioEnvio:["",Validators.required],
      descripcion:["",Validators.required]
    });
  }


  //Abrir modal
  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Medio De Envio"
  }

  public openEditar(content, idViaEnvio: number, medioEnvio: string, descripcion:string){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Medio De Envio";

    this.frmViaEnvios.controls['idViaEnvio'].setValue(idViaEnvio);
    this.frmViaEnvios.controls['medioEnvio'].setValue(medioEnvio);
    this.frmViaEnvios.controls['descripcion'].setValue(descripcion);
  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL //anteriormente se llamaba darAlta
  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let medioEnvioForm = this.frmViaEnvios.get('medioEnvio').value;
    let descripcionForm = this.frmViaEnvios.get('descripcion').value;
    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Medio De Envio") {

      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarMedioEnvio(medioEnvioForm, descripcionForm).subscribe(
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
    if (this.titulo == "Editar Medio De Envio") {
      //OBTENEMOS LOS VALORES DEL FORMULARIO
      let idViaEnvio = this.frmViaEnvios.get('idViaEnvio').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let medioEnvioForm = this.frmViaEnvios.get('medioEnvio').value;
      let descripcionForm = this.frmViaEnvios.get('descripcion').value;

      //EJECUTANDO PETICION PUT
      this.API.editarMedioEnvio(idViaEnvio,medioEnvioForm,descripcionForm).subscribe(
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

  //eliminar Medio de envio
  public eliminarMedioEnvio(idViaEnvio:number){
    this.API.eliminarMedioEnvio(idViaEnvio).subscribe(
      (success:any)=>{
        console.log("Exito"+success);
        location.reload();
      },
      (error)=>{
        console.log("Error"+ error);
      }
    )
  }

  //listar Medios de envio
  public  listarMediosEnvios(){
    this.API.listarMediosEnvios().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.arregloViaEnvios=success.respuesta;
        this.dataSource = new MatTableDataSource(this.arregloViaEnvios);

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
    this.listarMediosEnvios();
  }
}
