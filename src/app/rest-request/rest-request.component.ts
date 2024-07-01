import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestRequestServiceService } from '../Service/rest-request-service.service';
import { Subject, Subscription, subscribeOn } from 'rxjs';
import { DataObject } from '../Models/data-object';

@Component({
  selector: 'app-rest-request',
  templateUrl: './rest-request.component.html',
  styleUrl: './rest-request.component.scss',
})
export class RestRequestComponent implements OnInit, OnDestroy {
  dataObject!: DataObject[];
  constantDataObject!: DataObject[];
  searchString: string = ' ';
  searchSubject!: Subject<string>;
  private subscription!: Subscription;

  constructor(private _ApiRequestService: RestRequestServiceService) {
    this.searchSubject = new Subject<string>();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getRequestObject();

    this.searchSubject.subscribe((search) => {
      this.dataObject = this.dataObject.filter((x) =>
        x.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  getRequestObject(): void {
    this.subscription.add(
      this._ApiRequestService.getDataObject().subscribe((response) => {
        this.dataObject = response;
        this.constantDataObject = response;
      })
    );
  }

  searchFunction(): void {
    if (this.searchString === '') {
      this.dataObject = this.constantDataObject;
    } else {
      this.searchSubject.next(this.searchString);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
