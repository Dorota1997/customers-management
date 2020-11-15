import { SharedService } from 'src/app/_services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../../_services/customer.service';
import { Customer } from '../../_models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  customerData: Customer;
  forms = false;
  panelOpenState = false;
  optionNum: number;
  tableData: MatTableDataSource<Customer>;
  tableCols: string[];
  tableColumns: string[];
  customer: Customer;

  constructor(private customerService: CustomerService, private sharedService: SharedService) {}

  ngOnInit() {
    this.customers();
    this.tableCols = this.sharedService.tableCols;
    this.tableColumns = this.sharedService.tableColumns;

    this.sharedService.customer.subscribe((res: Customer) => {
      this.customer = res;
    });

    this.sharedService.isUpdated.subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        const newData = this.tableData.data;
        const customerToChange = newData.find((c) => c.id === this.customer.id);
        customerToChange.name = this.customer.name;
        customerToChange.surname = this.customer.surname;
        customerToChange.birthDate = this.customer.birthDate;
        customerToChange.industry = this.customer.industry;
        customerToChange.subcategory = this.customer.subcategory;
        customerToChange.phoneNumber = this.customer.phoneNumber;
        customerToChange.email = this.customer.email;
        newData.push(customerToChange);
      }
    });
  }

  customers() {
    this.customerService.customers().subscribe((customers: Customer[]) => {
      this.tableData = new MatTableDataSource(customers);
      this.tableData.sort = this.sort;
      this.tableData.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  showFormCard(number: number) {
    this.optionNum = number;
    this.customerData = undefined;
    setTimeout(() => {
      this.forms = true;
    }, 200);
  }

  displayForms(event) {
    this.forms = event;
  }

  showRowData(row) {
    this.customerData = row;
  }

  sortCustomersBy(event) {
    if (event !== 'options') {
      const table = [...this.tableData.data];
      let firstDate;
      let secondDate;
      table.sort((firstObj, secondObj) => {
        if (event === 'birthDate') {
          firstDate = new Date(firstObj[event]);
          secondDate = new Date(secondObj[event]);
          return firstDate < secondDate ? -1 : 1;
        }
        firstDate = firstObj[event];
        secondDate = secondObj[event];
        return firstDate.localeCompare(secondDate);
      });
      this.tableData.data = table;
    }
  }

  isPhone(name: string) {
    return name === 'phoneNumber';
  }

  isOption(name: string) {
    return name === 'options';
  }
}
