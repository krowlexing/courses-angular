import { Component } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { CourseComponent } from '../../components/course/course.component';
import { Course, Student } from '../../data/Course';
import { Location } from '@angular/common';
import { CourseButtonBlock } from '../../components/course-button-block/course-button-block.component';
import { LessonsComponent } from '../../components/lessons/lessons.component';
import { StudentComponent } from '../../components/student/student.component';
import { StudentService } from '../../services/StudentService';

@Component({
    templateUrl: './students.page.html',
    styles: `
    `,
    imports: [
        RouterOutlet,
        NgFor,
        CourseComponent,
        CourseButtonBlock,
        LessonsComponent,
        CommonModule,
        StudentComponent,
    ],
    standalone: true,
})
export class StudentsPage {
    students!: Student[];

    constructor(
        private studentService: StudentService,
        private router: Router
    ) {
        studentService.values().subscribe((students) => {
            this.students = students;
        });
    }

    addStudent() {
        this.router.navigateByUrl(`/students/add`);
    }
}
