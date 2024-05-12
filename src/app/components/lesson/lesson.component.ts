import { Component, Input } from '@angular/core';
import { Lesson } from '../../data/Course';
import { formatDate } from '../../util/util';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lesson',
    imports: [CommonModule],
    template: `
        <div class="container">
            <div>title: {{ lesson.title }}</div>
            <div>description: {{ lesson.description }}</div>
            <div>pub date: {{ formatDate(lesson.publicationDate) }}</div>
            <div>
                attachments:
                <div>
                    <div
                        class="attachment"
                        *ngFor="let attachment of lesson.attachments"
                    >
                        {{ attachment.url }}
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrl: './lesson.component.css',
    standalone: true,
})
export class LessonComponent {
    @Input({ required: true })
    lesson!: Lesson;

    formatDate(date: Date): string {
        return formatDate(new Date(date));
    }
}
