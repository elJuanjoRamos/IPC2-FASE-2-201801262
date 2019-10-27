import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../../../services/actividad.service';
import { TipoEvaluacionService } from '../../../../services/tipoEvaluacion.service';

@Component({
  selector: 'app-misactividades',
  templateUrl: './misactividades.component.html'
})
export class MisActividadesComponent implements OnInit {
  misActiv:any;
  misEvs:any;
  constructor(private service: ActividadService, private tipoService: TipoEvaluacionService) { 
    this.service.getMyActiv(localStorage.getItem('id')).subscribe(data =>{
      this.misActiv = data;
    });
    this.tipoService.getAllMisEvaluaciones(localStorage.getItem('id')).subscribe(data => {
      this.misEvs = data[0];
      console.log(data);
    });
   }

  ngOnInit() {
  }

}
