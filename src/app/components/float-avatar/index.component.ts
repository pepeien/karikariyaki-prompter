import { Component, Input } from '@angular/core';
import { LangKey, Langs } from 'karikarihelper';

// Animations
import { AutomaticAnimation, BasicAnimations } from '@animations';

// Services
import { LanguageService, OperatorService, SettingsService } from '@services';

@Component({
	selector: 'app-float-avatar',
	templateUrl: './index.component.html',
	animations: [
		AutomaticAnimation.fade,
		AutomaticAnimation.pop,
		BasicAnimations.rotateCounterClock180Animation,
	],
})
export class FloatAvatarComponent {
	@Input()
	public base64Image?: string;

	/**
	 * Consts
	 */
	public readonly TOUCH_MOVEMENT_TRESHOLD = 50;

	public readonly WANTED_CLASSES = ['loating-avatar'];

	/**
	 * Primitives
	 */
	public isMenuVisible = false;
	public isSubmenuVisible = false;

	/**
	 * Language
	 */
	public selectedLanguage = LanguageService.DEFAULT_LANGUAGE;

	/**
	 * In House
	 */
	public langList = Langs;

	private _touchOrigin: Touch | null = null;

	constructor(
		private _languageService: LanguageService,
		private _operatorService: OperatorService,
		private _settingsService: SettingsService,
	) {}

	ngOnInit(): void {
		window.addEventListener('touchstart', (event) => {
			if (this.isMenuVisible === false) {
				return;
			}

			this._touchOrigin = event.touches[0];
		});

		window.addEventListener('touchend', (event) => {
			if (this.isMenuVisible === false) {
				return;
			}

			const location = event.changedTouches[0];

			if (!location) {
				return;
			}

			const targetComponent = window.document.elementFromPoint(
				location.clientX,
				location.clientY,
			) as HTMLElement;

			if (!targetComponent) {
				return;
			}

			if (
				this._doesHeritageContainClassname(this.WANTED_CLASSES, targetComponent) === false
			) {
				this.isMenuVisible = false;
			}
		});

		window.addEventListener('mouseup', (event) => {
			if (this.isMenuVisible === false || event.button !== 0) {
				return;
			}

			if (!event) {
				return;
			}

			const targetComponent = window.document.elementFromPoint(
				event.clientX,
				event.clientY,
			) as HTMLElement;

			if (!targetComponent) {
				return;
			}

			if (
				this._doesHeritageContainClassname(this.WANTED_CLASSES, targetComponent) === false
			) {
				this.isMenuVisible = false;
			}
		});

		window.addEventListener('touchmove', (event) => {
			if (!this._touchOrigin || this.isMenuVisible === false) {
				return;
			}

			const latestTouch = event.touches[0];

			const xUp = latestTouch.clientX;
			const yUp = latestTouch.clientY;

			const xDiff = this._touchOrigin.clientX - xUp;
			const yDiff = this._touchOrigin.clientY - yUp;

			if (Math.abs(xDiff) < Math.abs(yDiff)) {
				return;
			}

			if (xDiff > this.TOUCH_MOVEMENT_TRESHOLD) {
				this.isMenuVisible = false;

				this._touchOrigin = null;
			}
		});

		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.selectedLanguage = nextLanguage;
			},
		});
	}

	public onAvatarClick() {
		this.isMenuVisible = !this.isMenuVisible;
	}

	public onLanguageButtonClick() {
		this.isSubmenuVisible = !this.isSubmenuVisible;
	}

	public onLanguageUpdate(nextLang: string) {
		this._settingsService.update({
			language: nextLang as LangKey,
		});
	}

	public onLogout() {
		this._operatorService.signOut();
	}

	public isLanguageActive(languageDisplayName: string) {
		return this.selectedLanguage['LANGUAGE_DISPLAY_NAME'] === languageDisplayName;
	}

	private _doesHeritageContainClassname(classList: string[], element: HTMLElement): boolean {
		let didFindOnElement = false;

		classList.forEach((className) => {
			if (element.className?.includes && element.className?.includes(className)) {
				didFindOnElement = true;

				return;
			}
		});

		if (didFindOnElement) {
			return true;
		}

		if (!element.parentElement) {
			return false;
		}

		return this._doesHeritageContainClassname(classList, element.parentElement);
	}
}
