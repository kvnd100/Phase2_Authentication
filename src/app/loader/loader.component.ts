import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="loading" class="overlay">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
    `,
  ],
})
export class LoaderComponent {
  @Input() loading: boolean = false;
}
