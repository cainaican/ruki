import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { IWork } from "../models/work";

@Injectable()
export class WorkRegisterService {
	public getObjects(): Observable<IWork[]> {
		return of([{
			location: [0, 0],
			address: "Менделеева 128",
			contact: "Мусин Д.И.",
			phone: "89996228031",
			description: "Описание работы",
			price: 4000,
		}])
	}
}