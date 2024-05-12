import { Component, EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';
import { CourseComponent } from '../../components/course/course.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../data/Course';
import { combineLatest } from 'rxjs';
import { LessonsComponent } from '../../components/lessons/lessons.component';

@Component({
    templateUrl: './course.page.html',
    imports: [CourseComponent, LessonsComponent],
    standalone: true,
})
export class CoursePage {
    course!: Course;

    constructor(
        private courseService: CoursesService,
        private router: Router,
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

    onEditClick() {
        this.router.navigateByUrl(`course/${this.course.id}/edit`);
    }
}
