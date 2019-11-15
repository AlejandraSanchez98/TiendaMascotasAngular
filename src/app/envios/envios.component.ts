import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {ApiService} from '../api.service';
import { IEnvios } from '../api.service';
import { IViaEnvios } from '../api.service';


@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit {
  public arregloEnvios:IEnvios[];
  public arregloVentasSelect:IEnvios[];
  public arregloEnviosSelect:IEnvios[];
  public arregloViaEnvios:IViaEnvios[];

  public modal: NgbModalRef;
  public frmEnvios:FormGroup;
  public frmViaEnvios:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;

  displayedColumns: string[] = ['idEnvio','direccion','ciudad','observaciones','idVenta','medioEnvio']
  dataSource: MatTableDataSource<IEnvios>;

  displayedColumnsViaEnvios: string[] = ['idViaEnvio', 'medioEnvio', 'descripcion','acciones'];
  dsViaEnvios:MatTableDataSource<IViaEnvios>;

  @ViewChild('MatPaginatorEnvios', {static: true}) paginatorEnvios: MatPaginator;
  @ViewChild('MatPaginatorViaEnvios',{static: true}) paginatorViaEnvios:MatPaginator;

  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo="";
    this.arregloEnvios=[];
    this.arregloVentasSelect=[];
    this.arregloEnviosSelect=[];
    this.arregloViaEnvios=[];
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL

    this.frmEnvios = this.formBuilder.group({
      idEnvio:[""],
      direccion:["",Validators.required],
      ciudad:["",Validators.required],
      observaciones:["",Validators.required],
      idVenta:["",Validators.required],
      idViaEnvio:["",Validators.required]
    });

    this.frmViaEnvios= this.formBuilder.group({
      idViaEnvio:[""],
      medioEnvio:["",Validators.required],
      descripcion:["",Validators.required]
    });
  }


  //Abrir modal Envios
  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Envio"

  }

  //listar Envios
  public  listarEnvios(){
    this.API.listarEnvios().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.dataSource = new MatTableDataSource(this.arregloEnvios=success.respuesta);

        this.dataSource.paginator = this.paginatorEnvios;
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }

  public agregarEnvio(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let direccionForm = this.frmEnvios.get('direccion').value;
    let ciudadForm = this.frmEnvios.get('ciudad').value;
    let observacionesForm = this.frmEnvios.get('observaciones').value;
    let idVentaForm = this.frmEnvios.get('idVenta').value;
    let idViaEnvioForm = this.frmEnvios.get('idViaEnvio').value;
    //SE AGREGAN REGISTROS MEDIANTE POST
    this.API.agregarEnvio(direccionForm,ciudadForm,observacionesForm,idVentaForm,idViaEnvioForm).subscribe(
      (success:any)=>{
        console.log("Exito"+success);
        location.reload();
      },
      (error)=>{
        console.log("Error"+ error);
      }
    )
  }


  //listar el select de ventas
  public listarVentas(){
    this.API.listarVentas().subscribe(
      (success:any)=>{
        return this.arregloVentasSelect = success.respuesta;
      },
      (error)=>{
        console.log("Error", error)
      }
    );
  }

  //listar el select de viaEnvio
  public listarMediosEnviosSelect(){
    this.API.listarMediosEnvios().subscribe(
      (success:any)=>{
        return this.arregloEnviosSelect = success.respuesta;
      },
      (error)=>{
        console.log("Error", error)
      }
    );
  }


  //Abrir modal Medio Envio
  public openAgregarViaEnvio(contentViaEnvio) {
    this.modal= this.modalService.open(contentViaEnvio, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Medio De Envio"
  }

  public openEditarViaEnvio(contentViaEnvio, idViaEnvio: number, medioEnvio: string, descripcion:string){
    this.modal= this.modalService.open(contentViaEnvio,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Medio De Envio";

    this.frmViaEnvios.controls['idViaEnvio'].setValue(idViaEnvio);
    this.frmViaEnvios.controls['medioEnvio'].setValue(medioEnvio);
    this.frmViaEnvios.controls['descripcion'].setValue(descripcion);
  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL //anteriormente se llamaba darAlta
  public ejecutarPeticionViaEnvio(){
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
        this.dsViaEnvios = new MatTableDataSource(this.arregloViaEnvios);

        this.dsViaEnvios.paginator = this.paginatorViaEnvios;
      },
      (error)=>{
        console.log("Lo sentimos"+error);
      }
    );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dsViaEnvios.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    if (this.dsViaEnvios.paginator) {
      this.dsViaEnvios.paginator.firstPage();
    }
  }


  ngOnInit() {
    this.listarEnvios();
    this.listarVentas();
    this.listarMediosEnviosSelect();
    this.listarMediosEnvios();
  }

}
