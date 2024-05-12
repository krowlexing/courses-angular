import { Component, EventEmitter, Output } from '@angular/core';
import { CoursesService } from '../services/CoursesService';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskType } from 'zone.js/lib/zone-impl';
import { Course, NewCourse, NewStudent, Student } from '../data/Course';
import { Location } from '@angular/common';
import { CourseEditForm } from '../components/course-edit-form/course-edit.form';
import { Subscription, combineLatest } from 'rxjs';
import { StudentService } from '../services/StudentService';
import { StudentForm } from '../components/student-edit-form';
@Component({
    imports: [FormsModule, StudentForm],
    template: `<student-form
        [initialState]="student"
        (formSubmitted)="onFormSubmitted($event)"
    /> `,
    standalone: true,
})
export class EditStudentsPage {
    student?: Student;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private courseService: StudentService
    ) {
        let latestSubscriber: Subscription;
        route.params.subscribe((params) => {
            latestSubscriber?.unsubscribe();
            latestSubscriber = courseService
                .observeById(+params['id'])
                .subscribe((student) => {
                    this.student = student;
                });
        });
        combineLatest([route.params, courseService.values()]).subscribe(
            ([params, courses]) => {}
        );
    }

    onFormSubmitted(student: NewStudent) {
        if (this.student) {
            this.courseService.update(this.student.id, student);
        } else {
            this.courseService.push(student);
        }
        this.location.back();
    }
}
