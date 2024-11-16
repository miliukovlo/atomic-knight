import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HorseComponent } from "../horse/horse.component";

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [
    CommonModule,
    HorseComponent
  ],
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() isKnight: boolean = false;
  @Input() id: number = 0;
  @Input() moveNumber: number = 0;
  @Input() canGo: boolean = false;
  @Output() cellClick = new EventEmitter<void>();

  onClick() {
    this.cellClick.emit();
  }
}
