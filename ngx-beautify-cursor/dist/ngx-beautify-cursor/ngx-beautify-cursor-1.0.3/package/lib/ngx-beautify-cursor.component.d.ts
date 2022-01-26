import { AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { BrowserWindowRef } from './services/windowref.service';
import * as i0 from "@angular/core";
export declare class NgxBeautifyCursorComponent implements AfterViewInit, OnChanges {
    private wr;
    readonly DEFAULT_HOVER_CLASS = "clickable";
    readonly BUTTON_TAG = "button";
    cursorHoldAnimationDuration: number;
    cursorHoldAnimationScaleDown: number;
    cursorHoverAnimationDuration: number;
    cursorHoverAnimationScaleUp: number;
    defaultCursor: string;
    nParentsStyleCheck: number;
    zIndex: number;
    enableHoverAnimation: boolean;
    hideDotWhileHover: boolean;
    hoverAttributes: string[];
    circleSizePx: number;
    circleBorderSizePx: number;
    circleFollowDuration: number;
    circleBorderColor: string;
    circleBackgroundColor: string;
    dotSizeInPx: number;
    dotFollowDuration: number;
    dotColor: string;
    isHover: boolean;
    originalCircleBackgroundColor: string;
    originalCircleBorderColor: string;
    originalDotColor: string;
    cursorCustomClasses: string[];
    ngxBeautifyCursorCircle?: ElementRef;
    ngxBeautifyCursorDot?: ElementRef;
    constructor(wr: BrowserWindowRef);
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    private init;
    private applyCustomDivStyle;
    private removeClass;
    private moveCursor;
    private _mouseDown;
    private _mouseUp;
    private _leaveHover;
    private _onHover;
    private setStyles;
    private _showCursorFirstTime;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxBeautifyCursorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxBeautifyCursorComponent, "ngx-beautify-cursor", never, { "cursorHoldAnimationDuration": "cursorHoldAnimationDuration"; "cursorHoldAnimationScaleDown": "cursorHoldAnimationScaleDown"; "cursorHoverAnimationDuration": "cursorHoverAnimationDuration"; "cursorHoverAnimationScaleUp": "cursorHoverAnimationScaleUp"; "defaultCursor": "defaultCursor"; "nParentsStyleCheck": "nParentsStyleCheck"; "zIndex": "zIndex"; "enableHoverAnimation": "enableHoverAnimation"; "hideDotWhileHover": "hideDotWhileHover"; "hoverAttributes": "hoverAttributes"; "circleSizePx": "circleSizePx"; "circleBorderSizePx": "circleBorderSizePx"; "circleFollowDuration": "circleFollowDuration"; "circleBorderColor": "circleBorderColor"; "circleBackgroundColor": "circleBackgroundColor"; "dotSizeInPx": "dotSizeInPx"; "dotFollowDuration": "dotFollowDuration"; "dotColor": "dotColor"; }, {}, never, never>;
}
