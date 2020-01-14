import { Injectable } from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginjwtService {
  public usuarioRegistrarSalida:string;
  public accion:string="";
  public usuario:number = 0;
  public headers= new HttpHeaders();


  public api = 'http://localhost:3000/login/verificarUsuario'; //origen de donde se consumira la api
  constructor(private http:HttpClient,private router:Router) { }
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
    let nombreUsuario=localStorage.getItem("nombreUsuario");
    this.http.post('http://localhost:3000/usuarios/listarUsuariosPornombre/',{nombreUsuario},{headers:this.headers}).subscribe(
      (success:any)=>{
          this.usuario=success.respuesta[0].idUsuario;
      },
      (error)=>{
        console.log("algo ocurrio: ",error)
      }
    );
  }

  agregarAccesoSalida(){
    let accion="Salida del sistema";
    let idUsuario = this.usuario; //esta variable global contiene el id
    this.http.post('http://localhost:3000/accesos/agregarAcceso',{accion,idUsuario},{headers:this.headers}).subscribe(
      (success:any)=>{
          console.log("exito: ",JSON.stringify(success.respuesta));
      },
      (error)=>{
          alert("algo anda mal | "+ JSON.stringify(error));
      }
    );
  }

  agregarAccesoEntrada(){
    let accion="Entro al sistema";
    let idUsuario = this.usuario;

    console.log("esto contiene id usuario: ",idUsuario);
    this.http.post('http://localhost:3000/accesos/agregarAcceso',{accion,idUsuario},{headers:this.headers}).subscribe(
      (success:any)=>{
          console.log("exito: ",JSON.stringify(success.respuesta));
      },
      (error)=>{
          alert("algo anda mal | "+ JSON.stringify(error));
      }
    );
  }


}
