import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Subscription } from 'rxjs';

import { QuestionType } from '../../models/enums/question-type';
import { Option } from '../../models/interfaces/option';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'qform-questionnaire-builder',
  templateUrl: './questionnaire-builder.component.html',
  styleUrls: ['./questionnaire-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireBuilderComponent implements OnInit, OnDestroy {
  hasQuestions: boolean;
  formGroup: FormGroup;
  optionsFormArray: FormArray;

  typeOptions: Array<Option>;
  showOptions: boolean;

  private $typeChangeSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private windowRef: NbWindowRef
  ) {}

  ngOnInit(): void {
    this.initTypeOptions();
    this.initFormGroup();
  }

  ngOnDestroy(): void {
    if (this.$typeChangeSubscription) {
      this.$typeChangeSubscription.unsubscribe();
    }
  }

  save() {
    if (this.formGroup.dirty && this.formGroup.valid) {
      this.formService.saveQuestions(this.formGroup.value);
      this.windowRef.close();
    }
  }

  addOption() {
    const options = this.optionsFormArray;

    if (options) {
      options.push(this.createOptionFormControl());
    } else {
      this.initOptionsFormArray();
    }
  }

  removeOption(index: number) {
    this.optionsFormArray.removeAt(index);
  }

  private initFormGroup() {
    this.formGroup = this.formBuilder.group({
      type: [null, [Validators.required]],
      question: [null, [Validators.required]],
    });

    this.subscribeToTypeChange();
  }

  private addAllowOtherOption() {
    this.formGroup.addControl('allowOtherOption', new FormControl());
  }

  private removeAllowOtherOption() {
    this.formGroup.removeControl('allowOtherOption');
  }

  private initOptionsFormArray() {
    this.optionsFormArray = new FormArray(
      [this.createOptionFormControl()],
      [this.atLeastOneOption()]
    );

    this.formGroup.addControl('options', this.optionsFormArray);
  }

  private removeOptionsFormArray() {
    this.optionsFormArray = new FormArray([]);
    this.formGroup.removeControl('options');
  }

  private createOptionFormControl() {
    return new FormControl(null, [Validators.required]);
  }

  private subscribeToTypeChange() {
    const typeFormControl = this.formGroup.get('type');
    this.$typeChangeSubscription = typeFormControl!.valueChanges.subscribe(
      (value) => {
        this.showOptions = value === QuestionType.CheckboxList;

        if (this.showOptions) {
          this.addAllowOtherOption();
          this.addOption();
          this.changeDetectorRef.detectChanges();
        } else {
          this.removeAllowOtherOption();
          this.removeOptionsFormArray();
        }
      }
    );
  }

  private atLeastOneOption(): ValidatorFn {
    return (control: AbstractControl) => {
      const controlArray = control as FormArray;
      if (controlArray.controls.some((el) => el.value)) {
        return null;
      } else {
        return {
          atLeastOneOption: 'At least one option must be added',
        };
      }
    };
  }

  private initTypeOptions() {
    this.typeOptions = [
      {
        name: 'Paragraph',
        value: QuestionType.Paragraph,
      },
      {
        name: 'Checkbox List',
        value: QuestionType.CheckboxList,
      },
    ];
  }
}
