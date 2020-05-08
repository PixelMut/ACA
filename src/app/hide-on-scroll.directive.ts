import { Directive, ElementRef, Input, Renderer2, AfterViewInit, OnDestroy, NgZone } from "@angular/core";
import { takeWhile } from "rxjs/operators";
import { DomController } from "@ionic/angular";

@Directive({
  selector: "[hideOnscroll]"
})
export class HideOnscrollDirective implements AfterViewInit, OnDestroy {
  //TODO:constants
  private TOP_THRESHOLD = 56;
  private BOTTOM_THRESHOLD = 10;
  private TRANSITION_DELAY = "300ms";

  scrollDir;
  scrollTop;

  //Content where the fab button is displayed
  @Input("hideOnscroll") scrollArea;

  alive: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2, private zone: NgZone, private domCtrl: DomController) {}

  ngAfterViewInit() {
    //After initializing all the elements , set their transiotn property
    this.init();

    this.zone.runOutsideAngular(() => {
      this.scrollArea.ionScroll.pipe(takeWhile(() => this.alive)).subscribe(ev => {
        this.domCtrl.read(() => {
          this.scrollDir = ev.detail.deltaY > 0 ? "down" : "up";
          this.scrollTop = ev.detail.scrollTop;
        });
      });

      this.scrollArea.ionScrollEnd.pipe(takeWhile(() => this.alive)).subscribe(() => {
        this.render(this.scrollDir, this.scrollTop);
      });
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  render(scrollDir, scrollTop) {
    this.domCtrl.write(() => {
      if (scrollDir == "up" && scrollTop > this.BOTTOM_THRESHOLD) {
        this.show();
      } else if (scrollDir == "down" && scrollTop > this.TOP_THRESHOLD) {
        this.hide();
      } else if (scrollTop === 0) {
        this.show();
      }
    });
  }
  show() {
    this.renderer.setStyle(this.el.nativeElement, "transform", "scale3d(1,1,1)");
    this.renderer.setStyle(this.el.nativeElement, "visibility", "visible");
  }
  hide() {
    this.renderer.setStyle(this.el.nativeElement, "transform", "scale3d(.01,.01,.01)");
    this.renderer.setStyle(this.el.nativeElement, "visibility", "hidden");
  }
  init() {
    this.renderer.setStyle(this.el.nativeElement, "transition", `transform ${this.TRANSITION_DELAY}, visibility ${this.TRANSITION_DELAY}`);
  }
}