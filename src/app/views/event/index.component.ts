import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponseWrapper, Event, EventOrder, OrderStatus, Product } from 'karikarihelper';

// Animations
import { AutomaticAnimation, BasicAnimations } from '@animations';

// Services
import {
	AlertService,
	EventsService,
	LanguageService,
	LoadingService,
	SocketService,
} from '@services';

@Component({
	selector: 'app-event-view',
	templateUrl: './index.component.html',
	animations: [
		AutomaticAnimation.pop,
		AutomaticAnimation.slideFromLeft,
		AutomaticAnimation.slideFromRight,
		BasicAnimations.horizontalShrinkAnimation,
	],
})
export class EventViewComponent implements OnInit {
	/**
	 * Primitives
	 */
	public isLoading = false;

	/**
	 * Language
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	/**
	 * In House
	 */
	public selectedEvent: Event | null = null;
	public pickedupOrders: EventOrder[] = [];
	public cookingOrders: EventOrder[] = [];
	public readyOrders: EventOrder[] = [];

	constructor(
		private _alertService: AlertService,
		private _activedRoute: ActivatedRoute,
		private _eventService: EventsService,
		private _languageService: LanguageService,
		private _loadingService: LoadingService,
		private _socketService: SocketService,
	) {}

	ngOnInit(): void {
		const eventId = this._activedRoute.snapshot.paramMap.get('id');

		if (!eventId) {
			return;
		}

		this._socketService.socket.on('event:error', (response) => {
			const serializedResponse = response.description as string[];

			serializedResponse.forEach((errorDescription) => {
				this._alertService.pushWarning(errorDescription);
			});
		});

		this._socketService.socket.on('order:error', (response) => {
			const serializedResponse = response.description as string[];

			serializedResponse.forEach((errorDescription) => {
				this._alertService.pushWarning(errorDescription);
			});
		});

		this._socketService.socket.on('orders:refresh', (response) => {
			const serializedResponse = response as ApiResponseWrapper<EventOrder[]>;

			if (!serializedResponse.result || serializedResponse.result.length === 0) {
				this.pickedupOrders = [];
				this.cookingOrders = [];
				this.readyOrders = [];

				return;
			}

			for (const eventOrder of serializedResponse.result) {
				if (eventOrder.status === OrderStatus.PICKED_UP) {
					if (this._hasOrder(eventOrder, this.cookingOrders)) {
						this._removeOrder(eventOrder, this.cookingOrders);
					}

					if (this._hasOrder(eventOrder, this.readyOrders)) {
						this._removeOrder(eventOrder, this.readyOrders);
					}

					if (this._hasOrder(eventOrder, this.pickedupOrders) === false) {
						this.pickedupOrders.unshift(eventOrder);
					}

					continue;
				}

				if (eventOrder.status === OrderStatus.COOKING) {
					if (this._hasOrder(eventOrder, this.pickedupOrders)) {
						this._removeOrder(eventOrder, this.pickedupOrders);
					}

					if (this._hasOrder(eventOrder, this.readyOrders)) {
						this._removeOrder(eventOrder, this.readyOrders);
					}

					if (this._hasOrder(eventOrder, this.cookingOrders) === false) {
						this.cookingOrders.unshift(eventOrder);
					}

					continue;
				}

				if (eventOrder.status === OrderStatus.READY) {
					if (this._hasOrder(eventOrder, this.pickedupOrders)) {
						this._removeOrder(eventOrder, this.pickedupOrders);
					}

					if (this._hasOrder(eventOrder, this.cookingOrders)) {
						this._removeOrder(eventOrder, this.cookingOrders);
					}
					if (this._hasOrder(eventOrder, this.readyOrders) === false) {
						this.readyOrders.unshift(eventOrder);
					}

					continue;
				}
			}
		});

		this._eventService.selectedEvent.subscribe({
			next: (nextEvent) => {
				this.selectedEvent = nextEvent;

				this._loadingService.updateLoading(false);
			},
		});

		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.languageSource = nextLanguage;
			},
		});

		this._loadingService.loading.subscribe({
			next: (nextLoading) => {
				this.isLoading = nextLoading;
			},
		});

		this._socketService.socket.emit('event:join', eventId);
	}

	public displayProductAutocomplete(product: Product) {
		if (!product) {
			return '';
		}

		return product.name;
	}

	private _hasOrder(target: EventOrder, orderList: EventOrder[]): boolean {
		let hasEvent = false;

		for (const order of orderList) {
			if (order._id === target._id) {
				hasEvent = true;

				break;
			}
		}

		return hasEvent;
	}

	private _removeOrder(target: EventOrder, orderList: EventOrder[]) {
		const foundTargetIndex = orderList.findIndex((order) => order._id === target._id);

		if (foundTargetIndex === -1) {
			return;
		}

		orderList.splice(foundTargetIndex, 1);
	}
}
