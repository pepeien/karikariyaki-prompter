import { Injectable } from '@angular/core';
import { ApiResponseWrapper } from 'karikarihelper';
import { io } from 'socket.io-client';
import { Event } from 'karikarihelper';

// Envs
import { environment } from 'src/environments/environment';

// Services
import { EventsService } from '.';

@Injectable({ providedIn: 'root' })
export class SocketService {
    /**
     * Primitives
     */
    private _wasSetup = false;

    /**
     * In House
     */
    private _socket = io(environment.wsURI, {
        path: environment.wsPath,
        withCredentials: true,
    });

    constructor(private _eventsService: EventsService) {}

    public get socket() {
        if (this._wasSetup === false) {
            this._setupSockets();
        }

        return this._socket;
    }

    private _setupSockets() {
        this._wasSetup = true;

        this._socket.on('events:refresh', (response) => {
            const serializedResponse = response as ApiResponseWrapper<Event[]>;

            this._eventsService.updateAvailableEvents(serializedResponse.result ?? []);
        });

        this._socket.on('event:refresh', (response) => {
            const serializedResponse = response as ApiResponseWrapper<Event>;

            this._eventsService.updateSelectedEvent(serializedResponse.result ?? null);
        });
    }
}
