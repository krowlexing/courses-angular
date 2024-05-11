import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { CoursesService } from './services/CoursesService';
import { Course } from './data/Course';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgFor, CourseComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'courses';
    courses!: Course[];

    constructor(private coursesService: CoursesService) {
        coursesService.values().subscribe((next) => {
            this.courses = next;
        });
    }

    onEditClick(course: Course) {
        alert(`${course.title}`);
    }

    addDefaultCourse() {
        this.coursesService.push(this.coursesService.defaultCourses()[0]);
    }
}
