import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRipple]',
})
export class RippleDirective {
  private hostEl!: HTMLBaseElement;

  constructor(private el: ElementRef) {
    this.hostEl = el.nativeElement;
    this.hostEl.classList.add('hidden');
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const divEl = document.createElement('div');
    divEl.classList.add('ripple');
    divEl.style.left = `${event.offsetX}px`;
    divEl.style.top = `${event.offsetY}px`;
    this.hostEl.appendChild(divEl);
    setTimeout(() => {
      divEl.remove();
    }, 1000);
  }
}
