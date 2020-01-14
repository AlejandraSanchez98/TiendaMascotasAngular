import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class LoginjwtService {
  public usuarioRegistrarSalida:string;
  public accion:string="";
  public usuario:number = 0;


  public api = 'http://localhost:3000/login/verificarUsuario'; //origen de donde se consumira la api
  constructor(private http:HttpClient,private router:Router,public API:ApiService) { }
  public login(usuario: string, contrasenia: string) {
    this.http.post(this.api, {nombreUsuario: usuario, passwordUsuario:contrasenia})
    .subscribe((resp:any) => {
      if(resp.estatus > 0){
        window.localStorage.setItem("nombreUsuario",usuario.toLowerCase());//almacenamos variables en LS
        localStorage.setItem('token',resp.respuesta);
        setTimeout(() => {
          this.router.navigate(['/carrito']);
        },3000);
      }
      else
      {
        alert("Usuario Incorrecto");
      }
    });
  }

  public verificarAcceso(){
    let rolUsuario: string="";
    rolUsuario = localStorage.getItem('tipoUsuario')
    if (rolUsuario != 'gerente') {
      document.getElementById('idmenu').style.display = "none";
      document.getElementById('logo').style.display = "block";
    }
  }

  public mostrarPorNombreUsuario(){
    this.API.listarUsuariosPornombre(localStorage.getItem("nombreUsuario")).subscribe(
      (success:any)=>{
          this.usuarioRegistrarSalida=success.respuesta[0].tipoUsuario;
          this.usuario=success.respuesta[0].idUsuario;
      },
      (error)=>{
        console.log("algo ocurrio: ",error)
      }
    );
  }

  agregarAccesoSalida(){
    this.accion="Salida del sistema";
    this.API.agregarAcceso(this.accion,this.usuario).subscribe(
      (success:any)=>{
          console.log("exito: ",JSON.stringify(success.respuesta));
      },
      (error)=>{
          alert("algo anda mal | "+ JSON.stringify(error));
      }
    );
  }

}
