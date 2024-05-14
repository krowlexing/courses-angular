import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Id, NewStudent, Student } from '../data/Course';
import { CommonModule, Location } from '@angular/common';
import { AppCommonModule } from './common/common.module';

@Component({
    selector: 'student-form',
    template: `<form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div>
            <div>
                <table>
                    <tr>
                        <td>
                            <app-input
                                label="first name"
                                controlName="firstName"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <app-input
                                label="last name"
                                controlName="lastName"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <app-input label="email" controlName="email" />
                        </td>
                    </tr>
                </table>
            </div>

            <div>
                <label>
                    courses
                    <div
                        *ngFor="
                            let item of form.controls.courses.controls;
                            let i = index
                        "
                    >
                        <div [formGroup]="item">
                            <app-button (click)="removeCourse(i)" value="-" />
                            #{{ i + 1 }}

                            <span>Id:</span>
                            <app-input label="id" controlName="id" />
                        </div>
                    </div>
                </label>
                <div>
                    <app-button (click)="addCourse()" value="+" />
                </div>
            </div>
            <app-button type="submit" value="submit" />
        </div>
        <ng-content />
    </form> `,
    imports: [ReactiveFormsModule, CommonModule, AppCommonModule],
    standalone: true,
})
export class StudentForm implements OnChanges {
    constructor(private formBuilder: FormBuilder, private location: Location) {}

    @Input()
    initialState: Student | undefined;

    @Input()
    form = this.formBuilder.nonNullable.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        courses: this.formBuilder.array<ReturnType<StudentForm['courseGroup']>>(
            []
        ),
    });

    courseGroup() {
        return this.formBuilder.nonNullable.group({
            id: [0, Validators.required],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['initialState']) {
            const initialState = changes['initialState']?.currentValue as
                | Student
                | undefined;

            if (initialState != undefined) {
                for (let course of initialState.courses) {
                    this.form.controls.courses.push(this.courseGroup());
                }

                const formModel = StudentForm.dataToFormModel(initialState);
                this.form.setValue(formModel);
            } else {
                this.form.reset();
            }
        }
    }

    @Output()
    formSubmitted = new EventEmitter<NewStudent>();

    onSubmit() {
        if (this.form.valid) {
            let value = StudentForm.formModelToData(this.form.value);
            this.formSubmitted.emit(value);
            this.form.reset();
        }
    }

    addCourse() {
        this.form.controls.courses.push(this.courseGroup());
    }

    removeCourse(i: number) {
        this.form.controls.courses.removeAt(i);
    }

    static dataToFormModel(data: NewStudent) {
        const { firstName, lastName, email, courses } = data;
        return {
            firstName,
            lastName,
            email,
            courses,
        };
    }

    static formModelToData(model: StudentForm['form']['value']): NewStudent {
        const { firstName, lastName, email, courses } = model;

        if (!firstName || !lastName || !email || courses == null) {
            throw new Error('??');
        }

        const filteredCourses: Id[] = courses.filter(
            (course) => course.id != undefined
        ) as Id[];

        return {
            firstName,
            lastName,
            email,
            courses: filteredCourses,
        };
    }

    stringValue(): string {
        return JSON.stringify(this.form.value);
    }
}
