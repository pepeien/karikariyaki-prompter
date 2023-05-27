import { transition, trigger, state, style, animate } from '@angular/animations';

export class LoggedNavbarAnimation {
	public static LOGGED_SWIPE_ANIMATION_DURATION_IS_MS = 200;

	public static get swipeAnimation() {
		return trigger('loggedSwipe', [
			state(
				'left',
				style({
					width: 'height: 0',
					marginTop: 'auto',
				}),
			),
			state(
				'right',
				style({
					width: 'height: 0',
					marginTop: 'auto',
				}),
			),
			transition('left => right', [
				animate(`${LoggedNavbarAnimation.LOGGED_SWIPE_ANIMATION_DURATION_IS_MS}ms`),
			]),
			transition('right => left', [
				animate(`${LoggedNavbarAnimation.LOGGED_SWIPE_ANIMATION_DURATION_IS_MS}ms`),
			]),
		]);
	}
}

export class LoginNavbarAnimation {
	public static LOGIN_SWIPE_ANIMATION_DURATION_IS_MS = 300;
	public static LOGIN_SWIPE_ANIMATION_DELAY_IS_MS = 1000;

	public static get swipeAnimation() {
		return trigger('loginSwipe', [
			state(
				'left',
				style({
					height: '0',
					marginTop: 'auto',
				}),
			),
			state(
				'right',
				style({
					height: '100vh',
					marginTop: 'auto',
				}),
			),
			transition('left => right', [
				animate(`${LoggedNavbarAnimation.LOGGED_SWIPE_ANIMATION_DURATION_IS_MS}ms`),
			]),
			transition('right => left', [
				animate(`${LoggedNavbarAnimation.LOGGED_SWIPE_ANIMATION_DURATION_IS_MS}ms`),
			]),
		]);
	}
}
