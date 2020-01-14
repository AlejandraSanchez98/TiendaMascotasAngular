import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { LoginjwtService } from '../loginjwt.service';
import { sha256, sha224 } from 'js-sha256';
import {ApiService} from '../api.service'
import { OverlayService } from '../overlay.service';
import { TemplateProgressSpinnerComponent } from '../template-progress-spinner/template-progress-spinner.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  public nombreUsuario: FormControl;
  public password:FormControl;
  public formValid:boolean;
  public rolUsuario: string="";
  public accion:string="";
  public usuario:number = 0;

  constructor(public router:Router, private jwt: LoginjwtService,public API: ApiService ) {

    this.nombreUsuario=new FormControl("",Validators.required);
    this.password=new FormControl("",Validators.required);
    this.formValid=false;
    localStorage.clear();
  }

  validarFormulario(){
    if(this.nombreUsuario.valid && this.password.valid)
    {
      this.formValid=true;
    }
    else{
      this.formValid=false;
    }
  }

  public login(){
    this.displayProgressSpinner = true;
    setTimeout(() => {
      this.displayProgressSpinner = false;
    },3000);
    var constrasenaEncriptada = sha256(this.password.value)
    console.log("variable de usuario: ",this.nombreUsuario)
    this.jwt.login(this.nombreUsuario.value, constrasenaEncriptada);
    setTimeout(() => {
      this.mostrarPorNombreUsuario();
    },1000);
    setTimeout(() => {
      window.localStorage.setItem("tipoUsuario",this.rolUsuario.toLowerCase());
      this.agregarAccesoEntrada();

    },3000);
  };


  public mostrarPorNombreUsuario(){
    this.API.listarUsuariosPornombre(localStorage.getItem("nombreUsuario")).subscribe(
      (success:any)=>{
          console.log("success de listar por usuario: ",success);
          this.rolUsuario=success.respuesta[0].tipoUsuario;
          this.usuario=success.respuesta[0].idUsuario;
      },
      (error)=>{
        console.log("algo ocurrio: ",error)
      }
    );
  }

  agregarAccesoEntrada(){
    this.accion="Entro al sistema";
    this.API.agregarAcceso(this.accion,this.usuario).subscribe(
      (success:any)=>{
          console.log("exito: ",JSON.stringify(success.respuesta));
      },
      (error)=>{
          alert("algo anda mal | "+ JSON.stringify(error));
      }
    );
  }

  ngOnInit() {
  }
}
