import { Observable, of } from "rxjs";
import { WorkRegisterService } from "../services/work-register.service";
import { inject } from "@angular/core";
import { Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { style } from "@angular/animations";
import { Point } from "ol/geom";
// import GeoJSON from 'ol/format/GeoJSON';
// import Style from "ol/style/Style";
import {
	Circle as CircleStyle,
	Fill,
	Stroke,
	Style,
	Text,
  } from 'ol/style';
export interface IWork {
	location?: [number, number];
	address?: string;
	contact: string;
	phone: string;
	description?: string;
	price: number;
}

export class Work {
	_vectorPoint: VectorLayer<any>;
	constructor(private _domainModel: IWork){
		this._vectorPoint = new VectorLayer({
			source: new VectorSource({
				features: [new Feature({
					geometry: new Point([55.9678, 54.7431]),
					
				})],
				// format: new GeoJSON(),
			}),
			style: new Style({
				image: new CircleStyle({
				  radius: 5,
				  fill: new Fill({color: 'rgba(255, 0, 0, 0.1)'}),
				  stroke: new Stroke({color: 'red', width: 1}),
				}),
				text: new Text({
				  font: '13px Calibri,sans-serif',
				  textAlign: "center",
				  textBaseline: "middle",
				  justify: "center",
				  text: "2000 р",
				  fill: new Fill({
					color: "#000",
				  }),
				  backgroundFill: new Fill({
					color: [168, 50, 153, 0.6],
				  }),
				  padding: [2, 2, 2, 2],
				}),
			  })
		});
	}

	getVectorPoint() {
		return this._vectorPoint;
	}
}