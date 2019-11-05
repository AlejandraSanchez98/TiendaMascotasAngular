import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

export interface IMetodosPago {
  id: number;
  tipoPago: string;
}


@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.scss']
})
export class MetodoPagoComponent implements OnInit {
  public arregloMetodosPago:IMetodosPago[];
  public modal: NgbModalRef;

  public frmMetodosPago:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;

  displayedColumns = ['id', 'tipoPago','acciones'];
  dataSource:MatTableDataSource<IMetodosPago>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo=""
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmMetodosPago= this.formBuilder.group({
      id:[""],
      tipoPago:["",Validators.required]
    });
  }


  //Abrir modal
  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Método De Pago"
  }

  public openEditar(content, id: number, tipoPago: string){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Método De Pago";

    this.frmMetodosPago.controls['id'].setValue(id);
    this.frmMetodosPago.controls['tipoPago'].setValue(tipoPago);
  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL
  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let tipoPagoForm = this.frmMetodosPago.get('tipoPago').value;
    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Método De Pago") {

      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarMetodoPago(tipoPagoForm).subscribe(
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
    if (this.titulo == "Editar Método De Pago") {
      //OBTENEMOS LOS VALORES DEL FORMULARIO
      let id = this.frmMetodosPago.get('id').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let tipoPagoForm = this.frmMetodosPago.get('tipoPago').value;

      //EJECUTANDO PETICION PUT
      this.API.editarMetodoPago(id,tipoPagoForm).subscribe(
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

  //eliminar metodo de pago
  public eliminarMetodoPago(id:number){
    this.API.eliminarMetodoPago(id).subscribe(
      (success:any)=>{
        console.log("Exito"+success);
        location.reload();
      },
      (error)=>{
        console.log("Error"+ error);
      }
    )
  }

  //listar metodos de pago
  public  listarMetodosPago(){
    this.API.listarMetodosPago().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.arregloMetodosPago=success.respuesta;
        this.dataSource = new MatTableDataSource(this.arregloMetodosPago);

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
    this.listarMetodosPago();
  }

}
