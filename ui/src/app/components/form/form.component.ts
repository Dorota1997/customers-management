import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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
export class FormComponent implements OnInit, OnChanges {
  @Input() rowData: Customer;
  @Input() optionNum: number;
  @Output() showForms = new EventEmitter();
  industries: Industry[] = [];
  subcategories: string[] = [];
  maxDate: string;
  formGroup: FormGroup;

  constructor(
    private industryService: IndustryService,
    private sharedService: SharedService,
    private customerService: CustomerService,
  ) {}

  ngOnChanges() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.rowData?.name ?? '', [Validators.required]),
      surname: new FormControl(this.rowData?.surname ?? '', [Validators.required]),
      birthDate: new FormControl(this.rowData?.birthDate.replace(/\./g, '-') ?? '', [
        Validators.required,
      ]),
      industry: new FormControl(this.rowData?.industry ?? '', [Validators.required]),
      subcategory: new FormControl(this.rowData?.subcategory ?? '', [Validators.required]),
      phoneNumber: new FormControl(this.rowData?.phoneNumber ?? '', [Validators.required]),
      email: new FormControl(this.rowData?.email ?? '', [Validators.required]),
    });
  }

  ngOnInit() {
    this.maxDate = this.sharedService.setMaxDate();
    this.allIndustries();
  }

  hideForm() {
    this.showForms.emit(false);
  }

  allIndustries() {
    this.industryService.industries().subscribe((res: Industry[]) => {
      this.industries = res;
      this.findSubcategories(this.rowData?.industry);
    });
  }

  isVisibility() {
    return this.optionNum === 0;
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
      id: 0,
      name: this.formGroup.get('name').value,
      surname: this.formGroup.get('surname').value,
      birthDate: this.formGroup.get('birthDate').value.replace(/-/g, '.'),
      industry: this.formGroup.get('industry').value,
      subcategory: this.formGroup.get('subcategory').value,
      phoneNumber: this.formGroup.get('phoneNumber').value,
      email: this.formGroup.get('email').value,
    };

    switch (this.optionNum) {
      case 0:
        this.customerService.create(customer).subscribe((res: Customer) => {
          this.sharedService.customer.next(res);
        });
        break;
      case 1:
        customer.id = this.rowData.id;
        this.customerService.update(customer).subscribe((res: Customer) => {
          this.sharedService.customer.next(res);
          this.sharedService.isUpdated.next(true);
        });
        break;
      default:
        break;
    }
  }
}
