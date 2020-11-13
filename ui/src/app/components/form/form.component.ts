import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/_models/customer.model';
import { CustomerService } from 'src/app/_services/customer.service';
import { SharedService } from '../../_services/shared.service';
import { Industry } from '../../_models/industry.model';
import { IndustryService } from '../../_services/industry.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('rowData') customerData: Customer;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('optionNum') optNum: number;
  @Output() showForms = new EventEmitter();
  industries: Industry[] = [];
  subcategories: string[] = [];
  maxDate;
  formGroup: FormGroup;

  constructor(
    private industryService: IndustryService,
    private sharedService: SharedService,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.maxDate = this.sharedService.setMaxDate();
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

  checkError(data: FormGroup, controlName: string, errorName: string) {
    return this.sharedService.checkError(data, controlName, errorName);
  }

  findSubcategories(value) {
    this.subcategories = this.industries.find((industry) => industry.name === value)?.subcategories;
  }

  createCustomer() {
    const customer = {
      id: this.customerData.id,
      name: this.formGroup.get('name').value,
      surname: this.formGroup.get('surname').value,
      birthDate: this.formGroup.get('birthDate').value.replace(/-/g, '.'),
      industry: this.formGroup.get('industry').value,
      subcategory: this.formGroup.get('subcategory').value,
      phoneNumber: this.formGroup.get('phoneNumber').value,
      email: this.formGroup.get('email').value,
    };

    switch (this.optNum) {
      case 0:
        this.customerService.create(customer).subscribe(() => {});
        break;
      case 1:
        this.customerService.update(customer).subscribe(() => {});
        break;
      default:
        break;
    }
  }
}
