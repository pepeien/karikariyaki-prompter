import { Component, OnInit } from '@angular/core';
import { Langs, Operator } from 'karikarihelper';

// Service
import { LanguageService, LoadingService, OperatorService } from '@services';

// Animations
import { AutomaticAnimation, BasicAnimations, LoggedNavbarAnimation } from '@animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [BasicAnimations.breatheAnimation, AutomaticAnimation.slideInOut],
})
export class AppComponent implements OnInit {
    /**
     * Primitivers
     */
    public isLoggedIn = false;

    /**
     * Language
     */
    public selectedLanguage = LanguageService.DEFAULT_LANGUAGE;

    /**
     * In House
     */
    public langList = Langs;
    public operator: Operator | null = null;

    constructor(
        private _languageService: LanguageService,
        private _operatorService: OperatorService,
    ) {}

    ngOnInit(): void {
        this._languageService.language.subscribe({
            next: (nextLanguage) => {
                this.selectedLanguage = nextLanguage;
            },
        });

        this._operatorService.operator.subscribe({
            next: (currentOperator) => {
                if (!currentOperator) {
                    this.isLoggedIn = false;

                    return;
                }

                this.isLoggedIn = true;

                this.operator = currentOperator;
            },
            error: () => {
                this.isLoggedIn = false;
            },
        });
    }
}
