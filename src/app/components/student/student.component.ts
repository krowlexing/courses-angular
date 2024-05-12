import { Component, Input } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { CourseComponent } from '../../components/course/course.component';
import { Course, Student } from '../../data/Course';
import { Location } from '@angular/common';
import { CourseButtonBlock } from '../../components/course-button-block/course-button-block.component';
import { LessonsComponent } from '../../components/lessons/lessons.component';

@Component({
    selector: 'student',
    template: `
        <div>
            <div>name: {{ student.firstName }}</div>
        </div>
        <div>
            <button (click)="updateClick()">update</button>
            <button (click)="deleteClick()">delete</button>
        </div>
    `,
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
export class StudentComponent {
    @Input({ required: true })
    student!: Student;

    updateClick() {}

    deleteClick() {}
}
