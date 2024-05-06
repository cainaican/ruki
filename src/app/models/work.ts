import { Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import {
	Circle as CircleStyle,
	Fill,
	Stroke,
	Style,
	Text,
  } from 'ol/style';
import { IServerResponse } from "../demo/api/product";

export interface IWork extends IServerResponse {
	location?: [number, number];
	address?: string;
	contact: string;
	description?: string;
	price: number;
    customerName?: string;
    phone?: string;
	userId: string;
}

export class Work {
	_vectorPoint: VectorLayer<any>;
	// _vectorPoint2: VectorLayer<any>;
	// _vectorPoints: VectorLayer<any>[];

	// products: Product[];

	constructor(private _domainModel: IWork){

		this._vectorPoint = new VectorLayer({
			source: new VectorSource({
				features: [
				new Feature({
					geometry: new Point(this._domainModel.location),
				}),
			],
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
				  text: `${this._domainModel.price} ₽`,
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