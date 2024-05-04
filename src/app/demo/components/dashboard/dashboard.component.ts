import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { useGeographic } from 'ol/proj';
import { Work } from 'src/app/models/work';
import { WorkRegisterService } from 'src/app/services/work-register.service';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {

    subscription!: Subscription;

    private _model: Work;
    private _map: Map;

    constructor(private _workRegisterService: WorkRegisterService, public layoutService: LayoutService) {
      this.initiateMap();
    }

    ngOnInit() {
      this._workRegisterService.getObjects().subscribe({
        next: (v) => {
          this._model = new Work(v[0]);
        }
      })
      // this.layoutService.createMap.subscribe({
      //   next: () => {
      //     // this.initiateMap();
      //   },
      //   error: (e) => {
      //     console.log(e)
      //   }
      // })
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public getModelsFromServer() {
      
    }

    public initiateMap() {
      this._map = null;
      setTimeout(() => {
        useGeographic();
        this.layoutService.initializeMapWidth();
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
              minZoom: 10
            }),
          });
      })
    }
}
