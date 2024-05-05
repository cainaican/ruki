import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { IWork } from "../models/work";
import { HttpClient } from "@angular/common/http";
import { IServerResponse } from "../demo/api/product";

@Injectable()
export class WorkRegisterService {
	// public getObjects(): Observable<IWork[]> {
	// 	return of([{
	// 		location: [55.9678, 54.7431],
	// 		address: "Менделеева 128",
	// 		contact: "Мусин Д.И.",
	// 		phone: "89996228031",
	// 		description: "Описание работы",
	// 		price: 4000,
	// 	}])
	// }
    constructor(private http: HttpClient) { }

	public getObjects(): Promise<IServerResponse[]> {
        return this.http.get<any>('assets/demo/data/works.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }
}