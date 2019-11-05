import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginjwtService {
  public api = 'http://localhost:3000/login/verificarUsuario'; //origen de donde se consumira la api
  constructor(private http:HttpClient,private router:Router) { }

  public login(usuario: string, contrasenia: string) {
    this.http.post(this.api, {nombreUsuario: usuario, passwordUsuario:contrasenia})
    .subscribe((resp: any) => {
      if(resp.estatus > 0){
        window.localStorage.setItem("nombreUsuario",usuario.toLowerCase());//almacenamos variables en LS
        localStorage.setItem('token',resp.respuesta); //almacenamos el token en localstorage NOTA respuesta viene del servidor y contiene el token
        this.router.navigate(['/paginaPrincipal']);
      }
      else
      {
        alert("Usuario Incorrecto");
      }
    });

  }
//CERRAMOS SESION
  public logout() {
    localStorage.removeItem('token');
  }
}
