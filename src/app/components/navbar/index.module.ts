import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NavbarComponent } from './index.component';

// Modules
import { AvatarModule, LogoModule } from '@components';

// Imports
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [NavbarComponent],
	imports: [AvatarModule, CommonModule, FormsBundle, LogoModule, MaterialBundle],
	exports: [NavbarComponent],
})
export class NavbarModule {}
