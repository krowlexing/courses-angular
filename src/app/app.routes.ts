import { Routes } from '@angular/router';
import { CoursePage } from './pages/course/course.page';
import { EditCoursePage } from './pages/edit-course/edit-course.page';
import { MainPage } from './pages/main/main.page';
import { StudentsPage } from './pages/students/students.page';
import { EditStudentsPage } from './pages/edit-students.page';

export const routes: Routes = [
    { path: 'course/:id/edit', component: EditCoursePage },
    { path: 'course/add', component: EditCoursePage },
    { path: 'course/:id', component: CoursePage },
    { path: 'students/:id/edit', component: EditStudentsPage },
    { path: 'students/add', component: EditStudentsPage },
    { path: 'students', component: StudentsPage },
    { path: '', component: MainPage },
];
