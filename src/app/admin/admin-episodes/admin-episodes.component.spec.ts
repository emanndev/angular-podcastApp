import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEpisodesComponent } from './admin-episodes.component';

describe('AdminEpisodesComponent', () => {
  let component: AdminEpisodesComponent;
  let fixture: ComponentFixture<AdminEpisodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEpisodesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
