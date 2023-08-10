import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Bundles
import { MaterialBundle } from '@imports';

// Components
import { EventViewComponent } from './index.component';

// Modules
import { AvatarModule, LogoModule } from '@components';

@NgModule({
    declarations: [EventViewComponent],
    imports: [AvatarModule, CommonModule, LogoModule, MaterialBundle],
    exports: [EventViewComponent],
})
export class EventViewModule {}
