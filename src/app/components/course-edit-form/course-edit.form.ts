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
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Course, Lesson, NewCourse, NewLesson } from '../../data/Course';
import { CommonModule, Location } from '@angular/common';
import { LessonForm } from '../lesson-edit-form/lesson.form';

@Component({
    selector: 'course-edit-form',
    templateUrl: './course-edit.form.html',
    imports: [ReactiveFormsModule, FormsModule, LessonForm, CommonModule],
    standalone: true,
})
export class CourseEditForm implements OnChanges {
    constructor(private formBuilder: FormBuilder, private location: Location) {}

    @Input()
    initialState: Course | undefined;

    JSON = JSON;

    form = CourseEditForm.formGroup(this.formBuilder);

    forms: ReturnType<typeof LessonForm.formGroup>[] = [];
    lessons: (NewLesson | null)[] = [];

    static formGroup(formBuilder: FormBuilder) {
        return formBuilder.nonNullable.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            duration: [0, Validators.required],
            price: [0, Validators.required],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const initialState = changes['initialState'].currentValue as Course;
        const { id, lessons, ...requiredOnly } = initialState;

        const initialFormState = {
            ...requiredOnly,
            duration: initialState.duration.weeks,
        };

        this.form.setValue(initialFormState);
        this.initLessonsSubforms(initialState);
    }

    initLessonsSubforms(initialState: Course) {
        const lessons = initialState.lessons;
        console.log(`lenssons length: ${lessons.length}`);
        for (let lesson of lessons) {
            const form = LessonForm.formGroup(this.formBuilder);
            for (let attachment of lesson.attachments) {
                form.controls.attachments.push(
                    LessonForm.makeAttachmentGroup(this.formBuilder)
                );
            }
            form.setValue(LessonForm.dataToFormModel(lesson));

            this.forms.push(form);
        }
    }

    @Output()
    formSubmitted = new EventEmitter<NewCourse>();

    onSubmit() {
        if (this.form.valid) {
            const lessons = this.forms
                .filter((lessonForm) => lessonForm.valid)
                .map((form) => LessonForm.formModelToData(form.value));

            alert(JSON.stringify(lessons));
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

    onAddLesson() {
        this.lessons.push(null);
        this.forms.push(LessonForm.formGroup(this.formBuilder));
    }

    removeLesson(index: number) {
        this.lessons = this.lessons.filter((_, i) => i !== index);
    }

    debugText() {
        return JSON.stringify(this.forms.map((form) => form.value));
    }
}
