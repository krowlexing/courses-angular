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
import { CommonModule, Location } from '@angular/common';

@Component({
    selector: 'lesson-edit-form',
    templateUrl: './lesson.form.html',
    imports: [ReactiveFormsModule, CommonModule],
    standalone: true,
})
export class LessonForm implements OnChanges {
    constructor(private formBuilder: FormBuilder, private location: Location) {}

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
                ReturnType<typeof LessonForm.makeAttachmentGroup>
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

    static makeAttachmentGroup<T>(formBuilder: FormBuilder) {
        return formBuilder.nonNullable.group({
            url: ['', Validators.required],
        });
    }

    addAttachment() {
        this.form.controls.attachments.push(
            LessonForm.makeAttachmentGroup(this.formBuilder)
        );
    }

    removeAttachment(i: number) {
        this.form.controls.attachments.removeAt(i);
    }

    static dataToFormModel(data: NewLesson) {
        const { title, description } = data;

        const attachments = data.attachments.map((attachment) => {
            return { url: attachment.url };
        });
        const date = data.publicationDate
            ? data.publicationDate.toString()
            : new Date().toLocaleString();

        return {
            title,
            description,
            attachments,
            date,
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
