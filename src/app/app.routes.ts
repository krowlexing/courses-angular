import { Routes } from '@angular/router';
import { CoursePage } from './pages/course/course.page';
import { EditCoursePage } from './pages/edit-course/edit-course.page';
import { MainPage } from './pages/main/main.page';

export const routes: Routes = [
    { path: 'course/:id/edit', component: EditCoursePage },
    { path: 'course/:id', component: CoursePage },
    { path: '', component: MainPage },
];
