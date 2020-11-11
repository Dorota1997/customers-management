import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/_models/customer.model';
import { Industry } from '../../_models/industry.model';
import { IndustryService } from '../../_services/industry.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input('rowData') customerData: Customer;
  @Input('optionNum') optNum: number;
  @Output() showForms = new EventEmitter();
  industries: Industry[] = [];
  subcategories: string[] = [];
  maxDate;
  formGroup: FormGroup;

  constructor(
    private industryService: IndustryService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.customerData?.name ?? '', [Validators.required]),
      surname: new FormControl(this.customerData?.surname ?? '', [Validators.required]),
      birthDate: new FormControl(this.customerData?.birthDate.replace(/./g, '-') ?? '', [
        Validators.required,
      ]),
      industry: new FormControl(this.customerData?.industry ?? '', [Validators.required]),
      subcategory: new FormControl(this.customerData?.subcategory ?? '', [Validators.required]),
      phoneNumber: new FormControl(this.customerData?.phoneNumber ?? '', [Validators.required]),
      email: new FormControl(this.customerData?.email ?? '', [Validators.required]),
    });

    this.allIndustries();
  }

  hideForm() {
    this.showForms.emit(false);
  }

  allIndustries() {
    this.industryService.industries().subscribe((res: Industry[]) => {
      this.industries = res;
      this.findSubcategories(this.customerData?.industry);
    });
  }

  isVisibility() {
    return this.optNum === 0;
  }

  onChange(event) {
    this.findSubcategories(event);
  }

  public checkError = (data: FormGroup, controlName: string, errorName: string) => {
    return data.controls[controlName].hasError(errorName);
  };

  findSubcategories(value) {
    this.subcategories = this.industries.find((industry) => industry.name === value)?.subcategories;
  }
}
