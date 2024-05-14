import { Component, Input } from '@angular/core';
import { Lesson } from '../../data/Course';
import { formatDate } from '../../util/util';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../common/common.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
@Component({
    selector: 'lesson',
    imports: [CommonModule, AppCommonModule, MatCardModule, MatListModule],
    template: `
        <mat-card class="container">
            <div class="mat-headline-5">{{ lesson.title }}</div>
            <div class="mat-h4">{{ lesson.description }}</div>
            <div>{{ formatDate(lesson.publicationDate) }}</div>
            <div *ngIf="lesson.attachments.length > 0">
                <span class="mat-h2">Attachments:</span>

                <mat-list role="list">
                    <mat-list-item
                        role="listitem"
                        class="attachment"
                        *ngFor="let attachment of lesson.attachments"
                    >
                        {{ attachment.url }}
                    </mat-list-item>
                </mat-list>
            </div>
        </mat-card>
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
