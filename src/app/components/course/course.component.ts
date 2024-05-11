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
    editClick = new EventEmitter<Course>();

    @Output()
    moreClick = new EventEmitter<Course>();

    @Output()
    deleteClick = new EventEmitter<Course>();

    onEditClick() {
        this.editClick.emit(this.course);
    }

    onMoreClick() {
        this.moreClick.emit(this.course);
    }

    onDeleteClick() {
        this.deleteClick.emit(this.course);
    }
}
