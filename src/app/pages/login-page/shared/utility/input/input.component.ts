import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() parentFormGroup: FormGroup = new FormGroup({});

  @Input() myFormControlName: string = '';
  isFocus = false;
  @Input() label = '';
  @Input() matIconName = '';
  @Input() placeHolder = ';';
  @Input() type = '';
  @Input() inputId = '';
  @Input() inputClassList = '';
  @Input() labelClassList = '';
  @Input() isRequired: string = 'false';

  formControl!: AbstractControl;
  constructor() {}
  ngOnInit(): void {
    if (this.myFormControlName != '') {
      this.formControl = this.parentFormGroup.get(this.myFormControlName)!;
    }
  }

  setFocus(elementInfo: any) {
    if (elementInfo.isFocus == true) {
      this.isFocus = true;
    } else {
      this.isFocus = false;
    }
  }
  log(data: any) {
    console.log(data);
  }
}
