import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/Models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroessService } from '../../services/heroess.service';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {



 heroe: HeroeModel = new HeroeModel();

  constructor( private service: HeroessService,
               private router: ActivatedRoute) { }

  ngOnInit() {
    // aqui obtengo el id que recibo por la url
    const id = this.router.snapshot.paramMap.get('id');

    // si el id esta vacio en este caso va a dar nuevo
    if ( id !== 'nuevo') {
      this.service.getHeroeId(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
        // console.log(this.heroe);
      });
    }
  }
  guardarHeroe(f: NgForm) {

if (f.invalid ) {
     console.log(' formulario no valido ');
     return;
}
Swal.fire({
  title: 'Espere',
  text: 'Guardando informacion',
 icon: 'info',
  allowOutsideClick: false,
  timer: 1500
});
Swal.showLoading();



let peticion: Observable<any>;

// si existe el id del heroe lo vamos  a actualizar si no creamos uno nvo
if ( this.heroe.id ) {
  peticion = this.service.actualizarHeroe(this.heroe);
  } else {
peticion = this.service.crearHeroe(this.heroe);
  }

peticion.subscribe((resp: any) => {

  Swal.fire({
    title: this.heroe.name,
    icon: 'success',
    text: 'Se actualizo correctamente'
  });

});


  }






}
