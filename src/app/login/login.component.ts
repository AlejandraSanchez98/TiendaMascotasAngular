import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { LoginjwtService } from '../loginjwt.service';
import { sha256, sha224 } from 'js-sha256';

export interface Rol {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public nombreUsuario: FormControl;
  public password:FormControl;
  public formValid:boolean;


  roles: Rol[] = [
    {value: 'gerente', viewValue: ' Gerente'},
    {value: 'vendedor', viewValue: ' Vendedor'}
  ];

  constructor(public router:Router, private jwt: LoginjwtService) {
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
  }

  ngOnInit() {

  }
}
