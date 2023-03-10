import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStandings]'
})
export class StandingsDirective {

  constructor(private el: ElementRef, private renderer : Renderer2) {   }
}
