import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


export interface ITiposDevoluciones{
  id: number;
  tipoDevolucion: string;
  descripcion: string;
}


@Component({
  selector: 'app-tipo-devolucion',
  templateUrl: './tipo-devolucion.component.html',
  styleUrls: ['./tipo-devolucion.component.scss']
})
export class TipoDevolucionComponent implements OnInit {

  public arregloTiposDevoluciones:ITiposDevoluciones[];
  public modal: NgbModalRef;

  public frmTiposDevoluciones:FormGroup;
  public formValid:Boolean=false;
  public titulo:string;

  displayedColumns = ['id', 'tipoDevolucion', 'descripcion','acciones'];
  dataSource:MatTableDataSource<ITiposDevoluciones>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private modalService: NgbModal,public router:Router,public formBuilder: FormBuilder, public API:ApiService) {
    //Inizializacion
    this.titulo=""
    //INICIALIZACION (CONSTRUCCION) DEL FORMGROUP, SOLO SE AGREGARAN ESTOS DATOS YA QUE SON LOS ESPECIFICADOS EN EL MODAL
    this.frmTiposDevoluciones= this.formBuilder.group({
      id:[""],
      tipoDevolucion:["",Validators.required],
      descripcion:["",Validators.required]
    });
  }


  //Abrir modal
  public openAgregar(content) {
    this.modal= this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.titulo="Agregar Tipo De Devolución"
  }

  public openEditar(content, id: number, tipoDevolucion: string, descripcion:string){
    this.modal= this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'});
    this.titulo = "Editar Tipo De Devolución";

    this.frmTiposDevoluciones.controls['id'].setValue(id);
    this.frmTiposDevoluciones.controls['tipoDevolucion'].setValue(tipoDevolucion);
    this.frmTiposDevoluciones.controls['descripcion'].setValue(descripcion);
  }

  //DAR DE ALTA SEGUN LOS DATOS DEL MODAL
  public ejecutarPeticion(){
    //DATOS PROVENIENTES DEL FORMGROUP
    let tipoDevolucionForm = this.frmTiposDevoluciones.get('tipoDevolucion').value;
    let descripcionForm = this.frmTiposDevoluciones.get('descripcion').value;
    //EVITAMOS CREAR 2 MODALES, SIMPLEMENTE USAMOS 1 MODAL Y TIENE SU FUNCION SEGUN SU NOMBRE
    if (this.titulo == "Agregar Tipo De Devolución") {

      //SE AGREGAN REGISTROS MEDIANTE POST
      this.API.agregarTipoDevolucion(tipoDevolucionForm, descripcionForm).subscribe(
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
    if (this.titulo == "Editar Tipo De Devolución") {
      //OBTENEMOS LOS VALORES DEL FORMULARIO
      let id = this.frmTiposDevoluciones.get('id').value; //recuerda que el id esta oculto asi que el user no podra editarlo
      let tipoDevolucionForm = this.frmTiposDevoluciones.get('tipoDevolucion').value;
      let descripcionForm = this.frmTiposDevoluciones.get('descripcion').value;

      //EJECUTANDO PETICION PUT
      this.API.editarTipoDevolucion(id,tipoDevolucionForm,descripcionForm).subscribe(
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

  //eliminar tipo de devolución
  public eliminarTipoDevolucion(id:number){
    this.API.eliminarTipoDevolucion(id).subscribe(
      (success:any)=>{
        console.log("Exito"+success);
        location.reload();
      },
      (error)=>{
        console.log("Error"+ error);
      }
    )
  }

  //listar tipos de devoluciones
  public  listarTiposDevoluciones(){
    this.API.listarTiposDevoluciones().subscribe(
      (success:any)=>{
        console.log("Exito"+JSON.stringify(success));
        this.arregloTiposDevoluciones=success.respuesta;
        this.dataSource = new MatTableDataSource(this.arregloTiposDevoluciones);

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
    this.listarTiposDevoluciones();
  }

}
