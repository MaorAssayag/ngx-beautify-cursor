import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { PLATFORM_ID, Injectable, Inject, Component, Input, ViewChild, NgModule } from '@angular/core';
import { fromEvent, combineLatest } from 'rxjs';
import { pluck, filter, map, tap } from 'rxjs/operators';
import gsap from 'gsap';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { isPlatformBrowser } from '@angular/common';

class BrowserWindowRef {
    constructor(platformId) {
        this.platformId = platformId;
    }
    get nativeWindow() {
        if (isPlatformBrowser(this.platformId)) {
            return this.windowRef();
        }
        return false;
    }
    windowRef() {
        return window;
    }
}
BrowserWindowRef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: BrowserWindowRef, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
BrowserWindowRef.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: BrowserWindowRef, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: BrowserWindowRef, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });

let NgxBeautifyCursorComponent = class NgxBeautifyCursorComponent {
    constructor(wr) {
        this.wr = wr;
        this.DEFAULT_HOVER_CLASS = 'clickable';
        this.BUTTON_TAG = 'button';
        //region Inputs
        this.cursorHoldAnimationDuration = 0.25;
        this.cursorHoldAnimationScaleDown = 0.8;
        this.cursorHoverAnimationDuration = 0.4;
        this.cursorHoverAnimationScaleUp = 1.5;
        this.defaultCursor = 'none';
        this.nParentsStyleCheck = 5;
        this.zIndex = 999;
        this.enableHoverAnimation = true;
        this.hideDotWhileHover = true;
        this.hoverAttributes = [
            'href',
            this.BUTTON_TAG,
            this.DEFAULT_HOVER_CLASS
        ];
        this.circleSizePx = 40;
        this.circleBorderSizePx = 1;
        this.circleFollowDuration = 0.5;
        this.circleBorderColor = '#6363af';
        this.circleBackgroundColor = 'hsla(245, 44%, 56%, 0.08)';
        this.dotSizeInPx = 8;
        this.dotFollowDuration = 0;
        this.dotColor = 'hsla(245, 44%, 56%, 1)';
        //endregion
        //region states
        this.isHover = false;
        this.originalCircleBackgroundColor = '';
        this.originalCircleBorderColor = '';
        this.originalDotColor = '';
        //endregion
        this.cursorCustomClasses = [
            'ngx-beautify-cursor-circle-bg-color',
            'ngx-beautify-cursor-circle-border-color',
            'ngx-beautify-cursor-dot-color'
        ];
        // binding
        this._mouseDown = this._mouseDown.bind(this);
        this._mouseUp = this._mouseUp.bind(this);
    }
    ngOnChanges() {
        this.setStyles();
    }
    ngAfterViewInit() {
        if (this.wr.nativeWindow) {
            this.init();
            this.setStyles();
            const mousemove$ = fromEvent(this.wr.nativeWindow, 'mousemove');
            this.wr.nativeWindow.addEventListener('mousedown', this._mouseDown);
            this.wr.nativeWindow.addEventListener('mouseup', this._mouseUp);
            mousemove$.pipe(untilDestroyed(this)).subscribe((e) => {
                this.moveCursor(e.clientX, e.clientY);
            });
            const getElementsFamily$ = mousemove$.pipe(untilDestroyed(this), pluck('path'), filter((family) => family && family.length > 0), map((family) => family.slice(0, this.nParentsStyleCheck)));
            // region Custom style detection
            const getElementsAttrs$ = getElementsFamily$.pipe(map((data) => data.reduce((acc, item) => {
                if (item.attributes) {
                    acc.push(Object.values(item.attributes).filter((attr) => this.cursorCustomClasses.indexOf(attr.name) !== -1));
                }
                return acc;
            }, [])));
            const applyStylesFromAttr$ = getElementsAttrs$.pipe(tap((_) => this.removeClass()), map((data) => data.flat()), filter((arrayAttr) => arrayAttr.length > 0), tap((arrayAttr) => {
                arrayAttr.map((item) => {
                    if (item) {
                        this.applyCustomDivStyle(item);
                    }
                });
            }));
            combineLatest(mousemove$, getElementsAttrs$, applyStylesFromAttr$)
                .pipe(untilDestroyed(this))
                .subscribe();
            //endregion
            // region Hover detection
            if (this.enableHoverAnimation) {
                const findHoverAttrs$ = getElementsFamily$.pipe(map((items) => {
                    return items.findIndex((item) => {
                        var _a, _b;
                        if (item) {
                            const hoverOnTag = this.hoverAttributes.indexOf((_a = item.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== -1;
                            const hoverOnClass = item.classList ?
                                ((_b = Object.values(item.classList)) === null || _b === void 0 ? void 0 : _b.filter((className) => this.hoverAttributes.indexOf(className) !== -1).length) > 0
                                : false;
                            return hoverOnTag || hoverOnClass;
                        }
                        else {
                            return false;
                        }
                    }) !== -1;
                }));
                const applyHover$ = findHoverAttrs$.pipe(untilDestroyed(this), filter((shouldHover) => shouldHover != this.isHover), tap(shouldHover => {
                    this.isHover = shouldHover;
                    if (this.isHover) {
                        this._onHover();
                    }
                    else {
                        this._leaveHover();
                    }
                }));
                combineLatest(mousemove$, findHoverAttrs$, applyHover$)
                    .pipe(untilDestroyed(this))
                    .subscribe();
            }
            //endregion
        }
        this._showCursorFirstTime();
    }
    init() {
        this.originalCircleBackgroundColor = this.circleBackgroundColor;
        this.originalCircleBorderColor = this.circleBorderColor;
        this.originalDotColor = this.dotColor;
    }
    applyCustomDivStyle(item) {
        switch (item.name) {
            case 'ngx-beautify-cursor-circle-bg-color':
                this.circleBackgroundColor = item.value;
                break;
            case 'ngx-beautify-cursor-circle-border-color':
                this.circleBorderColor = item.value;
                break;
            case 'ngx-beautify-cursor-dot-color':
                this.dotColor = item.value;
                break;
        }
        this.setStyles();
    }
    removeClass() {
        this.circleBackgroundColor = this.originalCircleBackgroundColor;
        this.circleBorderColor = this.originalCircleBorderColor;
        this.dotColor = this.originalDotColor;
        this.setStyles();
    }
    moveCursor(x, y) {
        var _a, _b;
        /**
         * Move cursor(dot & circle) to the pointer center
         */
        let offset = this.dotSizeInPx / 2;
        gsap.to((_a = this.ngxBeautifyCursorDot) === null || _a === void 0 ? void 0 : _a.nativeElement, {
            x: x - offset,
            y: y - offset,
            rotation: 0.01,
            duration: this.dotFollowDuration
        });
        offset = this.circleSizePx / 2 + this.circleBorderSizePx;
        gsap.to((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, {
            x: x - offset,
            y: y - offset,
            rotation: 0.01,
            duration: this.circleFollowDuration
        });
    }
    _mouseDown() {
        var _a, _b;
        if (this.isHover) {
            gsap.fromTo((_a = this.ngxBeautifyCursorCircle) === null || _a === void 0 ? void 0 : _a.nativeElement, { scale: this.cursorHoverAnimationScaleUp }, {
                scale: this.cursorHoldAnimationScaleDown * this.cursorHoverAnimationScaleUp,
                duration: this.cursorHoldAnimationDuration
            });
        }
        else {
            gsap.fromTo((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, { scale: 1 }, { scale: this.cursorHoldAnimationScaleDown, duration: this.cursorHoldAnimationDuration });
        }
    }
    _mouseUp() {
        var _a, _b;
        if (this.isHover) {
            gsap.fromTo((_a = this.ngxBeautifyCursorCircle) === null || _a === void 0 ? void 0 : _a.nativeElement, { scale: this.cursorHoldAnimationScaleDown * this.cursorHoverAnimationScaleUp }, { scale: this.cursorHoverAnimationScaleUp, duration: this.cursorHoldAnimationDuration });
        }
        else {
            gsap.fromTo((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, { scale: this.cursorHoldAnimationScaleDown }, { scale: 1, duration: this.cursorHoldAnimationDuration });
        }
    }
    _leaveHover() {
        var _a, _b;
        if (this.hideDotWhileHover)
            gsap.to((_a = this.ngxBeautifyCursorDot) === null || _a === void 0 ? void 0 : _a.nativeElement, { scale: 1, duration: 0.2 });
        gsap.to((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, { scale: 1, duration: this.cursorHoverAnimationDuration });
    }
    _onHover() {
        var _a, _b;
        if (this.hideDotWhileHover)
            gsap.to((_a = this.ngxBeautifyCursorDot) === null || _a === void 0 ? void 0 : _a.nativeElement, { scale: 0, duration: 0.2 });
        gsap.to((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, {
            scale: this.cursorHoverAnimationScaleUp,
            duration: this.cursorHoverAnimationDuration
        });
    }
    setStyles() {
        var _a, _b, _c, _d, _e, _f, _g;
        (_a = this.ngxBeautifyCursorCircle) === null || _a === void 0 ? void 0 : _a.nativeElement.style.setProperty('--ngx-beautify-cursor--circle--BackgroundColor', this.circleBackgroundColor);
        (_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement.style.setProperty('--ngx-beautify-cursor--circle--BorderColor', this.circleBorderColor);
        (_c = this.ngxBeautifyCursorCircle) === null || _c === void 0 ? void 0 : _c.nativeElement.style.setProperty('--ngx-beautify-cursor--circle--Size', `${this.circleSizePx}px`);
        (_d = this.ngxBeautifyCursorDot) === null || _d === void 0 ? void 0 : _d.nativeElement.style.setProperty('--ngx-beautify-cursor--zindex', `${this.zIndex}`);
        (_e = this.ngxBeautifyCursorCircle) === null || _e === void 0 ? void 0 : _e.nativeElement.style.setProperty('--ngx-beautify-cursor--zindex', `${this.zIndex}`);
        (_f = this.ngxBeautifyCursorDot) === null || _f === void 0 ? void 0 : _f.nativeElement.style.setProperty('--ngx-beautify-cursor--dot--Size', `${this.dotSizeInPx}px`);
        (_g = this.ngxBeautifyCursorDot) === null || _g === void 0 ? void 0 : _g.nativeElement.style.setProperty('--ngx-beautify-cursor--dot--BackgroundColor', this.dotColor);
        if (this.wr.nativeWindow) {
            this.wr.nativeWindow.document.body.style.setProperty('--global--ngx-beautify-cursor', this.defaultCursor);
        }
    }
    _showCursorFirstTime() {
        var _a, _b;
        gsap.to((_a = this.ngxBeautifyCursorDot) === null || _a === void 0 ? void 0 : _a.nativeElement, { opacity: 1, scale: 1, duration: 0.7 });
        gsap.to((_b = this.ngxBeautifyCursorCircle) === null || _b === void 0 ? void 0 : _b.nativeElement, { opacity: 1, scale: 1, duration: 0.7 });
    }
};
NgxBeautifyCursorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: NgxBeautifyCursorComponent, deps: [{ token: BrowserWindowRef }], target: i0.ɵɵFactoryTarget.Component });
NgxBeautifyCursorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.5", type: NgxBeautifyCursorComponent, selector: "ngx-beautify-cursor", inputs: { cursorHoldAnimationDuration: "cursorHoldAnimationDuration", cursorHoldAnimationScaleDown: "cursorHoldAnimationScaleDown", cursorHoverAnimationDuration: "cursorHoverAnimationDuration", cursorHoverAnimationScaleUp: "cursorHoverAnimationScaleUp", defaultCursor: "defaultCursor", nParentsStyleCheck: "nParentsStyleCheck", zIndex: "zIndex", enableHoverAnimation: "enableHoverAnimation", hideDotWhileHover: "hideDotWhileHover", hoverAttributes: "hoverAttributes", circleSizePx: "circleSizePx", circleBorderSizePx: "circleBorderSizePx", circleFollowDuration: "circleFollowDuration", circleBorderColor: "circleBorderColor", circleBackgroundColor: "circleBackgroundColor", dotSizeInPx: "dotSizeInPx", dotFollowDuration: "dotFollowDuration", dotColor: "dotColor" }, viewQueries: [{ propertyName: "ngxBeautifyCursorCircle", first: true, predicate: ["ngxBeautifyCursorCircle"], descendants: true }, { propertyName: "ngxBeautifyCursorDot", first: true, predicate: ["ngxBeautifyCursorDot"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #ngxBeautifyCursorCircle class="cursor-circle"></div>
    <div #ngxBeautifyCursorDot class="cursor-dot"></div>
  `, isInline: true, styles: ["div.cursor-circle,div.cursor-dot{--ngx-beautify-cursor--circle--BackgroundColor: hsla(245, 44%, 56%, .08);--ngx-beautify-cursor--circle--BorderColor: #6363af;--ngx-beautify-cursor--circle--BorderSize: 1px;--ngx-beautify-cursor--circle--Border: var(--ngx-beautify-cursor--circle--BorderSize) solid var(--ngx-beautify-cursor--circle--BorderColor);--ngx-beautify-cursor--circle--Size: 40px;--ngx-beautify-cursor--dot--BackgroundColor: hsla(245, 44%, 56%, 1);--ngx-beautify-cursor--dot--Size: 8px;--ngx-beautify-cursor--zindex: 999}::ng-deep *{--global--ngx-beautify-cursor: none;cursor:var(--global--ngx-beautify-cursor)}.cursor-circle{background-color:var(--ngx-beautify-cursor--circle--BackgroundColor);border:var(--ngx-beautify-cursor--circle--Border);width:var(--ngx-beautify-cursor--circle--Size);height:var(--ngx-beautify-cursor--circle--Size);z-index:var(--ngx-beautify-cursor--zindex);border-radius:50%;display:flex;align-items:center;justify-content:center;position:fixed;pointer-events:none;top:0;left:0}.cursor-dot{background-color:var(--ngx-beautify-cursor--dot--BackgroundColor);width:var(--ngx-beautify-cursor--dot--Size);height:var(--ngx-beautify-cursor--dot--Size);z-index:var(--ngx-beautify-cursor--zindex);display:flex;align-items:center;justify-content:center;border-radius:50%;position:fixed;pointer-events:none;top:0;left:0}\n"] });
NgxBeautifyCursorComponent = __decorate([
    UntilDestroy()
], NgxBeautifyCursorComponent);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: NgxBeautifyCursorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-beautify-cursor',
                    template: `
    <div #ngxBeautifyCursorCircle class="cursor-circle"></div>
    <div #ngxBeautifyCursorDot class="cursor-dot"></div>
  `,
                    styleUrls: ['./ngx-beautify-cursor.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: BrowserWindowRef }]; }, propDecorators: { cursorHoldAnimationDuration: [{
                type: Input
            }], cursorHoldAnimationScaleDown: [{
                type: Input
            }], cursorHoverAnimationDuration: [{
                type: Input
            }], cursorHoverAnimationScaleUp: [{
                type: Input
            }], defaultCursor: [{
                type: Input
            }], nParentsStyleCheck: [{
                type: Input
            }], zIndex: [{
                type: Input
            }], enableHoverAnimation: [{
                type: Input
            }], hideDotWhileHover: [{
                type: Input
            }], hoverAttributes: [{
                type: Input
            }], circleSizePx: [{
                type: Input
            }], circleBorderSizePx: [{
                type: Input
            }], circleFollowDuration: [{
                type: Input
            }], circleBorderColor: [{
                type: Input
            }], circleBackgroundColor: [{
                type: Input
            }], dotSizeInPx: [{
                type: Input
            }], dotFollowDuration: [{
                type: Input
            }], dotColor: [{
                type: Input
            }], ngxBeautifyCursorCircle: [{
                type: ViewChild,
                args: ['ngxBeautifyCursorCircle']
            }], ngxBeautifyCursorDot: [{
                type: ViewChild,
                args: ['ngxBeautifyCursorDot']
            }] } });

class NgxBeautifyCursorModule {
}
NgxBeautifyCursorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: NgxBeautifyCursorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxBeautifyCursorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: NgxBeautifyCursorModule, declarations: [NgxBeautifyCursorComponent], exports: [NgxBeautifyCursorComponent] });
NgxBeautifyCursorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: NgxBeautifyCursorModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: NgxBeautifyCursorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxBeautifyCursorComponent],
                    imports: [],
                    exports: [NgxBeautifyCursorComponent]
                }]
        }] });

/*
 * Public API Surface of ngx-beautify-cursor
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxBeautifyCursorComponent, NgxBeautifyCursorModule };
//# sourceMappingURL=ngx-beautify-cursor.js.map
