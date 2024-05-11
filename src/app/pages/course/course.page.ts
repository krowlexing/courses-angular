import { Component, EventEmitter } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';

@Component({
    templateUrl: './course.page.html',
    standalone: true,
})
export class CoursePage {
    constructor(private courseService: CoursesService) {}
}
