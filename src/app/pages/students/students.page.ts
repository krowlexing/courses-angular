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
import { AppCommonModule } from '../../components/common/common.module';

@Component({
    templateUrl: './students.page.html',
    styles: `
    .container {
        padding: 2rem;
        display: flex;
        justify-content: space-around;
    }
    .card {
        padding: 20px;
    }
    `,
    imports: [
        RouterOutlet,
        NgFor,
        CourseComponent,
        CourseButtonBlock,
        LessonsComponent,
        AppCommonModule,
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

    onDelete(student: Student) {
        this.studentService.remove(student.id);
    }

    onUpdate(student: Student) {
        this.router.navigateByUrl(`/students/${student.id}/edit`);
    }
}
