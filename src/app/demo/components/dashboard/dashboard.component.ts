import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { useGeographic } from 'ol/proj';
import { IWork, Work } from 'src/app/models/work';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import { MessageService } from 'primeng/api';
import { WorksService } from '../../service/works.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {


    private _works: Work[];
    private _vectorPoints: VectorLayer<any>[];
    private _map: Map;

    subs: Subscription[] = [];

    constructor(
      private _worksService: WorksService, 
      public layoutService: LayoutService,
      public messageService: MessageService,

    ) {
    }

    ngOnInit() {

      const sub = this._worksService.getWorks().subscribe({
        next: (ответСервера: IWork[]) => {
          this._works = ответСервера.map((w) => new Work(w));
          this._vectorPoints = this._works.map(w => w.getVectorPoint());
          this.initiateMap();
        },
        error: (e) => {
          this.messageService.add({detail: e.message, severity: "error"});
        }
      })
      this.subs.push(sub);
    }

    ngOnDestroy() {
      this.subs.forEach(s => s.unsubscribe);  
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
              ...this._vectorPoints,
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
