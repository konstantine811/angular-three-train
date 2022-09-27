import { Injectable, NgZone } from '@angular/core';
import { debounceTime, ReplaySubject, Subject } from 'rxjs';
import { combineLatest, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private obs: Subscription[] = [];
  stop$ = new Subject<void>();
  private _width$ = new BehaviorSubject<number>(0);
  private _height$ = new BehaviorSubject<number>(0);
  private _onResize$ = new ReplaySubject<void>(1);
  private _width = 0;
  private _height = 0;
  private _observer!: ResizeObserver;
  private _el!: HTMLBaseElement;
  private readonly debounceTime = 1;

  get width$(): Observable<number> {
    return this._width$.pipe(
      distinctUntilChanged(),
      debounceTime(this.debounceTime)
    );
  }

  get height$(): Observable<number> {
    return this._height$.pipe(
      distinctUntilChanged(),
      debounceTime(this.debounceTime)
    );
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get onResize$(): Observable<void> {
    return this._onResize$;
  }

  get pixelRatio(): number {
    return Math.min(window.devicePixelRatio, 2);
  }

  constructor(private zone: NgZone) {}

  setElement(el: HTMLBaseElement) {
    const { width, height } = el.getBoundingClientRect();
    this._width = width;
    this._height = height;
    this._el = el;
    this._observer = new ResizeObserver((entries) => {
      this.zone.run(() => {
        this._width$.next(entries[0].contentRect.width);
        this._height$.next(entries[0].contentRect.height);
      });
    });
    this._observer.observe(el);
    this.obs.push(
      combineLatest([this.width$, this.height$])
        .pipe(debounceTime(100))
        .subscribe(([width, height]) => {
          this._width = width;
          this._height = height;
          this._onResize$.next();
        })
    );
  }

  onDestroy() {
    this._observer.unobserve(this._el);
    this.obs.forEach((obs) => obs.unsubscribe());
    this.obs = [];
  }
}
