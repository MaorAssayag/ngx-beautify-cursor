import {Component, AfterViewInit, Input, ViewChild, ElementRef, OnChanges} from '@angular/core';
import {fromEvent, combineLatest} from 'rxjs';
import {tap, pluck, map, filter} from 'rxjs/operators';
import {BrowserWindowRef} from './services/windowref.service';
import gsap from 'gsap';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@Component({
  selector: 'ngx-beautify-cursor',
  template: `
    <div #ngxBeautifyCursorCircle class="cursor-circle"></div>
    <div #ngxBeautifyCursorDot class="cursor-dot"></div>
  `,
  styleUrls: ['./ngx-beautify-cursor.component.scss']
})
@UntilDestroy()
export class NgxBeautifyCursorComponent implements AfterViewInit, OnChanges {

  readonly DEFAULT_HOVER_CLASS = 'clickable';
  readonly BUTTON_TAG = 'button';

  //region Inputs
  @Input() cursorHoldAnimationDuration = 0.25;
  @Input() cursorHoldAnimationScaleDown = 0.8;
  @Input() cursorHoverAnimationDuration = 0.4;
  @Input() cursorHoverAnimationScaleUp = 1.5;

  @Input() defaultCursor = 'none';
  @Input() nParentsStyleCheck = 5;
  @Input() zIndex = 999;
  @Input() enableHoverAnimation = true;
  @Input() hideDotWhileHover = true;
  @Input() hoverAttributes: string[] = [
    'href',
    this.BUTTON_TAG,
    this.DEFAULT_HOVER_CLASS
  ];

  @Input() circleSizePx = 40;
  @Input() circleBorderSizePx = 1;
  @Input() circleFollowDuration = 0.5;
  @Input() circleBorderColor = '#6363af';
  @Input() circleBackgroundColor = 'hsla(245, 44%, 56%, 0.08)';

  @Input() dotSizeInPx = 8;
  @Input() dotFollowDuration = 0;
  @Input() dotColor = 'hsla(245, 44%, 56%, 1)';
  //endregion

  //region states
  public isHover = false;
  public originalCircleBackgroundColor: string = '';
  public originalCircleBorderColor: string = '';
  public originalDotColor: string = '';
  //endregion

  public cursorCustomClasses = [
    'ngx-beautify-cursor-circle-bg-color',
    'ngx-beautify-cursor-circle-border-color',
    'ngx-beautify-cursor-dot-color'];

  @ViewChild('ngxBeautifyCursorCircle') ngxBeautifyCursorCircle?: ElementRef;
  @ViewChild('ngxBeautifyCursorDot') ngxBeautifyCursorDot?: ElementRef;

  constructor(private wr: BrowserWindowRef) {

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

      mousemove$.pipe(untilDestroyed(this)).subscribe((e: any) => {
        this.moveCursor(e.clientX, e.clientY);
      });
      const getElementsFamily$ = mousemove$.pipe(
        untilDestroyed(this),
        pluck('path') as any,
        filter((family: HTMLElement[]) => family && family.length > 0),
        map((family: HTMLElement[]) => family.slice(0, this.nParentsStyleCheck))
      );

      // region Custom style detection
      const getElementsAttrs$ = getElementsFamily$.pipe(
        map((data: HTMLElement[]) =>
          data.reduce((acc: any[], item) => {
            if (item.attributes) {
              acc.push(Object.values(item.attributes).filter((attr: any) => this.cursorCustomClasses.indexOf(attr.name) !== -1));
            }
            return acc;
          }, [])));

      const applyStylesFromAttr$ = getElementsAttrs$.pipe(
        tap((_) => this.removeClass()),
        map((data: any) => data.flat()),
        filter((arrayAttr: any[]) => arrayAttr.length > 0),
        tap((arrayAttr: any[]) => {
          arrayAttr.map((item) => {
            if (item) {
              this.applyCustomDivStyle(item);
            }
          });
        })
      );

      combineLatest(
        mousemove$,
        getElementsAttrs$,
        applyStylesFromAttr$
      )
        .pipe(untilDestroyed(this))
        .subscribe();
      //endregion

      // region Hover detection
      if (this.enableHoverAnimation) {
        const findHoverAttrs$ = getElementsFamily$.pipe(
          map((items: HTMLElement[]) => {
            return items.findIndex((item: HTMLElement) => {
              if (item) {
                const hoverOnTag = this.hoverAttributes.indexOf(item.tagName?.toLowerCase()) !== -1;
                const hoverOnClass = item.classList ?
                  Object.values(item.classList)
                    ?.filter((className: string) => this.hoverAttributes.indexOf(className) !== -1).length > 0
                  : false;
                return hoverOnTag || hoverOnClass;
              } else {
                return false;
              }
            }) !== -1;
          })
        );

        const applyHover$ = findHoverAttrs$.pipe(
          untilDestroyed(this),
          filter((shouldHover: boolean) => shouldHover != this.isHover),
          tap(shouldHover => {
            this.isHover = shouldHover;
            if (this.isHover) {
              this._onHover();
            } else {
              this._leaveHover();
            }
          })
        );

        combineLatest(
          mousemove$,
          findHoverAttrs$,
          applyHover$
        )
          .pipe(untilDestroyed(this))
          .subscribe();
      }
      //endregion
    }

