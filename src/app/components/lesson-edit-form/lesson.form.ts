import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    Form,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Course, Lesson, NewCourse, NewLesson } from '../../data/Course';
import { CommonModule, Location, formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatInputModule } from '@angular/material/input';
import { AppCommonModule } from '../common/common.module';
import { AttachmentsComponent } from '../attachments.component';

@Component({
    selector: 'lesson-edit-form',
    templateUrl: './lesson.form.html',
    styles: `
        ::ng-deep .text-input-field {
            width: 30rem;
        }

        .centered-text {
            display: flex;
            align-items: center;
        }

        .button-button {
            width: 10px;
        }

        ::ng-deep .button-button > :first-child {
            border-radius: 0px !important;
            height: 1.5rem !important;
            width: 1.5rem;
            font-size: 0.5rem !important;
        }

        .container {
            display: flex;
            padding: 5px;
            margin: 5px;
            border-radius: 5px;
        }
    `,
    providers: [provideNativeDateAdapter()],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        AppCommonModule,
        AttachmentsComponent,
    ],
    standalone: true,
})
export class LessonForm implements OnChanges {
    constructor(private formBuilder: FormBuilder, private location: Location) {}

    date = 'date';
    description = 'description';

    @Input()
    initialState: Lesson | undefined;

    @Input()
    form = LessonForm.formGroup(this.formBuilder);

    static formGroup(formBuilder: FormBuilder) {
        return formBuilder.nonNullable.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            date: ['', Validators.required],

            attachments: formBuilder.array<
                ReturnType<typeof AttachmentsComponent.makeAttachmentGroup>
            >([]),
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['initialState']) {
            const initialState = changes['initialState'].currentValue as Lesson;

            const formModel = LessonForm.dataToFormModel(initialState);
            this.form.setValue(formModel);
        }
    }

    @Output()
    formSubmitted = new EventEmitter<NewCourse>();

    onSubmit() {
        // if (this.form.valid) {
        //     let value = {
        //         ...this.form.value,
        //         duration: { weeks: this.form.value.duration! },
        //         lessons: [],
        //     };
        //     let nonNull: Required<typeof value> = value as Required<
        //         typeof value
        //     >;
        //     this.formSubmitted.emit(nonNull);
        //     this.form.reset();
        // }
    }

    static dataToFormModel(data: NewLesson) {
        const { title, description } = data;

        const attachments = data.attachments.map((attachment) => {
            return { url: attachment.url };
        });
        let date = data.publicationDate
            ? new Date(data.publicationDate)
            : new Date();

        return {
            title,
            description,
            attachments,
            date: date.toISOString(),
        };
    }

    static formModelToData(model: LessonForm['form']['value']): NewLesson {
        const { title, description, date, attachments } = model;

        if (!title || !description || !date || attachments == null) {
            throw new Error('??');
        }

        const publicationDate = new Date(date);
        return {
            title,
            description,
            publicationDate,
            attachments: attachments.map((a) => {
                return { url: a.url! };
            }),
        };
    }

    stringValue(): string {
        return JSON.stringify(this.form.value);
    }
}
