import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { AppDatepicker } from './datepicker.component';
import { AppInputComponent } from './input.component';
import { AppTextAreaComponent } from './textarea.component';
import { FabComponent } from './fab.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        ButtonComponent,
        AppDatepicker,
        AppInputComponent,
        AppTextAreaComponent,
        FabComponent,
        MatDividerModule,
        MatCardModule,
    ],
    exports: [
        ButtonComponent,
        AppDatepicker,
        AppInputComponent,
        AppTextAreaComponent,
        FabComponent,
        MatDividerModule,
        MatCardModule,
    ],
})
export class AppCommonModule {}
