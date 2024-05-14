import { Component, EventEmitter, Output } from '@angular/core';
import { AppCommonModule } from '../common/common.module';

@Component({
    selector: 'course-button-block',
    standalone: true,
    imports: [AppCommonModule],
    template: `
        <div class="actions">
            <app-button (click)="onMoreClick()" value="Подробнее" />
            <app-button (click)="onEditClick()" value="Изменить" />
            <app-button (click)="onDeleteClick()" value="Удалить" />
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
