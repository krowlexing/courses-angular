import { Component, Input, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
    ControlContainer,
    FormControl,
    FormGroup,
    FormGroupDirective,
    ReactiveFormsModule,
} from '@angular/forms';

@Component({
    selector: 'datepicker',
    template: `
        <mat-form-field>
            <mat-label>{{ label }}</mat-label>
            <input
                matInput
                name="{{ controlName }}"
                [matDatepicker]="picker"
                formControlName="{{ controlName }}"
            />
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle
                matIconSuffix
                [for]="picker"
            ></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
    `,
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective },
    ],
    providers: [provideNativeDateAdapter()],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
    ],
    standalone: true,
})
export class AppDatepicker {
    @Input({ required: true })
    controlName!: string;

    @Input()
    label?: string;
}
