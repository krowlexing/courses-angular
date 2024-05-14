import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    ControlContainer,
    FormGroupDirective,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'app-textarea',
    template: `
        <mat-form-field class="text-input-field">
            <mat-label>{{ label }}</mat-label>
            <textarea matInput [formControlName]="controlName"></textarea>
        </mat-form-field>
    `,
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective },
    ],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class AppTextAreaComponent {
    @Input({ required: true })
    controlName!: string;

    @Input()
    label?: string;
}
