import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { WorksService } from '../../service/works.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IWork } from 'src/app/models/work';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {
  works: IWork[] = [];
  subs: Subscription[] = [];

  images: any[] | undefined;
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  constructor(
    private _worksService: WorksService, 
    private _messageService: MessageService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const sub = this._worksService.getAllWorks().subscribe({
      next: (value) => {
        this.works = value;

        this._cdr.markForCheck();

        // this.worksService.getImageLinks()
          // .then((url: string) => {
            // this.works[0].images = url;

            // this.images
          //   this.cdr.markForCheck();
          // })
          // .catch((error) => {
          //   // A full list of error codes is available at
          //   // https://firebase.google.com/docs/storage/web/handle-errors
          //   switch (error.code) {
          //       case 'storage/object-not-found':
          //           // File doesn't exist
          //           break;
          //       case 'storage/unauthorized':
          //           // User doesn't have permission to access the object
          //           break;
          //       case 'storage/canceled':
          //           // User canceled the upload
          //           break;
            
          //       // ...
        
          //   case 'storage/unknown':
          //       // Unknown error occurred, inspect the server response
          //       break;
          //   }
        // })

      },
      error: (e) => {
        this._messageService.add({detail: e.message, severity: "error"});
      }
    })
    
    
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe);
  }

  getPhoneNumber(work: IWork) {
    alert(`
      Имя: ${work.contact}
      Телефон: ${work.phone}
    `);
  }

//   getSeverity(product: IServerResponse) {
//       switch (product.inventoryStatus) {
//           case 'INSTOCK':
//               return 'success';

//           case 'LOWSTOCK':
//               return 'warning';

//           case 'OUTOFSTOCK':
//               return 'danger';

//           default:
//               return null;
//       }
//   };
}
