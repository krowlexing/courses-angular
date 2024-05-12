import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'course-button-block',
    standalone: true,
    imports: [],
    template: `
        <div class="actions">
            <button class="button" (click)="onMoreClick()">Подробнее</button>
            <button class="button" (click)="onEditClick()">Изменить</button>
            <button class="button" (click)="onDeleteClick()">Удалить</button>
        </div>
    `,
    styleUrl: './course-button-block.component.css',
})
export class CourseButtonBlock {
    @Output()
    moreClick = new EventEmitter();

    @Output()
    editClick = new EventEmitter();

    @Output()
    deleteClick = new EventEmitter();

    onMoreClick() {
        this.moreClick.emit();
    }

    onEditClick() {
        this.editClick.emit();
    }

    onDeleteClick() {
        this.deleteClick.emit();
    }
}
