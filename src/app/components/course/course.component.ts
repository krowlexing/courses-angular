import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../data/Course';
import { MatCardModule } from '@angular/material/card';
import { AppCommonModule } from '../common/common.module';
@Component({
    selector: 'course',
    standalone: true,
    imports: [MatCardModule, AppCommonModule],
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
