// global configs
import { mergPath } from '@core/utils/merge-data/merge.helper';
import { LoaderName } from '@shared/configs/three-world/loader.config';
// models
import { SourcePathData } from '@shared/models/three-world/source.model';

export enum SourceName {
  environmentMapTexture = 'environmentMapTexture',
  grassColorTexture = 'grassColorTexture',
  grassNormalTexture = 'grassNormalTexture',
  foxModel = 'foxModel',
}

export const SOURCE_PATH_DATA: SourcePathData[] = [
  {
    name: SourceName.environmentMapTexture,
    type: LoaderName.cubeTexture,
    staticPath: '/assets/textures/environmentMaps/0',
    path: ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    getPath() {
      if (this.staticPath) {
        return mergPath(this.staticPath, this.path);
      }
      return '';
    },
  },
  {
    name: SourceName.grassColorTexture,
    type: LoaderName.texture,
    path: '/assets/textures/dirt/color.jpg',
  },
  {
    name: SourceName.grassNormalTexture,
    type: LoaderName.texture,
    path: '/assets/textures/dirt/normal.jpg',
  },
];
