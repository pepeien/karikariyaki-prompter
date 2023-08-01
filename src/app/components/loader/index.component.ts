import { Component, OnInit } from '@angular/core';

// Animation
import { AutomaticAnimation, BasicAnimations } from '@animations';

// Services
import { LoadingService } from '@services';

@Component({
    selector: 'app-loader',
    templateUrl: './index.component.html',
    animations: [AutomaticAnimation.slideInOut, BasicAnimations.breatheAnimation],
})
export class LoaderComponent implements OnInit {
    /**
     * Primitives
     */
    public isLoading = false;

    /**
     * Animations
     */
    public logoBreatheAnimationState: 'inhale' | 'exhale' = 'inhale';

    constructor(private _loadingService: LoadingService) {}

    ngOnInit(): void {
        this._loadingService.loading.subscribe({
            next: (nextLoading) => {
                this.isLoading = nextLoading;
            },
        });
    }

    public onLogoBreatheAnimationDone() {
        if (this.isLoading === false) {
            this.logoBreatheAnimationState = 'inhale';

            return;
        }

        this.logoBreatheAnimationState =
            this.logoBreatheAnimationState === 'inhale' ? 'exhale' : 'inhale';
    }
}
