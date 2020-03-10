import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityViewTableComponent } from './entityViewTable.component';

describe('EntityViewTableComponent', () => {
  let component: EntityViewTableComponent;
  let fixture: ComponentFixture<EntityViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityViewTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
