import { Component } from '@angular/core';

@Component({
  selector: 'app-tree-type-menu',
  standalone: true, // Thêm dòng này
  templateUrl: './tree-type-menu.component.html',
  styleUrls: ['./tree-type-menu.component.scss']
})
export class TreeTypeMenuComponent {
  activeButton: string = ''; // Biến để theo dõi nút active

  // Phương thức để thiết lập nút active
  setActive(buttonName: string): void {
    this.activeButton = buttonName; // Cập nhật nút active
  }
}