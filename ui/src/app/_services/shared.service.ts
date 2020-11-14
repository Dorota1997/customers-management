import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  tableCols: string[] = [
    'name',
    'surname',
    'birthDate',
    'industry',
    'subcategory',
    'phoneNumber',
    'email',
    'options',
  ];

  tableColumns: string[] = [
    'imię',
    'nazwisko',
    'data urodzenia',
    'branża',
    'podkategoria',
    'numer telefonu',
    'adres e-mail',
    'opcje',
  ];

  setMaxDate() {
    const today = new Date();
    let dayDate = today.getDate().toString();
    let monthDate = (today.getMonth() + 1).toString();
    const year = today.getFullYear();
    const maxYear = year - 18;
    if (today.getDate() < 10) dayDate = `0${dayDate}`;
    if (today.getMonth() + 1 < 10) monthDate = `0${monthDate}`;
    return `${maxYear}-${monthDate}-${dayDate}`;
  }

  public checkError = (data: FormGroup, controlName: string, errorName: string) => {
    return data.controls[controlName].hasError(errorName);
  };
}
