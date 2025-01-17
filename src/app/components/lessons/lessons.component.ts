import { Component, Input } from '@angular/core';
import { Lesson } from '../../data/Course';
import { LessonComponent } from '../lesson/lesson.component';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/common.module';

@Component({
    selector: 'lessons',
    imports: [LessonComponent, CommonModule, AppCommonModule],
    template: `
        <div *ngFor="let lesson of lessons; let i = index">
            <div>#{{ i + 1 }}</div>
            <lesson [lesson]="lesson" />
        </div>
    `,
    standalone: true,
})
export class LessonsComponent {
    @Input({ required: true })
    lessons!: Lesson[];
}
