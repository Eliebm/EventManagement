import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  EventTypeList,
  Images,
  locationList,
} from '../../Models/staticData.Models';
import { EventClass } from '../../Models/event.Models';

@Component({
  selector: 'app-create-event-form',
  templateUrl: './create-event-form.component.html',
  styleUrl: './create-event-form.component.scss',
})
export class CreateEventFormComponent implements OnInit, OnChanges {
  @Input() editData: EventClass[] = [];
  @Output() submitForm = new EventEmitter<any>();

  title: string = '';
  description: string = '';
  imagesList: any = Images;
  SelectedImage: string = 'undefined';

  typeList: any = EventTypeList;
  SelectedEventType: string = 'undefined';
  selectedTime: any;
  selectedDate: Date = new Date();
  locationList: any = locationList;
  selectedLocation: string = 'undefined';
  presentationType: any = 'undefined';

  ngOnInit(): void {
    let location: locationList[] = [...Object.values(locationList)];
    this.locationList = location;
    this.setEditData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setEditData();
  }

  setEditData(): void {
    if (this.editData?.length) {
      this.title = this.editData[0].title;
      this.description = this.editData[0].description;
      this.SelectedEventType = this.editData[0].type;
      this.SelectedImage = this.editData[0].image;
      this.selectedLocation = this.editData[0].location;
      this.selectedDate = new Date(this.editData[0].startDate);
      this.selectedTime = this.editData[0].startTime;
      this.presentationType = this.editData[0].presentationType;
    }
  }

  sendFormData(): void {
    let data = {
      title: this.title,
      description: this.description,
      admin: '',
      eventType: this.SelectedEventType,
      startDate: this.selectedDate,
      startTime: this.selectedTime,
      img: this.SelectedImage,
      location: this.selectedLocation,
      presentation: this.presentationType,
    };
    this.submitForm.emit(data);
  }

  cancel(): void {
    this.title = '';
    this.description = '';
    this.SelectedEventType = 'undefined';
    this.SelectedImage = 'undefined';
    this.selectedDate = new Date();
    this.selectedLocation = 'undefined';
    this.presentationType = 'undefined';
  }

  passSelectedTime(data: any): void {
    this.selectedTime = data;
  }
}
