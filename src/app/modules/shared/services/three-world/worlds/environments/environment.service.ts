import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
// libs
import {
  CubeTexture,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  sRGBEncoding,
} from 'three';
// services
import { InitSceneService } from '@shared/services/three-world/init-scene.service';
import { ResourcesService } from '@shared/services/three-world/utils/resources.service';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private obs: Subscription[] = [];
  private scene!: THREE.Scene;
  private sunLight!: THREE.DirectionalLight;
  private environmentMap: {
    intensity: number;
    texture: CubeTexture;
    updateMaterials: Function;
  } = {} as any;

  constructor(
    private initSceneService: InitSceneService,
    private resourcesService: ResourcesService
  ) {}

  addLight() {
    this.scene = this.initSceneService.scene;
    this.setSunLight();
    this.setEnvironmentMap();
  }

  private setSunLight() {
    this.sunLight = new DirectionalLight('#ffffff', 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 150;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight);

    const hemiLight = new HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);

    const dirLight = new DirectionalLight(0xffffff);
    dirLight.position.set(3, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    this.scene.add(dirLight);
  }

  private setEnvironmentMap() {
    this.obs.push(
      this.resourcesService.texutreReady$.subscribe(() => {
        this.environmentMap.intensity = 0.4;
        this.environmentMap.texture = this.resourcesService.resourceItems[
          'environmentMapTexture'
        ] as CubeTexture;
        this.environmentMap.texture.encoding = sRGBEncoding;
        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateMaterials = () => {
          this.scene.traverse((child) => {
            if (
              child instanceof Mesh &&
              child.material instanceof MeshStandardMaterial
            ) {
              child.material.envMap = this.environmentMap.texture;
              child.material.envMapIntensity = this.environmentMap.intensity;
              child.material.needsUpdate = true;
            }
          });
        };
        this.environmentMap.updateMaterials();
      })
    );
  }

  onDestroy() {
    this.obs.forEach((obs) => obs.unsubscribe());
  }
}
