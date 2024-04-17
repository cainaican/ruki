import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {add, toStringXY} from 'ol/coordinate';
import { useGeographic } from 'ol/proj';
import { IWork, Work } from 'src/app/models/work';
import { WorkRegisterService } from 'src/app/services/work-register.service';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {

    // items!: MenuItem[];

    // products!: Product[];

    // chartData: any;

    // chartOptions: any;

    subscription!: Subscription;

    private _model: Work;
    private _map: Map;

    constructor(private _workRegisterService: WorkRegisterService) {
        setTimeout(() => {
            useGeographic();
            this._map = new Map({
                target: 'map',
                layers: [
                  new TileLayer({
                    source: new OSM(),
                  }),
                  this._model.getVectorPoint(),
                ],
                view: new View({
                  center: [55.9678, 54.7431],
                  zoom: 11,
                }),
              });

        })


    }

    ngOnInit() {
      this._workRegisterService.getObjects().subscribe({
        next: (v) => {
          this._model = new Work(v[0]);
        }
      })
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public getModelsFromServer() {
      
    }
}
