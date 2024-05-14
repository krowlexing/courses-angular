import { Component, EventEmitter, Output } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskType } from 'zone.js/lib/zone-impl';
import { Course, NewCourse } from '../../data/Course';
import { Location } from '@angular/common';
import { CourseEditForm } from '../../components/course-edit-form/course-edit.form';
import { Subscription, combineLatest } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { AppCommonModule } from '../../components/common/common.module';
@Component({
    imports: [FormsModule, CourseEditForm, MatCardModule, AppCommonModule],
    styles: `
    ::ng-deep .text-input-field {
        width: 30rem;
    }

    .course-form {
        display: flex;

    }

    .container {
        margin: 10px;
        display: flex;
        justify-content: space-around;
    }
    `,
    templateUrl: './edit-course.page.html',
    standalone: true,
})
export class EditCoursePage {
    course?: Course;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private courseService: CoursesService
    ) {
        let latestSubscriber: Subscription;
        route.params.subscribe((params) => {
            latestSubscriber?.unsubscribe();
            latestSubscriber = courseService
                .observeById(+params['id'])
                .subscribe((course) => {
                    this.course = course;
                });
        });
        combineLatest([route.params, courseService.values()]).subscribe(
            ([params, courses]) => {}
        );
    }

    onFormSubmitted(course: NewCourse) {
        if (this.course) {
            this.courseService.update(this.course.id, course);
        } else {
            this.courseService.push(course);
        }
        this.location.back();
    }
}
