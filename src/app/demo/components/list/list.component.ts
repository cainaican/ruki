import { Component, OnDestroy, OnInit } from '@angular/core';
import { IServerResponse } from '../../api/product';
import { WorksService } from '../../service/works.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IWork, Work } from 'src/app/models/work';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: []
})
export class ListComponent implements OnInit, OnDestroy {
  works: IWork[] = [];
  subs: Subscription[] = [];

  constructor(private worksService: WorksService, private messageService: MessageService) {}

  ngOnInit() {
    const sub = this.worksService.getWorks().subscribe({
      next: (value) => {
        this.works = value;
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
