import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { HeroessService } from '../../services/heroess.service';
import { HeroeModel } from '../../Models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;
  constructor( private serv: HeroessService) { }

  ngOnInit() {
    this.cargando = true;

    this.serv.getHeroe().subscribe(data => {
      this.heroes = data;
      this.cargando = false;
      console.log(this.heroes);
    });
  }

 deleteHeroe( heroe: HeroeModel, i: number ) {

   Swal.fire({
     icon: 'question',
     title: 'Seguro?',
     text: `Estas seguro que deseas eliminar a ${heroe.name}`,
     showConfirmButton: true,
     showCancelButton: true
   }).then(resp => {
  if ( resp.value ) {
    this.cargando = true;
    Swal.fire({
      icon: 'error',
      title: 'Eliminando',
      text: 'Eliminando',
      footer: `<a Eliminando a ${heroe.name}</a>`,
      showConfirmButton: false,
      timer: 1500
    });
    this.heroes.splice(i, 1);
    this.serv.deleteHeroe(heroe.id, i).subscribe(data => {
      console.log(data);
      this.cargando = false;

    });
  }
});
}
}
