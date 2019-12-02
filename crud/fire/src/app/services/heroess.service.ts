import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../Models/heroe.model';
import { map, delay } from 'rxjs/operators';
import { Key } from 'protractor';



@Injectable({
  providedIn: 'root'
})
export class HeroessService {

  // api de fire donde guardo los heroes
  url = 'https://crud-5fcc3.firebaseio.com';


  constructor( private http: HttpClient) { }



crearHeroe(heroe: HeroeModel) {
return this.http.post(`${this.url}/heroes.json`, heroe )
       .pipe(map((resp: any) => {
              heroe.id = resp.name;
              console.log(heroe);
       }));
}

  actualizarHeroe(heroe: HeroeModel) {

    // con esto le pasams el heroe model completo y eliminamos el id del heroe id para que no lo guarde dos veces
    const heroeTemporal = {
...heroe
    };
    // aqui eliminamos el id del heroe qu estamos actualizando
    delete heroeTemporal.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemporal);
 }


getHeroe() {
  // llamo la funcion crearArreglo y de una vez se le pasa la rep sola a la funcion
  return this.http.get(`${this.url}/heroes.json`).pipe(map( this.CrearArreglo ), delay(1000));

    // (resp => this.CrearArreglo(resp), delay(6000)));
}


// metodo para transformar el valor del id en un arreglo
CrearArreglo(heroeObj: object) {

const heroes: HeroeModel[] = [];
// por si no tenemos nada en la base de datos retorne un array vacio
if (heroeObj == null) {
  return [];
}
Object.keys( heroeObj ).forEach( data => {

  const heroe: HeroeModel = heroeObj[data];
  heroe.id = data;
  heroes.push(heroe);
  console.log(heroes);

});
return heroes;
}


getHeroeId( id: string) {
  return this.http.get(`${this.url}/heroes/${id}.json`);
}

deleteHeroe( id: any, i: number ) {
  return this.http.delete(`${this.url}/heroes/${id}.json`);

}





}
