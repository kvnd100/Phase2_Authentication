import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  @Input() title: string | null = null;
  @Input() text: string | null = null;
  @Input() isDangerButton: boolean = false;

  @Output() confirmDelete: EventEmitter<void> = new EventEmitter<void>();
  constructor(public modalRef: MdbModalRef<DeleteModalComponent>) {}

  onConfirm(): void {
    this.confirmDelete.emit();
    this.modalRef.close();
  }
}
