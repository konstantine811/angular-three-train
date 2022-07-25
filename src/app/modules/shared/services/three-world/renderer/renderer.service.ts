import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
// libs
import {
  CineonToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';
// services
import { SizeService } from '@shared/services/three-world/utils/size.service';

@Injectable({
  providedIn: 'root',
})
export class RendererService {
  private obs: Subscription[] = [];
  private _renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private canvas!: HTMLCanvasElement;

  get renderer(): WebGLRenderer {
    return this._renderer;
  }

  constructor(private sizeService: SizeService) {}

  initRenderer(
    canvas: HTMLCanvasElement,
    scene: Scene,
    camera: PerspectiveCamera
  ) {
    this.scene = scene;
    this.canvas = canvas;
    this.camera = camera;
    this._renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setClearColor('#211d20');
    this.renderer.setSize(this.sizeService.width, this.sizeService.height);
    this.renderer.setPixelRatio(this.sizeService.pixelRatio);
    // listen resize events
    this.onResize();
  }

  private onResize(): void {
    this.obs.push(
      this.sizeService.onResize$.subscribe(() => {
        this.renderer.setSize(this.sizeService.width, this.sizeService.height);
        this.renderer.setPixelRatio(this.sizeService.pixelRatio);
      })
    );
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }

  onDestroy(): void {
    this.obs.forEach((obs) => obs.unsubscribe());
    this.obs = [];
  }
}
