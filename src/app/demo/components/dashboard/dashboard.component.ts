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
import Select, { SelectEvent } from 'ol/interaction/Select.js';
import {click} from 'ol/events/condition.js';
import { Style } from 'ol/style';
@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {


  visible: boolean = false;
  visibleWork: IWork = null;
  selectClick: Select;

  private _works: Work[];
  private _vectorPoints: VectorLayer<any>[];
  private _map: Map;

  subs: Subscription[] = [];

  constructor(
    private _worksService: WorksService, 
    public layoutService: LayoutService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    const sub = this._worksService.getAllWorks().subscribe({
      next: (ответСервера: IWork[]) => {
        this._works = ответСервера.map((w) => new Work(w));
        this._vectorPoints = this._works.map(w => w.getVectorPoint()).filter(w => !!w);
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

      this.selectClick = new Select({
        condition: click,
        style: new Style({

        })
      });
      
      this._map.addInteraction(this.selectClick);

      this._map.on('pointermove', (e) => {
        var pixel = this._map.getEventPixel(e.originalEvent);
        var hit = this._map.hasFeatureAtPixel(pixel);
        this._map.getViewport().style.cursor = hit ? 'pointer' : '';
      });


      this.selectClick.on('select', (e: SelectEvent ) => {
        const sel = e.selected[0];
        this.visible = true;
        this.visibleWork = this._works.find(w => w.getDomainModel().id === (sel.getProperties() as any).workId).getDomainModel();
      });
    })
  }

  onHide() {
    this.visibleWork = null;
    this.selectClick.getFeatures().clear();
  }

  getPhoneNumber(event, visibleWork) {
    event.stopPropagation();
    alert(`
      Имя: ${visibleWork.contact}
      Телефон: ${visibleWork.phone}
    `);
  }

}
