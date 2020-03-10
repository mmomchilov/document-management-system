import { ValidationComponent } from './pages/common/components/common/validation';
import { Component, OnInit, ChangeDetectorRef, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ValidationComponent implements OnInit {
  // constructor(){};
  title = 'document-management-system !!';

  ngOnInit() {

  }
}
