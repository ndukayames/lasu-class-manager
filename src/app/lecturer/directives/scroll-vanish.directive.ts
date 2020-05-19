import { Directive, Input, ElementRef, Renderer2, OnInit } from "@angular/core";
import { DomController, IonContent } from '@ionic/angular';

@Directive({
  selector: '[appScrollVanish]'
})
export class ScrollVanishDirective {

  @Input("appScrollVanish") scrollArea;

  private hidden: boolean = false;
  private triggerDistance: number = 50;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController
  ) {
    
  }

  ngOnInit() {
    console.log(this.renderer.nextSibling(this.element.nativeElement))
    // console.log(this.triggerDistance)
    // this.initStyles();

    // this.scrollArea.ionScroll.subscribe(scrollEvent => {
    //   let delta = scrollEvent.detail.deltaY;

    //   if (scrollEvent.detail.currentY === 0 && this.hidden) {
    //     this.show();
    //     console.log(delta, "shoe show")
    //   } else if (!this.hidden && delta > this.triggerDistance) {
    //     this.hide();
    //     console.log(delta, "hide")
    //   } else if (this.hidden && delta < -this.triggerDistance) {
    //     this.show();
    //     console.log(delta, "show")
    //   }
    // });
  }

  // initStyles() {
  //   this.domCtrl.write(() => {
  //     this.renderer.setStyle(
  //       this.element.nativeElement,
  //       "transition",
  //       "0.2s linear"
  //     );
  //     this.renderer.setStyle(this.element.nativeElement, "max-height", "100%");
  //   });
  // }

  // hide() {
  //   this.domCtrl.write(() => {
  //     this.renderer.setStyle(this.element.nativeElement, "height", "0px");
  //     this.renderer.setStyle(this.element.nativeElement, "display", "none");
  //     this.renderer.setStyle(this.element.nativeElement, "padding", "0");
  //   });
  //   console.log(this.triggerDistance)
  //   this.hidden = true;
  // }

  // show() {
  //   this.domCtrl.write(() => {
  //     this.renderer.setStyle(this.element.nativeElement, "height", "100%");
  //     this.renderer.removeStyle(this.element.nativeElement, "opacity");
  //     this.renderer.removeStyle(this.element.nativeElement, "padding");
  //   });
  //   console.log(this.triggerDistance)
  //   this.hidden = false;
  // }

}
