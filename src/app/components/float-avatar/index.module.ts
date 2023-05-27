import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { FloatAvatarComponent } from './index.component';

// Modules
import { AvatarModule } from '@components';

// Imports
import { MaterialBundle } from '@imports';

@NgModule({
	declarations: [FloatAvatarComponent],
	imports: [AvatarModule, CommonModule, MaterialBundle],
	exports: [FloatAvatarComponent],
})
export class FloatAvatarModule {}
