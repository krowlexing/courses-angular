import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { CoursesService } from './services/CoursesService';
import { Course } from './data/Course';
import { NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgFor, CourseComponent, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'courses';
}
