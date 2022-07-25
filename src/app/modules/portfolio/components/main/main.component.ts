import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
// services
import { InitSceneService } from '@shared/services/three-world/init-scene.service';
import { FloorService } from '@shared/services/three-world/worlds/floor.service';
import { EnvironmentService } from '@shared/services/three-world/worlds/environments/environment.service';
// config
import { SOURCE_PATH_DATA } from '@portfolio/config/portfolio.config';
import { Subscription } from 'rxjs';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription = new Subscription();
  private hostEl!: HTMLBaseElement;

  constructor(
    private el: ElementRef,
    private initSceneService: InitSceneService,
    private floorService: FloorService,
    private environmentService: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.initSceneService.onReadyToWork$.subscribe(() => {})
    );
  }

  ngAfterViewInit(): void {
    this.hostEl = this.el.nativeElement;
    this.initSceneService.initScene(this.hostEl, SOURCE_PATH_DATA);
    this.floorService.addFloor();
    this.environmentService.addLight();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.initSceneService.onDestroy();
    this.floorService.onDestroy();
    this.environmentService.onDestroy();
  }
}
