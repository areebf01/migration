import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChineseWallComponent } from './chinese-wall.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ChineseWallComponent', () => {
  let component: ChineseWallComponent;
  let fixture: ComponentFixture<ChineseWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChineseWallComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => 'entity-user-mapping'
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChineseWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
