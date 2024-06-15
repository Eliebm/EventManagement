import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categories, Images } from '../../../Models/staticData.Models';
import { EventGroup } from '../../../Models/eventGroup.Models';

@Component({
  selector: 'app-group-form-field',
  templateUrl: './group-form-field.component.html',
  styleUrl: './group-form-field.component.scss',
})
export class GroupFormFieldComponent implements OnInit {
  @Input() groupData: EventGroup[] = [];
  @Output() submitForm = new EventEmitter<any>();

  title: string = '';
  description: string = '';
  imagesList: any = Images;
  SelectedImage: string = 'undefined';
  SelectedCategory: string = 'undefined';

  categoriesList!: Categories[];

  ngOnInit(): void {
    let categories: Categories[] = [...Object.values(Categories)];
    this.categoriesList = categories.slice(1, 100);
    this.setEditData();
  }

  setEditData(): void {
    if (this.groupData.length) {
      this.title = this.groupData[0].title;
      this.description = this.groupData[0].description;
      this.SelectedCategory = this.groupData[0].category;
      this.SelectedImage = this.groupData[0].image;
    }
  }

  sendFormData(): void {
    let data = {
      title: this.title,
      description: this.description,
      cat: this.SelectedCategory,
      img: this.SelectedImage,
      admin: '',
    };
    this.submitForm.emit(data);
  }
  cancel(): void {
    this.title = '';
    this.description = '';
    this.SelectedCategory = 'undefined';
    this.SelectedImage = 'undefined';
  }
}
