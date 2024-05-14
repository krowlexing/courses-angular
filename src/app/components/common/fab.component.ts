import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    MatButton,
    MatButtonModule,
    MatIconButton,
} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'app-fab',
    template: `<button
        mat-mini-fab
        color="{{ color ?? 'primary' }}"
        (click)="click.emit()"
    >
        <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
    </button>`,
    styles: `
    
    `,
    imports: [
        MatButton,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        CommonModule,
    ],
    standalone: true,
})
export class FabComponent {
    @Output()
    click = new EventEmitter();

    @Input()
    value?: string;

    @Input()
    color?: string;

    @Input()
    icon?: string;
}
