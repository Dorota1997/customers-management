import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() stringValue = new EventEmitter();

  ngOnInit() {}

  search(filterValue: string) {
    this.stringValue.emit(filterValue);
  }
}
