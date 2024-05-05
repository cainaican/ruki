import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { useGeographic } from 'ol/proj';
import { IWork, Work } from 'src/app/models/work';
import { WorkRegisterService } from 'src/app/services/work-register.service';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import { Message, MessageService } from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {

    subscription!: Subscription;

    private _works: Work[];
    private _vectorPoints: VectorLayer<any>[];
    private _map: Map;

    constructor(
      private _workRegisterService: WorkRegisterService, 
      public layoutService: LayoutService,
      public messageService: MessageService,

    ) {
    }

    ngOnInit() {
      this._workRegisterService.getObjects()
      .then((ответСервера: IWork[]) => {
        this._works = ответСервера.map((w) => new Work(w));
        this._vectorPoints = this._works.map(w => w.getVectorPoint());
        this.initiateMap();
      })
      .catch((e) => {
        const message: Message = {
          detail: e.message
        }
        this.messageService.add(message);
      })
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
