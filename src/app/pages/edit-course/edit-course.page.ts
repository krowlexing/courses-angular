import { Component } from '@angular/core';
import { CoursesService } from '../../services/CoursesService';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './edit-course.page.html',
    standalone: true,
})
export class EditCoursePage {
    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private courseService: CoursesService
    ) {}

    
}
