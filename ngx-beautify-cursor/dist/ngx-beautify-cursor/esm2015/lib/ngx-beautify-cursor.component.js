import { __decorate } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { fromEvent, combineLatest } from 'rxjs';
import { tap, pluck, map, filter } from 'rxjs/operators';
import gsap from 'gsap';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import * as i0 from "@angular/core";
import * as i1 from "./services/windowref.service";
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
NgxBeautifyCursorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.5", ngImport: i0, type: NgxBeautifyCursorComponent, deps: [{ token: i1.BrowserWindowRef }], target: i0.ɵɵFactoryTarget.Component });
NgxBeautifyCursorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.1.5", type: NgxBeautifyCursorComponent, selector: "ngx-beautify-cursor", inputs: { cursorHoldAnimationDuration: "cursorHoldAnimationDuration", cursorHoldAnimationScaleDown: "cursorHoldAnimationScaleDown", cursorHoverAnimationDuration: "cursorHoverAnimationDuration", cursorHoverAnimationScaleUp: "cursorHoverAnimationScaleUp", defaultCursor: "defaultCursor", nParentsStyleCheck: "nParentsStyleCheck", zIndex: "zIndex", enableHoverAnimation: "enableHoverAnimation", hideDotWhileHover: "hideDotWhileHover", hoverAttributes: "hoverAttributes", circleSizePx: "circleSizePx", circleBorderSizePx: "circleBorderSizePx", circleFollowDuration: "circleFollowDuration", circleBorderColor: "circleBorderColor", circleBackgroundColor: "circleBackgroundColor", dotSizeInPx: "dotSizeInPx", dotFollowDuration: "dotFollowDuration", dotColor: "dotColor" }, viewQueries: [{ propertyName: "ngxBeautifyCursorCircle", first: true, predicate: ["ngxBeautifyCursorCircle"], descendants: true }, { propertyName: "ngxBeautifyCursorDot", first: true, predicate: ["ngxBeautifyCursorDot"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div #ngxBeautifyCursorCircle class="cursor-circle"></div>
    <div #ngxBeautifyCursorDot class="cursor-dot"></div>
  `, isInline: true, styles: ["div.cursor-circle,div.cursor-dot{--ngx-beautify-cursor--circle--BackgroundColor: hsla(245, 44%, 56%, .08);--ngx-beautify-cursor--circle--BorderColor: #6363af;--ngx-beautify-cursor--circle--BorderSize: 1px;--ngx-beautify-cursor--circle--Border: var(--ngx-beautify-cursor--circle--BorderSize) solid var(--ngx-beautify-cursor--circle--BorderColor);--ngx-beautify-cursor--circle--Size: 40px;--ngx-beautify-cursor--dot--BackgroundColor: hsla(245, 44%, 56%, 1);--ngx-beautify-cursor--dot--Size: 8px;--ngx-beautify-cursor--zindex: 999}::ng-deep *{--global--ngx-beautify-cursor: none;cursor:var(--global--ngx-beautify-cursor)}.cursor-circle{background-color:var(--ngx-beautify-cursor--circle--BackgroundColor);border:var(--ngx-beautify-cursor--circle--Border);width:var(--ngx-beautify-cursor--circle--Size);height:var(--ngx-beautify-cursor--circle--Size);z-index:var(--ngx-beautify-cursor--zindex);border-radius:50%;display:flex;align-items:center;justify-content:center;position:fixed;pointer-events:none;top:0;left:0}.cursor-dot{background-color:var(--ngx-beautify-cursor--dot--BackgroundColor);width:var(--ngx-beautify-cursor--dot--Size);height:var(--ngx-beautify-cursor--dot--Size);z-index:var(--ngx-beautify-cursor--zindex);display:flex;align-items:center;justify-content:center;border-radius:50%;position:fixed;pointer-events:none;top:0;left:0}\n"] });
NgxBeautifyCursorComponent = __decorate([
    UntilDestroy()
], NgxBeautifyCursorComponent);
export { NgxBeautifyCursorComponent };
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
        }], ctorParameters: function () { return [{ type: i1.BrowserWindowRef }]; }, propDecorators: { cursorHoldAnimationDuration: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJlYXV0aWZ5LWN1cnNvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYmVhdXRpZnktY3Vyc29yL3NyYy9saWIvbmd4LWJlYXV0aWZ5LWN1cnNvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWlCLEtBQUssRUFBRSxTQUFTLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RCxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7O0lBV3RELDBCQUEwQixTQUExQiwwQkFBMEI7SUFnRHJDLFlBQW9CLEVBQW9CO1FBQXBCLE9BQUUsR0FBRixFQUFFLENBQWtCO1FBOUMvQix3QkFBbUIsR0FBRyxXQUFXLENBQUM7UUFDbEMsZUFBVSxHQUFHLFFBQVEsQ0FBQztRQUUvQixlQUFlO1FBQ04sZ0NBQTJCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLGlDQUE0QixHQUFHLEdBQUcsQ0FBQztRQUNuQyxpQ0FBNEIsR0FBRyxHQUFHLENBQUM7UUFDbkMsZ0NBQTJCLEdBQUcsR0FBRyxDQUFDO1FBRWxDLGtCQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUN2QixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2IseUJBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQzVCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixvQkFBZSxHQUFhO1lBQ25DLE1BQU07WUFDTixJQUFJLENBQUMsVUFBVTtZQUNm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RyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQU1HLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBZWdDLHVCQUF1QjtzQkFBNUQsU0FBUzt1QkFBQyx5QkFBeUI7Z0JBQ0Qsb0JBQW9CO3NCQUF0RCxTQUFTO3VCQUFDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIGNvbWJpbmVMYXRlc3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YXAsIHBsdWNrLCBtYXAsIGZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtCcm93c2VyV2luZG93UmVmfSBmcm9tICcuL3NlcnZpY2VzL3dpbmRvd3JlZi5zZXJ2aWNlJztcbmltcG9ydCBnc2FwIGZyb20gJ2dzYXAnO1xuaW1wb3J0IHtVbnRpbERlc3Ryb3ksIHVudGlsRGVzdHJveWVkfSBmcm9tIFwiQG5nbmVhdC91bnRpbC1kZXN0cm95XCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1iZWF1dGlmeS1jdXJzb3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgI25neEJlYXV0aWZ5Q3Vyc29yQ2lyY2xlIGNsYXNzPVwiY3Vyc29yLWNpcmNsZVwiPjwvZGl2PlxuICAgIDxkaXYgI25neEJlYXV0aWZ5Q3Vyc29yRG90IGNsYXNzPVwiY3Vyc29yLWRvdFwiPjwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtYmVhdXRpZnktY3Vyc29yLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5AVW50aWxEZXN0cm95KClcbmV4cG9ydCBjbGFzcyBOZ3hCZWF1dGlmeUN1cnNvckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgcmVhZG9ubHkgREVGQVVMVF9IT1ZFUl9DTEFTUyA9ICdjbGlja2FibGUnO1xuICByZWFkb25seSBCVVRUT05fVEFHID0gJ2J1dHRvbic7XG5cbiAgLy9yZWdpb24gSW5wdXRzXG4gIEBJbnB1dCgpIGN1cnNvckhvbGRBbmltYXRpb25EdXJhdGlvbiA9IDAuMjU7XG4gIEBJbnB1dCgpIGN1cnNvckhvbGRBbmltYXRpb25TY2FsZURvd24gPSAwLjg7XG4gIEBJbnB1dCgpIGN1cnNvckhvdmVyQW5pbWF0aW9uRHVyYXRpb24gPSAwLjQ7XG4gIEBJbnB1dCgpIGN1cnNvckhvdmVyQW5pbWF0aW9uU2NhbGVVcCA9IDEuNTtcblxuICBASW5wdXQoKSBkZWZhdWx0Q3Vyc29yID0gJ25vbmUnO1xuICBASW5wdXQoKSBuUGFyZW50c1N0eWxlQ2hlY2sgPSA1O1xuICBASW5wdXQoKSB6SW5kZXggPSA5OTk7XG4gIEBJbnB1dCgpIGVuYWJsZUhvdmVyQW5pbWF0aW9uID0gdHJ1ZTtcbiAgQElucHV0KCkgaGlkZURvdFdoaWxlSG92ZXIgPSB0cnVlO1xuICBASW5wdXQoKSBob3ZlckF0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW1xuICAgICdocmVmJyxcbiAgICB0aGlzLkJVVFRPTl9UQUcsXG4gICAgdGhpcy5ERUZBVUxUX0hPVkVSX0NMQVNTXG4gIF07XG5cbiAgQElucHV0KCkgY2lyY2xlU2l6ZVB4ID0gNDA7XG4gIEBJbnB1dCgpIGNpcmNsZUJvcmRlclNpemVQeCA9IDE7XG4gIEBJbnB1dCgpIGNpcmNsZUZvbGxvd0R1cmF0aW9uID0gMC41O1xuICBASW5wdXQoKSBjaXJjbGVCb3JkZXJDb2xvciA9ICcjNjM2M2FmJztcbiAgQElucHV0KCkgY2lyY2xlQmFja2dyb3VuZENvbG9yID0gJ2hzbGEoMjQ1LCA0NCUsIDU2JSwgMC4wOCknO1xuXG4gIEBJbnB1dCgpIGRvdFNpemVJblB4ID0gODtcbiAgQElucHV0KCkgZG90Rm9sbG93RHVyYXRpb24gPSAwO1xuICBASW5wdXQoKSBkb3RDb2xvciA9ICdoc2xhKDI0NSwgNDQlLCA1NiUsIDEpJztcbiAgLy9lbmRyZWdpb25cblxuICAvL3JlZ2lvbiBzdGF0ZXNcbiAgcHVibGljIGlzSG92ZXIgPSBmYWxzZTtcbiAgcHVibGljIG9yaWdpbmFsQ2lyY2xlQmFja2dyb3VuZENvbG9yOiBzdHJpbmcgPSAnJztcbiAgcHVibGljIG9yaWdpbmFsQ2lyY2xlQm9yZGVyQ29sb3I6IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgb3JpZ2luYWxEb3RDb2xvcjogc3RyaW5nID0gJyc7XG4gIC8vZW5kcmVnaW9uXG5cbiAgcHVibGljIGN1cnNvckN1c3RvbUNsYXNzZXMgPSBbXG4gICAgJ25neC1iZWF1dGlmeS1jdXJzb3ItY2lyY2xlLWJnLWNvbG9yJyxcbiAgICAnbmd4LWJlYXV0aWZ5LWN1cnNvci1jaXJjbGUtYm9yZGVyLWNvbG9yJyxcbiAgICAnbmd4LWJlYXV0aWZ5LWN1cnNvci1kb3QtY29sb3InXTtcblxuICBAVmlld0NoaWxkKCduZ3hCZWF1dGlmeUN1cnNvckNpcmNsZScpIG5neEJlYXV0aWZ5Q3Vyc29yQ2lyY2xlPzogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbmd4QmVhdXRpZnlDdXJzb3JEb3QnKSBuZ3hCZWF1dGlmeUN1cnNvckRvdD86IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3cjogQnJvd3NlcldpbmRvd1JlZikge1xuXG4gICAgLy8gYmluZGluZ1xuICAgIHRoaXMuX21vdXNlRG93biA9IHRoaXMuX21vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX21vdXNlVXAgPSB0aGlzLl9tb3VzZVVwLmJpbmQodGhpcyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnNldFN0eWxlcygpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLndyLm5hdGl2ZVdpbmRvdykge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLnNldFN0eWxlcygpO1xuXG4gICAgICBjb25zdCBtb3VzZW1vdmUkID0gZnJvbUV2ZW50KHRoaXMud3IubmF0aXZlV2luZG93LCAnbW91c2Vtb3ZlJyk7XG4gICAgICB0aGlzLndyLm5hdGl2ZVdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9tb3VzZURvd24pO1xuICAgICAgdGhpcy53ci5uYXRpdmVXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX21vdXNlVXApO1xuXG4gICAgICBtb3VzZW1vdmUkLnBpcGUodW50aWxEZXN0cm95ZWQodGhpcykpLnN1YnNjcmliZSgoZTogYW55KSA9PiB7XG4gICAgICAgIHRoaXMubW92ZUN1cnNvcihlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdldEVsZW1lbnRzRmFtaWx5JCA9IG1vdXNlbW92ZSQucGlwZShcbiAgICAgICAgdW50aWxEZXN0cm95ZWQodGhpcyksXG4gICAgICAgIHBsdWNrKCdwYXRoJykgYXMgYW55LFxuICAgICAgICBmaWx0ZXIoKGZhbWlseTogSFRNTEVsZW1lbnRbXSkgPT4gZmFtaWx5ICYmIGZhbWlseS5sZW5ndGggPiAwKSxcbiAgICAgICAgbWFwKChmYW1pbHk6IEhUTUxFbGVtZW50W10pID0+IGZhbWlseS5zbGljZSgwLCB0aGlzLm5QYXJlbnRzU3R5bGVDaGVjaykpXG4gICAgICApO1xuXG4gICAgICAvLyByZWdpb24gQ3VzdG9tIHN0eWxlIGRldGVjdGlvblxuICAgICAgY29uc3QgZ2V0RWxlbWVudHNBdHRycyQgPSBnZXRFbGVtZW50c0ZhbWlseSQucGlwZShcbiAgICAgICAgbWFwKChkYXRhOiBIVE1MRWxlbWVudFtdKSA9PlxuICAgICAgICAgIGRhdGEucmVkdWNlKChhY2M6IGFueVtdLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgIGFjYy5wdXNoKE9iamVjdC52YWx1ZXMoaXRlbS5hdHRyaWJ1dGVzKS5maWx0ZXIoKGF0dHI6IGFueSkgPT4gdGhpcy5jdXJzb3JDdXN0b21DbGFzc2VzLmluZGV4T2YoYXR0ci5uYW1lKSAhPT0gLTEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfSwgW10pKSk7XG5cbiAgICAgIGNvbnN0IGFwcGx5U3R5bGVzRnJvbUF0dHIkID0gZ2V0RWxlbWVudHNBdHRycyQucGlwZShcbiAgICAgICAgdGFwKChfKSA9PiB0aGlzLnJlbW92ZUNsYXNzKCkpLFxuICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4gZGF0YS5mbGF0KCkpLFxuICAgICAgICBmaWx0ZXIoKGFycmF5QXR0cjogYW55W10pID0+IGFycmF5QXR0ci5sZW5ndGggPiAwKSxcbiAgICAgICAgdGFwKChhcnJheUF0dHI6IGFueVtdKSA9PiB7XG4gICAgICAgICAgYXJyYXlBdHRyLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgdGhpcy5hcHBseUN1c3RvbURpdlN0eWxlKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgY29tYmluZUxhdGVzdChcbiAgICAgICAgbW91c2Vtb3ZlJCxcbiAgICAgICAgZ2V0RWxlbWVudHNBdHRycyQsXG4gICAgICAgIGFwcGx5U3R5bGVzRnJvbUF0dHIkXG4gICAgICApXG4gICAgICAgIC5waXBlKHVudGlsRGVzdHJveWVkKHRoaXMpKVxuICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICAvL2VuZHJlZ2lvblxuXG4gICAgICAvLyByZWdpb24gSG92ZXIgZGV0ZWN0aW9uXG4gICAgICBpZiAodGhpcy5lbmFibGVIb3ZlckFuaW1hdGlvbikge1xuICAgICAgICBjb25zdCBmaW5kSG92ZXJBdHRycyQgPSBnZXRFbGVtZW50c0ZhbWlseSQucGlwZShcbiAgICAgICAgICBtYXAoKGl0ZW1zOiBIVE1MRWxlbWVudFtdKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXMuZmluZEluZGV4KChpdGVtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhvdmVyT25UYWcgPSB0aGlzLmhvdmVyQXR0cmlidXRlcy5pbmRleE9mKGl0ZW0udGFnTmFtZT8udG9Mb3dlckNhc2UoKSkgIT09IC0xO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhvdmVyT25DbGFzcyA9IGl0ZW0uY2xhc3NMaXN0ID9cbiAgICAgICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoaXRlbS5jbGFzc0xpc3QpXG4gICAgICAgICAgICAgICAgICAgID8uZmlsdGVyKChjbGFzc05hbWU6IHN0cmluZykgPT4gdGhpcy5ob3ZlckF0dHJpYnV0ZXMuaW5kZXhPZihjbGFzc05hbWUpICE9PSAtMSkubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG92ZXJPblRhZyB8fCBob3Zlck9uQ2xhc3M7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSAhPT0gLTE7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBhcHBseUhvdmVyJCA9IGZpbmRIb3ZlckF0dHJzJC5waXBlKFxuICAgICAgICAgIHVudGlsRGVzdHJveWVkKHRoaXMpLFxuICAgICAgICAgIGZpbHRlcigoc2hvdWxkSG92ZXI6IGJvb2xlYW4pID0+IHNob3VsZEhvdmVyICE9IHRoaXMuaXNIb3ZlciksXG4gICAgICAgICAgdGFwKHNob3VsZEhvdmVyID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNIb3ZlciA9IHNob3VsZEhvdmVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNIb3Zlcikge1xuICAgICAgICAgICAgICB0aGlzLl9vbkhvdmVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9sZWF2ZUhvdmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIG1vdXNlbW92ZSQsXG4gICAgICAgICAgZmluZEhvdmVyQXR0cnMkLFxuICAgICAgICAgIGFwcGx5SG92ZXIkXG4gICAgICAgIClcbiAgICAgICAgICAucGlwZSh1bnRpbERlc3Ryb3llZCh0aGlzKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICAvL2VuZHJlZ2lvblxuICAgIH1cblxuICAgIHRoaXMuX3Nob3dDdXJzb3JGaXJzdFRpbWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm9yaWdpbmFsQ2lyY2xlQmFja2dyb3VuZENvbG9yID0gdGhpcy5jaXJjbGVCYWNrZ3JvdW5kQ29sb3I7XG4gICAgdGhpcy5vcmlnaW5hbENpcmNsZUJvcmRlckNvbG9yID0gdGhpcy5jaXJjbGVCb3JkZXJDb2xvcjtcbiAgICB0aGlzLm9yaWdpbmFsRG90Q29sb3IgPSB0aGlzLmRvdENvbG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUN1c3RvbURpdlN0eWxlKGl0ZW06IGFueSk6IHZvaWQge1xuICAgIHN3aXRjaCAoaXRlbS5uYW1lKSB7XG4gICAgICBjYXNlICduZ3gtYmVhdXRpZnktY3Vyc29yLWNpcmNsZS1iZy1jb2xvcic6XG4gICAgICAgIHRoaXMuY2lyY2xlQmFja2dyb3VuZENvbG9yID0gaXRlbS52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICduZ3gtYmVhdXRpZnktY3Vyc29yLWNpcmNsZS1ib3JkZXItY29sb3InOlxuICAgICAgICB0aGlzLmNpcmNsZUJvcmRlckNvbG9yID0gaXRlbS52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICduZ3gtYmVhdXRpZnktY3Vyc29yLWRvdC1jb2xvcic6XG4gICAgICAgIHRoaXMuZG90Q29sb3IgPSBpdGVtLnZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5zZXRTdHlsZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ2xhc3MoKTogdm9pZCB7XG4gICAgdGhpcy5jaXJjbGVCYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLm9yaWdpbmFsQ2lyY2xlQmFja2dyb3VuZENvbG9yO1xuICAgIHRoaXMuY2lyY2xlQm9yZGVyQ29sb3IgPSB0aGlzLm9yaWdpbmFsQ2lyY2xlQm9yZGVyQ29sb3I7XG4gICAgdGhpcy5kb3RDb2xvciA9IHRoaXMub3JpZ2luYWxEb3RDb2xvcjtcbiAgICB0aGlzLnNldFN0eWxlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlQ3Vyc29yKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgLyoqXG4gICAgICogTW92ZSBjdXJzb3IoZG90ICYgY2lyY2xlKSB0byB0aGUgcG9pbnRlciBjZW50ZXJcbiAgICAgKi9cbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5kb3RTaXplSW5QeCAvIDI7XG4gICAgZ3NhcC50byh0aGlzLm5neEJlYXV0aWZ5Q3Vyc29yRG90Py5uYXRpdmVFbGVtZW50LCB7XG4gICAgICB4OiB4IC0gb2Zmc2V0LFxuICAgICAgeTogeSAtIG9mZnNldCxcbiAgICAgIHJvdGF0aW9uOiAwLjAxLFxuICAgICAgZHVyYXRpb246IHRoaXMuZG90Rm9sbG93RHVyYXRpb25cbiAgICB9KTtcblxuICAgIG9mZnNldCA9IHRoaXMuY2lyY2xlU2l6ZVB4IC8gMiArIHRoaXMuY2lyY2xlQm9yZGVyU2l6ZVB4O1xuICAgIGdzYXAudG8odGhpcy5uZ3hCZWF1dGlmeUN1cnNvckNpcmNsZT8ubmF0aXZlRWxlbWVudCwge1xuICAgICAgeDogeCAtIG9mZnNldCxcbiAgICAgIHk6IHkgLSBvZmZzZXQsXG4gICAgICByb3RhdGlvbjogMC4wMSxcbiAgICAgIGR1cmF0aW9uOiB0aGlzLmNpcmNsZUZvbGxvd0R1cmF0aW9uXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9tb3VzZURvd24oKSB7XG4gICAgaWYgKHRoaXMuaXNIb3Zlcikge1xuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIHRoaXMubmd4QmVhdXRpZnlDdXJzb3JDaXJjbGU/Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHtzY2FsZTogdGhpcy5jdXJzb3JIb3ZlckFuaW1hdGlvblNjYWxlVXB9LFxuICAgICAgICB7XG4gICAgICAgICAgc2NhbGU6IHRoaXMuY3Vyc29ySG9sZEFuaW1hdGlvblNjYWxlRG93biAqIHRoaXMuY3Vyc29ySG92ZXJBbmltYXRpb25TY2FsZVVwLFxuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLmN1cnNvckhvbGRBbmltYXRpb25EdXJhdGlvblxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgdGhpcy5uZ3hCZWF1dGlmeUN1cnNvckNpcmNsZT8ubmF0aXZlRWxlbWVudCxcbiAgICAgICAge3NjYWxlOiAxfSxcbiAgICAgICAge3NjYWxlOiB0aGlzLmN1cnNvckhvbGRBbmltYXRpb25TY2FsZURvd24sIGR1cmF0aW9uOiB0aGlzLmN1cnNvckhvbGRBbmltYXRpb25EdXJhdGlvbn1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbW91c2VVcCgpIHtcbiAgICBpZiAodGhpcy5pc0hvdmVyKSB7XG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgdGhpcy5uZ3hCZWF1dGlmeUN1cnNvckNpcmNsZT8ubmF0aXZlRWxlbWVudCxcbiAgICAgICAge3NjYWxlOiB0aGlzLmN1cnNvckhvbGRBbmltYXRpb25TY2FsZURvd24gKiB0aGlzLmN1cnNvckhvdmVyQW5pbWF0aW9uU2NhbGVVcH0sXG4gICAgICAgIHtzY2FsZTogdGhpcy5jdXJzb3JIb3ZlckFuaW1hdGlvblNjYWxlVXAsIGR1cmF0aW9uOiB0aGlzLmN1cnNvckhvbGRBbmltYXRpb25EdXJhdGlvbn1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICB0aGlzLm5neEJlYXV0aWZ5Q3Vyc29yQ2lyY2xlPy5uYXRpdmVFbGVtZW50LFxuICAgICAgICB7c2NhbGU6IHRoaXMuY3Vyc29ySG9sZEFuaW1hdGlvblNjYWxlRG93bn0sXG4gICAgICAgIHtzY2FsZTogMSwgZHVyYXRpb246IHRoaXMuY3Vyc29ySG9sZEFuaW1hdGlvbkR1cmF0aW9ufVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9sZWF2ZUhvdmVyKCkge1xuICAgIGlmICh0aGlzLmhpZGVEb3RXaGlsZUhvdmVyKSBnc2FwLnRvKHRoaXMubmd4QmVhdXRpZnlDdXJzb3JEb3Q/Lm5hdGl2ZUVsZW1lbnQsIHtzY2FsZTogMSwgZHVyYXRpb246IDAuMn0pO1xuICAgIGdzYXAudG8odGhpcy5uZ3hCZWF1dGlmeUN1cnNvckNpcmNsZT8ubmF0aXZlRWxlbWVudCwge3NjYWxlOiAxLCBkdXJhdGlvbjogdGhpcy5jdXJzb3JIb3ZlckFuaW1hdGlvbkR1cmF0aW9ufSk7XG4gIH1cblxuICBwcml2YXRlIF9vbkhvdmVyKCkge1xuICAgIGlmICh0aGlzLmhpZGVEb3RXaGlsZUhvdmVyKSBnc2FwLnRvKHRoaXMubmd4QmVhdXRpZnlDdXJzb3JEb3Q/Lm5hdGl2ZUVsZW1lbnQsIHtzY2FsZTogMCwgZHVyYXRpb246IDAuMn0pO1xuICAgIGdzYXAudG8odGhpcy5uZ3hCZWF1dGlmeUN1cnNvckNpcmNsZT8ubmF0aXZlRWxlbWVudCwge1xuICAgICAgc2NhbGU6IHRoaXMuY3Vyc29ySG92ZXJBbmltYXRpb25TY2FsZVVwLFxuICAgICAgZHVyYXRpb246IHRoaXMuY3Vyc29ySG92ZXJBbmltYXRpb25EdXJhdGlvblxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5uZ3hCZWF1dGlmeUN1cnNvckNpcmNsZT8ubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICctLW5neC1iZWF1dGlmeS1jdXJzb3ItLWNpcmNsZS0tQmFja2dyb3VuZENvbG9yJyxcbiAgICAgIHRoaXMuY2lyY2xlQmFja2dyb3VuZENvbG9yXG4gICAgKTtcbiAgICB0aGlzLm5neEJlYXV0aWZ5Q3Vyc29yQ2lyY2xlPy5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgJy0tbmd4LWJlYXV0aWZ5LWN1cnNvci0tY2lyY2xlLS1Cb3JkZXJDb2xvcicsXG4gICAgICB0aGlzLmNpcmNsZUJvcmRlckNvbG9yXG4gICAgKTtcbiAgICB0aGlzLm5neEJlYXV0aWZ5Q3Vyc29yQ2lyY2xlPy5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgJy0tbmd4LWJlYXV0aWZ5LWN1cnNvci0tY2lyY2xlLS1TaXplJyxcbiAgICAgIGAke3RoaXMuY2lyY2xlU2l6ZVB4fXB4YFxuICAgICk7XG5cbiAgICB0aGlzLm5neEJlYXV0aWZ5Q3Vyc29yRG90Py5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgJy0tbmd4LWJlYXV0aWZ5LWN1cnNvci0temluZGV4JyxcbiAgICAgIGAke3RoaXMuekluZGV4fWBcbiAgICApO1xuICAgIHRoaXMubmd4QmVhdXRpZnlDdXJzb3JDaXJjbGU/Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAnLS1uZ3gtYmVhdXRpZnktY3Vyc29yLS16aW5kZXgnLFxuICAgICAgYCR7dGhpcy56SW5kZXh9YFxuICAgICk7XG5cbiAgICB0aGlzLm5neEJlYXV0aWZ5Q3Vyc29yRG90Py5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgJy0tbmd4LWJlYXV0aWZ5LWN1cnNvci0tZG90LS1TaXplJyxcbiAgICAgIGAke3RoaXMuZG90U2l6ZUluUHh9cHhgXG4gICAgKTtcbiAgICB0aGlzLm5neEJlYXV0aWZ5Q3Vyc29yRG90Py5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgJy0tbmd4LWJlYXV0aWZ5LWN1cnNvci0tZG90LS1CYWNrZ3JvdW5kQ29sb3InLFxuICAgICAgdGhpcy5kb3RDb2xvclxuICAgICk7XG5cbiAgICBpZiAodGhpcy53ci5uYXRpdmVXaW5kb3cpIHtcbiAgICAgIHRoaXMud3IubmF0aXZlV2luZG93LmRvY3VtZW50LmJvZHkuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICctLWdsb2JhbC0tbmd4LWJlYXV0aWZ5LWN1cnNvcicsXG4gICAgICAgIHRoaXMuZGVmYXVsdEN1cnNvclxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zaG93Q3Vyc29yRmlyc3RUaW1lKCkge1xuICAgIGdzYXAudG8odGhpcy5uZ3hCZWF1dGlmeUN1cnNvckRvdD8ubmF0aXZlRWxlbWVudCwge29wYWNpdHk6IDEsIHNjYWxlOiAxLCBkdXJhdGlvbjogMC43fSk7XG4gICAgZ3NhcC50byh0aGlzLm5neEJlYXV0aWZ5Q3Vyc29yQ2lyY2xlPy5uYXRpdmVFbGVtZW50LCB7b3BhY2l0eTogMSwgc2NhbGU6IDEsIGR1cmF0aW9uOiAwLjd9KTtcbiAgfVxufVxuIl19