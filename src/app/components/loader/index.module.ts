import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LoaderComponent } from './index.component';

// Modules
import { LogoModule } from '../logo';

@NgModule({
    declarations: [LoaderComponent],
    imports: [CommonModule, LogoModule],
    exports: [LoaderComponent],
})
export class LoaderComponentModule {}
