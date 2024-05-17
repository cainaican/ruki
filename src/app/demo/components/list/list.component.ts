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
  visible: boolean = false;
  visibleWork: IWork = null;

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

  getPhoneNumber(event: Event, work: IWork) {
    event.stopPropagation();
    alert(`
      Имя: ${work.contact}
      Телефон: ${work.phone}
    `);
  }

  openCard(event: Event, item: IWork) {
    this.visible = true;
    this.visibleWork = item;
  }

  onHide() {
    this.visibleWork = null; 
  }


}
