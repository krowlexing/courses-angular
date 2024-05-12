import { Component } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { CourseComponent } from '../../components/course/course.component';
import { Course } from '../../data/Course';
import { Location } from '@angular/common';
import { CourseButtonBlock } from '../../components/course-button-block/course-button-block.component';
import { LessonsComponent } from '../../components/lessons/lessons.component';

@Component({
    templateUrl: './main.page.html',
    styles: `
    `,
    imports: [
        RouterOutlet,
        NgFor,
        CourseComponent,
        CourseButtonBlock,
        LessonsComponent,
    ],
    standalone: true,
})
export class MainPage {
    courses!: Course[];

    constructor(
        private coursesService: CoursesService,
        private router: Router
    ) {
        coursesService.values().subscribe((next) => {
            this.courses = next;
        });
    }

    onMoreClick(course: Course) {
        this.router.navigateByUrl(`/course/${course.id}`);
    }

    onEditClick(course: Course) {
        this.router.navigateByUrl(`/course/${course.id}/edit`);
    }

    onDeleteClick(course: Course) {}

    addDefaultCourse() {
        this.coursesService.push(this.coursesService.defaultCourses()[0]);
    }

    studentsClick() {
        this.router.navigateByUrl(`/students`);
    }
}
