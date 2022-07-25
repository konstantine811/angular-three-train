import { LoaderName } from '@shared/configs/three-world/loader.config';
// gltf
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export interface SourcePathData {
  name: string;
  type: LoaderName;
  staticPath?: string;
  path: string[] | string;
  getPath?(): string[] | string;
}

export interface ResourceItems {
  [key: string]: THREE.CubeTexture | GLTF | THREE.Texture;
}
