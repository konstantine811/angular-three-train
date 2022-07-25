import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
// libs
import { PerspectiveCamera, Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// services
import { SizeService } from '@shared/services/three-world/utils/size.service';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private obs: Subscription[] = [];
  private _camera!: PerspectiveCamera;
  private _scene!: Scene;
  private _controls!: OrbitControls;
  private canvas!: HTMLCanvasElement;

  get scene(): Scene {
    return this._scene;
  }

  get camera(): PerspectiveCamera {
    return this._camera;
  }

  get controls(): OrbitControls {
    return this._controls;
  }

  constructor(private sizeService: SizeService) {}

  initCamera(
    scene: Scene,
    canvas: HTMLCanvasElement,
    isControl = true
  ): PerspectiveCamera {
    this._scene = scene;
    this.canvas = canvas;
    this._camera = new PerspectiveCamera(
      35,
      this.sizeService.width / this.sizeService.height,
      1,
      1000
    );
    this.camera.position.set(5, 4, 4);
    this.scene.add(this.camera);

    this.setOrbitControls(isControl);
    this.onResize();
    return this.camera;
  }

  private onResize() {
    this.obs.push(
      this.sizeService.onResize$.subscribe(() => {
        this.camera.aspect = this.sizeService.width / this.sizeService.height;
        this.camera.updateProjectionMatrix();
      })
    );
  }

  private setOrbitControls(status: boolean) {
    if (status) {
      this._controls = new OrbitControls(this.camera, this.canvas);
      this.controls.enableDamping = true;
      this.controls.autoRotate = false;
    }
  }

  update() {
    if (this.controls) {
      this.controls.update();
    }
  }

  onDestroy(): void {
    this.obs.forEach((obs) => obs.unsubscribe());
    this.obs = [];
  }
}
