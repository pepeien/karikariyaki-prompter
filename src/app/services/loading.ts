import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Automatic
import { AutomaticAnimation } from '../animations/automatic';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private _loadingSubject: BehaviorSubject<boolean>;
    private _loadingObersavable: Observable<boolean>;

    constructor() {
        this._loadingSubject = new BehaviorSubject<boolean>(true);
        this._loadingObersavable = this._loadingSubject.asObservable();
    }

    public get loading() {
        return this._loadingObersavable;
    }

    public updateLoading(nextLoading: boolean) {
        this._loadingSubject.next(nextLoading);
    }
}
