import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { HeroeModel } from "../../models/heroe.model";
import { NgForm } from "@angular/forms";
import { HeroesService } from "../../services/heroes.service";
import  Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: "app-heroe",
  templateUrl: "./heroe.component.html",
  styleUrls: ["./heroe.component.scss"]
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor(private HeroesService: HeroesService,
    private route:  ActivatedRoute) {}

  ngOnInit() {

const id = this.route.snapshot.paramMap.get('id');
if ( id !== 'nuevo'){

  this.HeroesService.getHeroe (id)
  .subscribe( (resp : HeroeModel) => {
    this.heroe= resp;
    this.heroe.id = id;
  });

}

  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("Formulario no válido");
      return;
    }

Swal.fire({
title: 'Espere',
text: 'Guardando Información',
type: 'info',
allowOutsideClick: false
});
Swal.showLoading();

let peticion: Observable<any>;

    if ( this.heroe.id ){
      peticion= this.HeroesService.actualizarHeroe(this.heroe);

    }else {
      peticion= this.HeroesService.crearHeroe(this.heroe);
     /*  .subscribe(resp => {
        console.log(resp);
        this.heroe = resp;
      }); */

    }

    peticion.subscribe( resp=> {
     Swal.fire( {
       title:this.heroe.nombre,
      text:'Se actualizó correctamente',
      type:'success'
     });

    });







    /* console.log(form);
console.log(this.heroe); */
  }
}
