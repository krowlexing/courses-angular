import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    ControlContainer,
    FormGroupDirective,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'app-input',
    template: `
        <mat-form-field class="text-input-field">
            <mat-label>{{ label }}</mat-label>
            <input
                matInput
                [formControlName]="controlName"
                type="{{ inputType }}"
            />
            <span matTextSuffix>&nbsp; {{ suffix }}</span>
            <ng-content />
        </mat-form-field>
    `,
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective },
    ],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class AppInputComponent {
    @Input({ required: true })
    controlName!: string;

    @Input()
    label?: string;

    @Input('type')
    inputType?: string;

    @Input()
    suffix?: string;
}
