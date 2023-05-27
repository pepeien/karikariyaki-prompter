import { AnimationEvent } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from 'karikarihelper';

// Animations
import { AutomaticAnimation, BasicAnimations } from '@animations';

// Services
import { EventsService, LanguageService, LoadingService, SocketService } from '@services';

@Component({
	selector: 'app-home-view',
	templateUrl: './index.component.html',
	animations: [
		AutomaticAnimation.slideFromRight,
		BasicAnimations.breatheAnimation,
		BasicAnimations.horizontalShrinkAnimation,
	],
})
export class HomeViewComponent implements OnInit {
	/**
	 * Primitives
	 */
	public isLoading = false;

	/**
	 * In House
	 */
	public finishedEvents: Event[] = [];
	public ongoingEvents: Event[] = [];
	public upcomingEvents: Event[] = [];

	/**
	 * Language
	 */
	public selectedLanguage = LanguageService.DEFAULT_LANGUAGE;

	constructor(
		private _eventService: EventsService,
		private _languageService: LanguageService,
		private _loadingService: LoadingService,
		private _router: Router,
		private _socketService: SocketService,
	) {}

	ngOnInit(): void {
		this._setupSocket();

		this._eventService.availableEvents.subscribe({
			next: (eventList) => {
				const currentDate = new Date();

				currentDate.setHours(0, 0, 0, 0);

				for (const event of eventList) {
					const broadEventDate = new Date(event.date.toString().split('T')[0]);
					const broadCurrentDate = new Date(currentDate.toISOString().split('T')[0]);

					if (
						this._isEventFinished(broadEventDate, broadCurrentDate) &&
						this._hasEvent(event, this.finishedEvents) === false
					) {
						this.finishedEvents.unshift(event);

						continue;
					}

					if (
						this._isEventOnGoing(broadEventDate, broadCurrentDate) &&
						this._hasEvent(event, this.ongoingEvents) === false
					) {
						this.ongoingEvents.unshift(event);

						continue;
					}

					if (
						this._isEventUpcoming(broadEventDate, broadCurrentDate) &&
						this._hasEvent(event, this.upcomingEvents) === false
					) {
						this.upcomingEvents.unshift(event);

						continue;
					}
				}

				this._loadingService.updateLoading(false);
			},
		});

		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.selectedLanguage = nextLanguage;
			},
		});

		this._loadingService.loading.subscribe({
			next: (nextLoading) => {
				this.isLoading = nextLoading;
			},
		});
	}

	public onEventClick(event: Event) {
		if (this.isLoading) {
			return;
		}

		this._loadingService.updateLoading(true);

		this._router.navigate(['event', event._id]);
	}

	private _setupSocket() {
		this._loadingService.updateLoading(true);

		this._eventService.updateSelectedEvent(null);

		this._socketService.socket.emit('events:join');
	}

	private _isEventFinished(eventDate: Date, currentDate: Date) {
		return eventDate < currentDate;
	}

	private _isEventOnGoing(eventDate: Date, currentDate: Date) {
		return (
			eventDate.getDate() === currentDate.getDate() &&
			eventDate.getMonth() === currentDate.getMonth() &&
			eventDate.getFullYear() === currentDate.getFullYear()
		);
	}

	private _isEventUpcoming(eventDate: Date, currentDate: Date) {
		return eventDate > currentDate;
	}

	private _hasEvent(target: Event, eventList: Event[]): boolean {
		let hasEvent = false;

		for (const event of eventList) {
			if (event._id === target._id) {
				hasEvent = true;

				break;
			}
		}

		return hasEvent;
	}
}
