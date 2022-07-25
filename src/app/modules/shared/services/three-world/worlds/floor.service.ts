import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
// libs
import {
  BoxBufferGeometry,
  CircleGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneBufferGeometry,
  RepeatWrapping,
  Scene,
  SphereBufferGeometry,
  sRGBEncoding,
} from 'three';
// services
import { ResourcesService } from '@shared/services/three-world/utils/resources.service';
import { InitSceneService } from '@shared/services/three-world/init-scene.service';
// configs
import { SourceName } from '@portfolio/config/portfolio.config';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  private obs: Subscription[] = [];
  private geomtery!: CircleGeometry;

  private textures: {
    color: THREE.Texture;
    normal: THREE.Texture;
  } = {} as any;
  private material!: THREE.MeshStandardMaterial;
  private mesh!: THREE.Mesh;
  private scene!: Scene;

  constructor(
    private resourcesService: ResourcesService,
    private initSceneService: InitSceneService
  ) {}

  addFloor() {
    this.scene = this.initSceneService.scene;
    this.geomtery = new CircleGeometry(3, 56);
    this.setTextures();
  }

  private setTextures() {
    this.obs.push(
      this.resourcesService.texutreReady$.subscribe(() => {
        this.textures.color = this.resourcesService.resourceItems[
          SourceName.grassColorTexture
        ] as THREE.Texture;
        this.textures.color.encoding = sRGBEncoding;
        this.textures.color.repeat.set(1.5, 1.5);
        this.textures.color.wrapS = RepeatWrapping;
        this.textures.color.wrapT = RepeatWrapping;
        // normal
        this.textures.normal = this.resourcesService.resourceItems[
          SourceName.grassNormalTexture
        ] as THREE.Texture;
        this.textures.normal.repeat.set(1.5, 1.5);
        this.textures.normal.wrapS = RepeatWrapping;
        this.textures.normal.wrapT = RepeatWrapping;
        // add mat and mesh
        this.setMaterial();
        this.setMesh();
      })
    );
  }

  private setMaterial() {
    this.material = new MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      side: DoubleSide,
    });
  }

  private setMesh() {
    this.mesh = new Mesh(this.geomtery, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  onDestroy() {
    this.obs.forEach((obs) => obs.unsubscribe());
  }
}