    this._showCursorFirstTime();
  }

  private init(): void {
    this.originalCircleBackgroundColor = this.circleBackgroundColor;
    this.originalCircleBorderColor = this.circleBorderColor;
    this.originalDotColor = this.dotColor;
  }

  private applyCustomDivStyle(item: any): void {
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

  private removeClass(): void {
    this.circleBackgroundColor = this.originalCircleBackgroundColor;
    this.circleBorderColor = this.originalCircleBorderColor;
    this.dotColor = this.originalDotColor;
    this.setStyles();
  }

  private moveCursor(x: number, y: number): void {
    /**
     * Move cursor(dot & circle) to the pointer center
     */
    let offset = this.dotSizeInPx / 2;
    gsap.to(this.ngxBeautifyCursorDot?.nativeElement, {
      x: x - offset,
      y: y - offset,
      rotation: 0.01,
      duration: this.dotFollowDuration
    });

    offset = this.circleSizePx / 2 + this.circleBorderSizePx;
    gsap.to(this.ngxBeautifyCursorCircle?.nativeElement, {
      x: x - offset,
      y: y - offset,
      rotation: 0.01,
      duration: this.circleFollowDuration
    });
  }

  private _mouseDown() {
    if (this.isHover) {
      gsap.fromTo(
        this.ngxBeautifyCursorCircle?.nativeElement,
        {scale: this.cursorHoverAnimationScaleUp},
        {
          scale: this.cursorHoldAnimationScaleDown * this.cursorHoverAnimationScaleUp,
          duration: this.cursorHoldAnimationDuration
        }
      );
    } else {
      gsap.fromTo(
        this.ngxBeautifyCursorCircle?.nativeElement,
        {scale: 1},
        {scale: this.cursorHoldAnimationScaleDown, duration: this.cursorHoldAnimationDuration}
      );
    }
  }

  private _mouseUp() {
    if (this.isHover) {
      gsap.fromTo(
        this.ngxBeautifyCursorCircle?.nativeElement,
        {scale: this.cursorHoldAnimationScaleDown * this.cursorHoverAnimationScaleUp},
        {scale: this.cursorHoverAnimationScaleUp, duration: this.cursorHoldAnimationDuration}
      );
    } else {
      gsap.fromTo(
        this.ngxBeautifyCursorCircle?.nativeElement,
        {scale: this.cursorHoldAnimationScaleDown},
        {scale: 1, duration: this.cursorHoldAnimationDuration}
      );
    }
  }

  private _leaveHover() {
    if (this.hideDotWhileHover) gsap.to(this.ngxBeautifyCursorDot?.nativeElement, {scale: 1, duration: 0.2});
    gsap.to(this.ngxBeautifyCursorCircle?.nativeElement, {scale: 1, duration: this.cursorHoverAnimationDuration});
  }

  private _onHover() {
    if (this.hideDotWhileHover) gsap.to(this.ngxBeautifyCursorDot?.nativeElement, {scale: 0, duration: 0.2});
    gsap.to(this.ngxBeautifyCursorCircle?.nativeElement, {
      scale: this.cursorHoverAnimationScaleUp,
      duration: this.cursorHoverAnimationDuration
    });
  }

  private setStyles(): void {
    this.ngxBeautifyCursorCircle?.nativeElement.style.setProperty(
      '--ngx-beautify-cursor--circle--BackgroundColor',
      this.circleBackgroundColor
    );
    this.ngxBeautifyCursorCircle?.nativeElement.style.setProperty(
      '--ngx-beautify-cursor--circle--BorderColor',
      this.circleBorderColor
    );
    this.ngxBeautifyCursorCircle?.nativeElement.style.setProperty(
      '--ngx-beautify-cursor--circle--Size',
      `${this.circleSizePx}px`
    );

    this.ngxBeautifyCursorDot?.nativeElement.style.setProperty(
      '--ngx-beautify-cursor--zindex',
      `${this.zIndex}`
    );
    this.ngxBeautifyCursorCircle?.nativeElement.style.setProperty(
      '--ngx-beautify-cursor--zindex',
      `${this.zIndex}`
    );

    this.ngxBeautifyCursorDot?.nativeElement.style.setProperty(
      '--ngx-beautify-cursor--dot--Size',
      `${this.dotSizeInPx}px`
    );
    this.ngxBeautifyCursorDot?.nativeElement.style.setProperty(
      '--ngx-beautify-cursor--dot--BackgroundColor',
      this.dotColor
    );

    if (this.wr.nativeWindow) {
      this.wr.nativeWindow.document.body.style.setProperty(
        '--global--ngx-beautify-cursor',
        this.defaultCursor
      );
    }
  }

  private _showCursorFirstTime() {
    gsap.to(this.ngxBeautifyCursorDot?.nativeElement, {opacity: 1, scale: 1, duration: 0.7});
    gsap.to(this.ngxBeautifyCursorCircle?.nativeElement, {opacity: 1, scale: 1, duration: 0.7});
  }
}
