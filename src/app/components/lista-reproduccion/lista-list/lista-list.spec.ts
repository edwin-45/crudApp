import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaList } from './lista-list';

describe('ListaList', () => {
  let component: ListaList;
  let fixture: ComponentFixture<ListaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
