import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { CourseComponent } from '../../components/course/course.component';
import { Course, Student } from '../../data/Course';
import { Location } from '@angular/common';
import { CourseButtonBlock } from '../../components/course-button-block/course-button-block.component';
import { LessonsComponent } from '../../components/lessons/lessons.component';
import { AppCommonModule } from '../common/common.module';

@Component({
    selector: 'student',
    template: `
        <div>
            <table>
                <tr>
                    <td>name:</td>
                    <td>{{ student.firstName }} {{ student.lastName }}</td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>{{ student.email }}</td>
                </tr>
            </table>

            <table *ngIf="student.courses.length > 0">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                    </tr>
                </thead>
                <tr *ngFor="let course of student.courses">
                    <td>
                        {{ course.id }}
                    </td>
                    <td>
                        {{ courseById(course.id) }}
                    </td>
                </tr>
            </table>
        </div>
        <div>
            <app-button (click)="onUpdateClick()" value="update" />
            <app-button (click)="onDeleteClick()" value="delete" />
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
        CommonModule,
        AppCommonModule,
    ],
    standalone: true,
})
export class StudentComponent {
    courses: Course[] = [];

    @Input({ required: true })
    student!: Student;

    constructor(private coursesService: CoursesService) {
        coursesService.valuesSubject.subscribe((courses) => {
            this.courses = courses;
        });
    }

    @Output()
    updateClick = new EventEmitter<Student>();

    @Output()
    deleteClick = new EventEmitter<Student>();

    onUpdateClick() {
        this.updateClick.emit(this.student);
    }

    onDeleteClick() {
        this.deleteClick.emit(this.student);
    }

    courseById(id: number): string {
        const found = this.courses.find((course) => course.id == id);

        return found != null ? found.title : 'не найден';
    }
}
