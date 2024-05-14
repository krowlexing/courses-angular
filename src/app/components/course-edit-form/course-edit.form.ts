import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Course, NewCourse } from '../../data/Course';
import { CommonModule, Location } from '@angular/common';
import { LessonForm } from '../lesson-edit-form/lesson.form';
import { AppCommonModule } from '../common/common.module';
import { AttachmentsComponent } from '../attachments.component';

@Component({
    selector: 'course-edit-form',
    templateUrl: './course-edit.form.html',
    styles: `
        textarea {
            width: 30rem;
            resize: none;
        }
        .centered-text {
            display: flex;
            align-items: center;
        }
        .margin {
            margin: 10px;
        }
        .lessons-title {
            margin: 5px;
        }
    `,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        LessonForm,
        CommonModule,
        AppCommonModule,
    ],
    standalone: true,
})
export class CourseEditForm implements OnChanges {
    constructor(private formBuilder: FormBuilder, private location: Location) {}

    @Input()
    initialState: Course | undefined;

    JSON = JSON;

    form = CourseEditForm.formGroup(this.formBuilder);

    forms: ReturnType<typeof LessonForm.formGroup>[] = [];

    static formGroup(formBuilder: FormBuilder) {
        return formBuilder.nonNullable.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            duration: [0, Validators.required],
            price: [0, Validators.required],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const initialStateChanges = changes['initialState'];
        if (this.initialState || initialStateChanges == undefined) {
            this.form.setValue({
                title: ' ',
                description: ' ',
                duration: 0,
                price: 0,
            });
            this.form.reset();
        }
        if (initialStateChanges && initialStateChanges.currentValue) {
            const initialState = changes['initialState'].currentValue as Course;
            const { id, lessons, ...requiredOnly } = initialState;

            const initialFormState = {
                ...requiredOnly,
                duration: initialState.duration.weeks,
            };

            this.form.setValue(initialFormState);
            this.initLessonsSubforms(initialState);
        }
    }

    initLessonsSubforms(initialState: Course) {
        if (initialState != undefined) {
            const lessons = initialState.lessons;
            console.log(`lenssons length: ${lessons.length}`);
            for (let lesson of lessons) {
                const form = LessonForm.formGroup(this.formBuilder);
                for (let attachment of lesson.attachments) {
                    form.controls.attachments.push(
                        AttachmentsComponent.makeAttachmentGroup(
                            this.formBuilder
                        )
                    );
                }
                form.setValue(LessonForm.dataToFormModel(lesson));

                this.forms.push(form);
            }
        }
    }

    @Output()
    formSubmitted = new EventEmitter<NewCourse>();

    onSubmit() {
        if (this.form.valid) {
            const lessons = this.forms
                .filter((lessonForm) => lessonForm.valid)
                .map((form) => LessonForm.formModelToData(form.value));

            let value = {
                ...this.form.value,
                duration: { weeks: this.form.value.duration! },
                lessons,
            };
            let nonNull: Required<typeof value> = value as Required<
                typeof value
            >;
            this.formSubmitted.emit(nonNull);
            this.form.reset();
        }
    }

    handleClick() {
        this.onAddLesson();
    }

    onAddLesson() {
        try {
            this.forms.push(LessonForm.formGroup(this.formBuilder));
        } catch (e) {
            console.log(e);
        }
    }

    removeLesson(index: number) {
        this.forms = this.forms.filter((_, i) => i !== index);
    }

    debugText() {
        return JSON.stringify(this.forms.map((form) => form.value));
    }
}
