import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionItem } from './cancion-item';

describe('CancionItem', () => {
  let component: CancionItem;
  let fixture: ComponentFixture<CancionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancionItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancionItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
