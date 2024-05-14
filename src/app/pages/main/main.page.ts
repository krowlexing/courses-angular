import { Component } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { CourseComponent } from '../../components/course/course.component';
import { Course } from '../../data/Course';
import { Location } from '@angular/common';
import { CourseButtonBlock } from '../../components/course-button-block/course-button-block.component';
import { LessonsComponent } from '../../components/lessons/lessons.component';
import { AppCommonModule } from '../../components/common/common.module';

@Component({
    templateUrl: './main.page.html',
    styles: `
    .course-container {
        display: flex;
        align-items:stretch;
        flex-wrap: wrap;
        row-gap: 10px;
    }

    .course-button {
        margin: 4px;
    }
    `,
    imports: [
        RouterOutlet,
        NgFor,
        CourseComponent,
        CourseButtonBlock,
        LessonsComponent,
        AppCommonModule,
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

    addCourse() {
        this.router.navigateByUrl(`/course/add`);
    }

    studentsClick() {
        this.router.navigateByUrl(`/students`);
    }
}
