import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDevolucionComponent } from './tipo-devolucion.component';

describe('TipoDevolucionComponent', () => {
  let component: TipoDevolucionComponent;
  let fixture: ComponentFixture<TipoDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
