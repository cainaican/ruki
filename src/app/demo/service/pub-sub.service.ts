import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export enum EPubSubEvents {
	defaultUpdate
}


@Injectable()
export class PubSubService<EPubSubEvents> {

	sub = new Subject<EPubSubEvents>();

	constructor(){}

	// on() {
	// 	return this.sub;
	// }

	// trigger(event: EPubSubEvents){
	// 	this.sub.next(event);
	// }

	// off() {
	// 	this.sub.unsubscribe();
	// }



}