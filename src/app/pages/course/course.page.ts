import { Component, EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';
import { CourseComponent } from '../../components/course/course.component';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../data/Course';
import { combineLatest } from 'rxjs';

@Component({
    templateUrl: './course.page.html',
    imports: [CourseComponent],
    standalone: true,
})
export class CoursePage {
    course!: Course;

    constructor(
        private courseService: CoursesService,
        private route: ActivatedRoute
    ) {
        combineLatest([route.params, courseService.values()]).subscribe(
            ([params, courses]) => {
                this.course = courses.find((v) => v.id == +params['id'])!;
                console.log(JSON.stringify(courses));
                console.log(this.course);
            }
        );
    }
}
