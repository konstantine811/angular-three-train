import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
// libs
import { Clock } from 'three';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private start!: number;
  private current!: number;
  private elapsed = 0;
  private delta = 16;
  private readonly clock = new Clock();
  private _delta: number = 0;
  private _onAnimationFrame$: ReplaySubject<number> = new ReplaySubject(1);

  get deltaClock(): number {
    return this._delta;
  }

  get onAnimationFrame$(): Observable<number> {
    return this._onAnimationFrame$;
  }

  constructor() {}

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    this._delta = this.clock.getDelta();
    this._onAnimationFrame$.next(this._delta);
    // create animation requests
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
