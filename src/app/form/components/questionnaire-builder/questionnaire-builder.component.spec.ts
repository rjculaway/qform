import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireBuilderComponent } from './questionnaire-builder.component';

describe('QuestionnaireBuilderComponent', () => {
  let component: QuestionnaireBuilderComponent;
  let fixture: ComponentFixture<QuestionnaireBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
