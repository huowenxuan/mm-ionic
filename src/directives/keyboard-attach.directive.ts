import {Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit} from "@angular/core";
import {Keyboard} from "@ionic-native/keyboard";
import {Content, Platform} from "ionic-angular";
import {Subscription} from "rxjs/Subscription";


/**
 * @name KeyboardAttachDirective
 * @description
 * The `keyboardAttach` directive will cause an element to float above the
 * keyboard when the keyboard shows. Currently only supports the `ion-footer` element.
 *
 * ### Notes
 * - This directive requires [Ionic Native](https://github.com/driftyco/ionic-native)
 * and the [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugin-keyboard).
 * - Currently only tested to work on iOS.
 * - If there is an input in your footer, you will need to set
 *   `Keyboard.disableScroll(true)`.
 *
 * @usage
 *
 * ```html
 * <ion-content #content>
 * </ion-content>
 *
 * <ion-footer [keyboardAttach]="content">
 *   <ion-toolbar>
 *     <ion-item>
 *       <ion-input></ion-input>
 *     </ion-item>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 */

@Directive({
  selector: '[keyboardAttach]'
})
export class KeyboardAttachDirective implements OnInit, OnDestroy {
  @Input('keyboardAttach') content: Content;

  private onShowSubscription: Subscription;
  shouldHide: boolean = true;

  private onHideSubscription: Subscription;

  constructor(private elementRef: ElementRef,
              private keyboard: Keyboard,
              private platform: Platform) {
  }

  ngOnInit() {
    if (this.platform.is('cordova') && this.platform.is('ios')) {
      this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(e => this.onShow(e));
      this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe((e) => this.onHide(e));
    }
  }

  ngOnDestroy() {
    if (this.onShowSubscription) {
      this.onShowSubscription.unsubscribe();
    }
    if (this.onHideSubscription) {
      this.onHideSubscription.unsubscribe();
    }
  }

  private onShow(e) {
    let keyboardHeight: number = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
    this.setElementPosition(keyboardHeight);
  };

  private onHide(e) {
    if (this.shouldHide) {
      this.setElementPosition(0);
    }
    this.shouldHide = true;
  };

  private setElementPosition(pixels: number) {
    this.elementRef.nativeElement.style.paddingBottom = pixels + 'px';
    this.content.resize();
    setTimeout(()=>{
      this.content.scrollToBottom(300);
    }, 100)
  }
}
