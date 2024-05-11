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

    form = this.formBuilder.nonNullable.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],

        attachments: this.formBuilder.array<
            ReturnType<LessonForm['makeAttachmentGroup']>
        >([]),
    });

    ngOnChanges(changes: SimpleChanges): void {
        const initialState = changes['initialState'].currentValue as Lesson;

        const formModel = this.dataToFormModel(initialState);
        this.form.setValue(formModel);
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

    makeAttachmentGroup() {
        return this.formBuilder.nonNullable.group({
            url: ['', Validators.required],
        });
    }

    addAttachment() {
        this.form.controls.attachments.push(this.makeAttachmentGroup());
    }

    removeAttachment(i: number) {
        this.form.controls.attachments.removeAt(i);
    }

    dataToFormModel(data: NewLesson) {
        const { title, description } = data;

        const attachments = data.attachments.map((attachment) => {
            return { url: attachment.url };
        });
        const date = data.publicationDate.toString();

        return {
            title,
            description,
            attachments,
            date,
        };
    }

    stringValue(): string {
        return JSON.stringify(this.form.value);
    }
}
