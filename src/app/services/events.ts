import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'karikarihelper';

@Injectable({ providedIn: 'root' })
export class EventsService {
    private _eventSubject: BehaviorSubject<Event | null>;
    private _eventObersavable: Observable<Event | null>;

    private _eventsSubject: BehaviorSubject<Event[]>;
    private _eventsObersavable: Observable<Event[]>;

    constructor() {
        this._eventSubject = new BehaviorSubject<Event | null>(null);
        this._eventObersavable = this._eventSubject.asObservable();

        this._eventsSubject = new BehaviorSubject<Event[]>([]);
        this._eventsObersavable = this._eventsSubject.asObservable();
    }

    public get selectedEvent() {
        return this._eventObersavable;
    }

    public updateSelectedEvent(nextEvent: Event | null) {
        this._eventSubject.next(nextEvent);
    }

    public get availableEvents() {
        return this._eventsObersavable;
    }

    public updateAvailableEvents(nextEvents: Event[]) {
        this._eventsSubject.next(nextEvents);
    }
}
