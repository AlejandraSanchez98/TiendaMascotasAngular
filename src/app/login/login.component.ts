import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { LoginjwtService } from '../loginjwt.service';
import { sha256, sha224 } from 'js-sha256';
import {ApiService} from '../api.service';
import {IUsuarios} from '../api.service';

import { OverlayService } from '../overlay.service';
import { TemplateProgressSpinnerComponent } from '../template-progress-spinner/template-progress-spinner.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public idUsuario:IUsuarios[];
  public nombreUsuario: FormControl;
  public password:FormControl;
  public formValid:boolean;

  constructor(public router:Router, private jwt: LoginjwtService,public API: ApiService ) {
    //Declarar los FormControl con el nombre que se asignó en el archivo html, "" nos indica el valor inicial del input y se le asigna la validación a cada uno de los input en este caso que sea requerido
    this.nombreUsuario=new FormControl("",Validators.required);   //Nos permite habilitar o deshabilitar el botón dependiendo del estado de los FormControls
    this.password=new FormControl("",Validators.required);
    this.formValid=false;
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
  public login() {
    var constrasenaEncriptada = sha256(this.password.value)//Encriptacion de constraña sha256
    this.jwt.login(this.nombreUsuario.value, constrasenaEncriptada);//invocando metodo con la peticon del login, proveniente del servicio
    this.jwt.agregarAcceso();
  }




  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  // Display progress spinner for 3 secs on click of button
  showProgressSpinner = () => {
    this.displayProgressSpinner = true;
    setTimeout(() => {
      this.displayProgressSpinner = false;
    }, 3000);
  };
  


  ngOnInit() {
    this.jwt.mostrarPorNombreUsuario();
  }
}
