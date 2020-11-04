import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'customers-managment';
  boolea;

  ngOnInit() {
    const x = 2;
    this.boolea === 3;
    if (this.boolea == 15) {
      console.log('kapp');
    }
    for (let x = 0; x > 2; x++) {
      this.boolea = true;
    }
  }

  ffafa() {}
}
