import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServerResponse } from '../api/product';
import { IWork } from 'src/app/models/work';

@Injectable()
export class WorksService {

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }

    getWorks() {
        return this.http.get<any>('assets/demo/data/works.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }

    saveWork(work: IWork) {
        console.log(work);
        // return this.http.post<any>('assets/demo/data/works.json', {})
        //     .toPromise()
        //     .then(res => res.data as IServerResponse[])
        //     .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }
}
