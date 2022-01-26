<p align="center">
  <img src="https://github.com/MaorAssayag/ngx-beautify-cursor/blob/main/assets/package-logo.png" alt="Oops!" width="200"/>
</p>

<p align="center">
  <a href="//npmjs.com/package/ngx-beautify-cursor"><img src="https://badge.fury.io/js/ngx-beautify-cursor.svg" alt="Version"></a>
  <a href="//npmjs.com/package/ngx-beautify-cursor"><img src="https://img.shields.io/npm/dm/ngx-beautify-cursor?color=orange" alt="Monhtly Downloads"></a>
  <a href="https://github.com/maorassayag/ngx-beautify-cursor/issues"><img src="https://img.shields.io/github/issues/maorassayag/ngx-beautify-cursor" alt="issues"></a>
  <a href="https://github.com/maorassayag/ngx-beautify-cursor"><img src="https://img.shields.io/github/stars/maorassayag/ngx-beautify-cursor" alt="stars"></a>
  <a href="https://github.com/maorassayag/ngx-beautify-cursor/blob/master/LICENSE"><img src="https://img.shields.io/github/license/maorassayag/ngx-beautify-cursor?color=skyblue" alt="LICENSE"></a>
</p>

# ngx-beautify-cursor

## Overview

ngx-beautify-cursor is a simple Angular package to beautify your cursor :clap:

Live Demo [github page](https://maorassayag.github.io/ngx-beautify-cursor/) :sparkles:

#

### Installation

`npm install ngx-beautify-cursor`

### Usage

- Import NgxCursorModule
  ##### app.module.ts

```ts
import {NgxBeautifyCursorModule} from 'ngx-beautify-cursor';

@NgModule({
    imports: [...NgxBeautifyCursorModule]
})
export class AppModule {
}
```

- Add The cursor to your .html
  #### in your root component HTML (or in specific component).

```html

<ngx-beautify-cursor></ngx-beautify-cursor>
```

- Fully **customizable** (description below)

```html

<ngx-beautify-cursor
        [circleBackgroundColor]="'hsla(245, 44%, 56%, 0.08)'"
        [circleBorderColor]="'#6363af'"
        [circleBorderSizePx]="1"
        [circleFollowDuration]="0.5"
        [circleSizePx]="40"
        [cursorHoldAnimationDuration]="0.25"
        [cursorHoldAnimationScaleDown]="0.8"
        [cursorHoverAnimationDuration]="0.4"
        [cursorHoverAnimationScaleUp]="1.5"
        [defaultCursor]="'none'"
        [dotColor]="'#6363af'"
        [dotFollowDuration]="0"
        [dotSizeInPx]="8"
        [enableHoverAnimation]="true"
        [hideDotWhileHover]="true"
        [hoverAttributes]="['clickable', 'button', 'href']"
        [nParentsStyleCheck]="5"
        [zIndex]="999"
></ngx-beautify-cursor>

```

- Detect styles from html attributes during the user's navigation

```html

<!-- hover on this element change the cursor style-->
<a href="..."
   ngx-beautify-cursor-circle-bg-color="rgba(255,69,0,0.1)"
   ngx-beautify-cursor-circle-border-color="orange"
   ngx-beautify-cursor-dot-color="orange">
</a>
```
#
## Cursor Inputs

| Parameters name                | Default value             | Valid inputs               | Functionality                                               |
| ------------------------------ | ------------------------- | -------------------------- |------------------------------------------------------------ |
| `circleBackgroundColor`        | hsla(245, 44%, 56%, 0.08) | rgba, hlsa, hex, rgb       | cursor circle background color, low alpha looks good        |
| `circleBorderColor`            | #6363af                   | rgba, hlsa, hex, rgb       | cursor circle background color                              |
| `circleBorderSizePx`           | 1                         | number > 0                 | cursor circle border width                                  |
| `circleFollowDuration`         | 0.5                       | number > 0                 | pointer-follow animation duration of the circle             |
| `circleSizePx`                 | 40                        | number > 0                 | circle size in px                                           |
| `cursorHoldAnimationDuration`  | 0.25                      | number > 0                 | holding left-click will trigger scale-down animation        |
| `cursorHoldAnimationScaleDown` | 0.8                       | 1 > number > 0             | circle scale-down multiplier while holding                  |
| `cursorHoverAnimationDuration` | 0.4                       | number > 0                 | duration of scale-up circle animation during hover          |
| `cursorHoverAnimationScaleUp`  | 1.5                       | number > 1                 | circle scale-up multiplier while hovering                   |
| `defaultCursor`                | none                      | 'none', 'auto', 'hide'     | global 'cursor: <>' attribute                               |
| `dotColor`                     | #6363af                   | rgba, hlsa, hex, rgb       | inner dot color. Use 'transparent' to hide the inner dot    |
| `dotFollowDuration`            | 0                         | number > 0                 | pointer-follow animation duration of the inner dot          |
| `dotSizeInPx`                  | 8                         | number > 0                 | inner dot size                                              |
| `enableHoverAnimation`         | true                      | boolean                    | enable cursor scaling animation on hover attributes         |
| `hideDotWhileHover`            | true                      | boolean                    | hide inner dot during hover                                 |
| `hoverAttributes`              | []                        | array of strings           | HTML tags \ classes name to act as hover animation trigger  |
| `nParentsStyleCheck`           | 5                         | number > 1                 | how many HTML parents to check for style custom classes     |
| `zIndex`                       | 999                       | cursor z-index             | config big z-index                                          |

#
## Custom style classes

| Attribute name                              | Functionality             |
| ------------------------------------------- | ------------------------- |
| `ngx-beautify-cursor-circle-bg-color`       | circle background color   |
| `ngx-beautify-cursor-circle-border-color`   | circle border color       |
| `ngx-beautify-cursor-dot-color`             | dot color                 |

#
## Thanks :blue_heart:

* While browsing *dribbble.com* & enjoying myself I came across *https://zajno.com* website and instantly loved their
  cursor design. So huge thanks to **Zajno** for the look & feel inspiration :raised_hands:.
* [Maxime Jacquet](https://github.com/maxime1jacquet) &
  his [ngx-cursor](https://github.com/maxime1jacquet/npm-directives/tree/master/projects/ngx-cursor) npm package that
  helped me with *native window*, *HTML elements family* & general package structure.
