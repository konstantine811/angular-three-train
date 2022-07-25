import { Injectable } from '@angular/core';
import { SourcePathData } from '@shared/models/three-world/source.model';
import { Subscription, ReplaySubject, Observable } from 'rxjs';
// libs
import { Mesh, PerspectiveCamera, Scene } from 'three';
// services
import { ThemeChangeService } from '@core/services/ui/theme-change.service';
// services
import { SizeService } from './utils/size.service';
import { TimeService } from './utils/time.service';
import { ResourcesService } from './utils/resources.service';
import { CameraService } from './renderer/camera.service';
import { RendererService } from './renderer/renderer.service';

@Injectable({
  providedIn: 'root',
})
export class InitSceneService {
  private obs: Subscription[] = [];
  private _canvas!: HTMLCanvasElement;
  private _scene!: Scene;
  private _camera!: PerspectiveCamera;
  private _onReadyToWork$ = new ReplaySubject<void>(1);

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get scene(): Scene {
    return this._scene;
  }

  get camera(): PerspectiveCamera {
    return this._camera;
  }

  get onReadyToWork$(): Observable<void> {
    return this._onReadyToWork$;
  }

  constructor(
    private sizeService: SizeService,
    private timeService: TimeService,
    private resourcesService: ResourcesService,
    private cameraService: CameraService,
    private rendererService: RendererService,
    private themeServices: ThemeChangeService
  ) {}

  initScene(
    el: HTMLBaseElement,
    source: SourcePathData[],
    isListenThemeChange = true
  ): Scene {
    this._scene = new Scene();
    this.timeService.tick();
    this.setCanvasEl(el);
    this.resourcesService.addResources(source);
    this._camera = this.cameraService.initCamera(this.scene, this.canvas);
    this.rendererService.initRenderer(this.canvas, this.scene, this.camera);
    this.subscribeToAnimateFrame();
    this.onListenThemeChange();
    this._onReadyToWork$.next();
    return this.scene;
  }

  private setCanvasEl(el: HTMLBaseElement): void {
    // add canvas element to wrapper
    this._canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.className = 'three-canvas';
    el.appendChild(this._canvas);
    this.sizeService.setElement(el);
  }

  private subscribeToAnimateFrame() {
    this.obs.push(
      this.timeService.onAnimationFrame$.subscribe((delta) => {
        this.cameraService.update();
        this.rendererService.update();
      })
    );
  }

  private onListenThemeChange() {
    this.obs.push(
      this.themeServices.currentMainColor$.subscribe((colorData) => {
        this.rendererService.renderer.setClearColor(colorData.hexNumber);
      })
    );
  }

  onDestroy(): void {
    this.obs.forEach((obs) => obs.unsubscribe());
    this.sizeService.onDestroy();
    this.cameraService.onDestroy();
    this.rendererService.onDestroy();
    this.obs = [];
    this.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose();
        Object.values(child.material).forEach((val) => {
          const value = val as any;
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        });
      }
    });
  }
}
