import { Component } from '@angular/core';
import { IServerResponse } from '../../api/product';
import { WorksService } from '../../service/works.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: []
})
export class ListComponent {
  products!: IServerResponse[];

  constructor(private productService: WorksService) {}

  ngOnInit() {
    this.productService.getWorks().then((data) => (this.products = data));
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
