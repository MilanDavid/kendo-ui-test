import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateroriesDetailsComponent } from './caterories-details.component';

describe('CateroriesDetailsComponent', () => {
  let component: CateroriesDetailsComponent;
  let fixture: ComponentFixture<CateroriesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateroriesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateroriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
