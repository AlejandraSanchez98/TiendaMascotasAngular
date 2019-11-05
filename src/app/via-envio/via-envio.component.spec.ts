import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViaEnvioComponent } from './via-envio.component';

describe('ViaEnvioComponent', () => {
  let component: ViaEnvioComponent;
  let fixture: ComponentFixture<ViaEnvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViaEnvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViaEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
