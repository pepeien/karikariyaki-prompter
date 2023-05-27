import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Bundles
import { MaterialBundle } from '@imports';

// Components
import { HomeViewComponent } from './index.component';

// Modules
import { AvatarModule, LogoModule } from '@components';

@NgModule({
	declarations: [HomeViewComponent],
	imports: [AvatarModule, CommonModule, LogoModule, MaterialBundle],
	exports: [HomeViewComponent],
})
export class HomeViewModule {}
