import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButton,
    MatIconButton,
    MatButtonModule,
} from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'app-button',
    template: `
        <button
            type="{{ type ?? 'button' }}"
            *ngIf="buttonType == 'flat'"
            mat-flat-button
            color="{{ color }}"
            [disabled]="disabled"
            (click)="clickHandler()"
        >
            <mat-icon *ngIf="icon">{{ icon }}</mat-icon> {{ value }}
        </button>
        <button
            type="{{ type ?? 'button' }}"
            *ngIf="buttonType == undefined"
            color="{{ color }}"
            (click)="(clickHandler)"
            [disabled]="disabled"
            mat-button
        >
            <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
            {{ value }}
        </button>
    `,
    imports: [
        MatButton,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class ButtonComponent {
    @Output()
    click = new EventEmitter();

    @Input()
    value?: string;

    @Input()
    disabled?: boolean;

    @Input()
    icon?: string;

    @Input()
    type?: string;

    @Input()
    color?: string;

    clickHandler() {
        this.click.emit();
    }

    @Input()
    buttonType?: 'flat';
}
