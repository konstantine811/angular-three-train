import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
// libs
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CubeTexture, CubeTextureLoader, Texture, TextureLoader } from 'three';
// models
import {
  ResourceItems,
  SourcePathData,
} from '@shared/models/three-world/source.model';
// congis
import { LoaderName } from '@shared/configs/three-world/loader.config';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  private _source!: SourcePathData[];
  private loaders!: {
    [LoaderName.gltf]: GLTFLoader;
    [LoaderName.texture]: TextureLoader;
    [LoaderName.cubeTexture]: CubeTextureLoader;
  };
  private toLoad = 0;
  private loaded = 0;
  private _loaded$ = new BehaviorSubject<number>(0);
  private _texutreReady$ = new ReplaySubject<void>(1);
  private _items: ResourceItems = {};

  constructor() {}

  get texutreReady$(): Observable<void> {
    return this._texutreReady$;
  }

  get resourceItems(): ResourceItems {
    return this._items;
  }

  get countLoadResources(): number {
    return this.toLoad;
  }

  get loaded$(): Observable<number> {
    return this._loaded$;
  }

  addResources(source: SourcePathData[]) {
    this._source = source;

    this.toLoad = this._source.length;

    this.setLoaders();
    this.startLoading();
  }

  private setLoaders(): void {
    this.loaders = {
      [LoaderName.gltf]: new GLTFLoader(),
      [LoaderName.texture]: new TextureLoader(),
      [LoaderName.cubeTexture]: new CubeTextureLoader(),
    };
  }

  private startLoading() {
    this._source.forEach((source) => {
      if (source.type === LoaderName.cubeTexture) {
        if (!source.getPath) {
          return;
        }
        this.loaders[source.type].load(
          source.getPath() as string & string[],
          (file) => {
            this.sourceLoaded(source, file);
          }
        );
      } else if (source.type === LoaderName.texture) {
        (this.loaders[source.type] as TextureLoader).load(
          source.path as string,
          (file) => {
            this.sourceLoaded(source, file);
          }
        );
      } else if (source.type === LoaderName.gltf) {
        (this.loaders[source.type] as GLTFLoader).load(
          source.path as string,
          (file) => {
            this.sourceLoaded(source, file);
          }
        );
      }
    });
  }

  private sourceLoaded(
    source: SourcePathData,
    file: CubeTexture | GLTF | Texture
  ) {
    this._items[source.name as string] = file;
    this.loaded++;
    this._loaded$.next(this.loaded);
    if (this.loaded === this.toLoad) {
      this._texutreReady$.next();
    }
  }
}
