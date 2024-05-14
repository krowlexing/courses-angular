import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppCommonModule } from './common/common.module';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
@Component({
    selector: 'attachments',
    styles: `
        .minus-attachment {
            margin-left: 0.8rem;
            margin-right: 0.8rem;
        }

        .my-fun ::ng-deep .text-input-field {
            width: 20rem;
            resize: none;
        }
    `,
    template: `
        <mat-expansion-panel class="panel-container">
            <mat-expansion-panel-header>
                <mat-panel-title>
                    Attachments ({{
                        formControls.controls.length
                    }})</mat-panel-title
                >
            </mat-expansion-panel-header>

            <div *ngFor="let item of formControls.controls; let i = index">
                <div [formGroup]="item">
                    <app-fab
                        class="minus-attachment button-button"
                        (click)="removeAttachment(i)"
                        icon="remove"
                    />

                    <app-input class="my-fun" controlName="url" label="url" />
                </div>
            </div>
            <app-button
                icon="add"
                value="Add attachment"
                (click)="addAttachment()"
            />
        </mat-expansion-panel>
    `,
    imports: [
        MatExpansionModule,
        AppCommonModule,
        MatDividerModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    standalone: true,
})
export class AttachmentsComponent {
    @Input({ required: true })
    formControls!: FormArray<FormGroup<{ url: FormControl<string> }>>;

    constructor(private formBuilder: FormBuilder) {}

    static makeAttachmentGroup<T>(formBuilder: FormBuilder) {
        return formBuilder.nonNullable.group({
            url: ['', Validators.required],
        });
    }

    addAttachment() {
        this.formControls.push(
            AttachmentsComponent.makeAttachmentGroup(this.formBuilder)
        );
    }

    removeAttachment(i: number) {
        this.formControls.removeAt(i);
    }
}
