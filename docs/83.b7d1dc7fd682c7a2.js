"use strict";(self.webpackChunkruki=self.webpackChunkruki||[]).push([[83],{3083:(L,c,s)=>{s.r(c),s.d(c,{ListModule:()=>y});var a=s(6814),m=s(8589),t=s(5849),p=s(3584),u=s(5219),g=s(4237),d=s(707),x=s(4227),f=s(2795);function v(e,o){1&e&&t._UZ(0,"img",24),2&e&&t.Q6J("src",o.$implicit.itemImageSrc,t.LSH)}const h=()=>({"max-width":"640px"});function _(e,o){if(1&e){const i=t.EpF();t.ynx(0),t.TgZ(1,"p-galleria",22),t.NdJ("valueChange",function(r){t.CHM(i);const l=t.oxw().$implicit;return t.KtG(l.images=r)}),t.YNc(2,v,1,1,"ng-template",23),t.qZA(),t.BQk()}if(2&e){const i=t.oxw().$implicit,n=t.oxw(2);t.xp6(1),t.Q6J("value",i.images)("responsiveOptions",n.responsiveOptions)("containerStyle",t.DdM(6,h))("numVisible",5)("showItemNavigators",!0)("showThumbnails",!1)}}function w(e,o){1&e&&t._UZ(0,"p-skeleton",25)}const b=e=>({"border-top-1 surface-border":e});function C(e,o){if(1&e){const i=t.EpF();t.TgZ(0,"div",6)(1,"div",7)(2,"div",8),t.YNc(3,_,3,7,"ng-container",9)(4,w,1,0,"ng-template",null,10,t.W1O),t.qZA(),t.TgZ(6,"div",11)(7,"div",12)(8,"div")(9,"span",13),t._uU(10),t.qZA(),t.TgZ(11,"div",14),t._uU(12),t.qZA()(),t.TgZ(13,"div",15)(14,"div",16)(15,"span",17),t._uU(16),t.qZA()()()(),t.TgZ(17,"div",18)(18,"span",19),t._uU(19),t.qZA(),t.TgZ(20,"div",20)(21,"p-button",21),t.NdJ("click",function(){const l=t.CHM(i).$implicit,A=t.oxw(2);return t.KtG(A.getPhoneNumber(l))}),t.qZA()()()()()()}if(2&e){const i=o.$implicit,n=o.first,r=t.MAs(5);t.xp6(1),t.Q6J("ngClass",t.VKq(7,b,!n)),t.xp6(2),t.Q6J("ngIf",i.images)("ngIfElse",r),t.xp6(7),t.Oqu(i.customerName),t.xp6(2),t.Oqu(i.description),t.xp6(4),t.Oqu(i.address),t.xp6(3),t.Oqu("\u20bd"+i.price)}}function T(e,o){if(1&e&&(t.TgZ(0,"div",4),t.YNc(1,C,22,9,"div",5),t.qZA()),2&e){const i=o.$implicit;t.xp6(1),t.Q6J("ngForOf",i)}}let Z=(()=>{class e{constructor(i,n,r){this._worksService=i,this._messageService=n,this._cdr=r,this.works=[],this.subs=[],this.responsiveOptions=[{breakpoint:"1024px",numVisible:5},{breakpoint:"768px",numVisible:3},{breakpoint:"560px",numVisible:1}]}ngOnInit(){const i=this._worksService.getAllWorks().subscribe({next:n=>{this.works=n,this._cdr.markForCheck()},error:n=>{this._messageService.add({detail:n.message,severity:"error"})}});this.subs.push(i)}ngOnDestroy(){this.subs.forEach(i=>i.unsubscribe)}getPhoneNumber(i){alert(`\n      \u0418\u043c\u044f: ${i.contact}\n      \u0422\u0435\u043b\u0435\u0444\u043e\u043d: ${i.phone}\n    `)}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(p.h),t.Y36(u.ez),t.Y36(t.sBO))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-list"]],decls:4,vars:3,consts:[[1,"card"],[3,"value","rows","paginator"],["dv",""],["pTemplate","list"],[1,"grid","grid-nogutter"],["class","col-12","class","col-12",4,"ngFor","ngForOf"],[1,"col-12"],[1,"flex","flex-column","sm:flex-row","sm:align-items-center","p-4","gap-3",3,"ngClass"],[1,"md:w-10rem","relative"],[4,"ngIf","ngIfElse"],["skeletonImg",""],[1,"flex","flex-column","md:flex-row","justify-content-between","md:align-items-center","flex-1","gap-4"],[1,"flex","flex-row","md:flex-column","justify-content-between","align-items-start","gap-2"],[1,"font-medium","text-secondary","text-sm"],[1,"text-lg","font-medium","text-900","mt-2"],[1,"surface-100","p-1",2,"border-radius","30px"],[1,"surface-0","flex","align-items-center","gap-2","justify-content-center","py-1","px-2",2,"border-radius","30px","box-shadow","0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"],[1,"text-900","font-medium","text-sm"],[1,"flex","flex-column","md:align-items-end","gap-5"],[1,"text-xl","font-semibold","text-900"],[1,"flex","flex-row-reverse","md:flex-row","gap-2"],["icon","pi pi-phone","label","\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043a\u043e\u043d\u0442\u0430\u043a\u0442",1,"flex-auto","md:flex-initial","white-space-nowrap",3,"click"],[3,"value","responsiveOptions","containerStyle","numVisible","showItemNavigators","showThumbnails","valueChange"],["pTemplate","item"],[2,"width","100%",3,"src"],["width","10rem","height","6rem"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0)(1,"p-dataView",1,2),t.YNc(3,T,2,1,"ng-template",3),t.qZA()()),2&n&&(t.xp6(1),t.Q6J("value",r.works)("rows",10)("paginator",!0))},dependencies:[a.mk,a.sg,a.O5,g.VO,u.jx,d.zx,x.O,f.dz],changeDetection:0})}return e})(),O=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#i=this.\u0275inj=t.cJS({imports:[m.Bz.forChild([{path:"",component:Z}]),m.Bz]})}return e})();var k=s(6263);let y=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#i=this.\u0275inj=t.cJS({providers:[p.h],imports:[a.ez,O,g.FI,d.hJ,k.W,x.m,f.kT]})}return e})()}}]);