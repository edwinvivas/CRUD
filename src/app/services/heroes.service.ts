import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { HeroesComponent } from '../pages/heroes/heroes.component';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesbd-3ff74.firebaseio.com';

  constructor( private http: HttpClient ) { }

crearHeroe  ( heroe: HeroeModel ){

return this.http.post(`${ this.url}/heroes.json`, heroe)
    .pipe (
      map( (resp: any) => {
heroe.id = resp.name;
return heroe;
      })


    );

}

actualizarHeroe( heroe: HeroeModel ){
const heroeTemp = {
  ...heroe
};

delete heroeTemp.id;

return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
}

borrarHeroe( id: string) {
return this.http.delete(`${ this.url }/heroes/${ id }.json`);

}

getHeroe( id: string ){
return this.http.get(`${ this.url }/heroes/${ id }.json`);

}


getHeroes(){
  return this.http.get(`${ this.url}/heroes.json`)
.pipe(
  map(  this.crearArreglo ),
  delay(1500)
);

}

private crearArreglo ( heroesObj: object){

const heroes: HeroeModel[] = [];
/* console.log(heroesObj); */

Object.keys( heroesObj ).forEach ( key => {

const heroe: HeroeModel = heroesObj [key];
heroe.id = key;
 heroes.push( heroe );

});

if ( heroesObj === null ) { return [];}

return heroes;

}

}
