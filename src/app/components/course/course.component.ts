import { Component, EventEmitter, Input, Output } from '@angular/core';
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

    @Output()
    onEditClick = new EventEmitter<Course>();

    editClick() {
        this.onEditClick.emit(this.course);
    }
}
