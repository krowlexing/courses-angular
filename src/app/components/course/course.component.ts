import { Component, Input } from '@angular/core';
import { Course } from '../../data/Course';

@Component({
    selector: 'course',
    standalone: true,
    imports: [],
    templateUrl: './course.component.html',
    styleUrl: './course.component.css',
})
export class CourseComponent {
    @Input()
    course!: Course;

    x: number = 124;
    JSON = JSON;
}
