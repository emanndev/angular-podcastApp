import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlaylistsComponent } from './admin-playlists.component';

describe('AdminPlaylistsComponent', () => {
  let component: AdminPlaylistsComponent;
  let fixture: ComponentFixture<AdminPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPlaylistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
