import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../api/services';
import { GetListProductSpResult } from '../../api/models';
import { TreeTypeMenuComponent } from '../tree-type-menu/tree-type-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ApiConfiguration } from '../../api/api-configuration';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule,TreeTypeMenuComponent], // Add FormsModule here
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: GetListProductSpResult[] = []; // Danh sách sản phẩm
  filteredProducts: GetListProductSpResult[] = []; // Danh sách sản phẩm đã lọc
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 10; // Số sản phẩm mỗi trang
  searchTerm: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private config: ApiConfiguration
  ) {}

  ngOnInit(): void {
    this.listProducts();
  }

  get rootUrl(): string {
    return this.config.rootUrl;
  }

  listProducts(): void {
    this.productService.apiProductListProductGet$Json$Response().subscribe(
      (rs) => {
        const response = rs.body;
        if (response.success) {
          this.products = response.data ?? []; // Khởi tạo danh sách sản phẩm
          this.filteredProducts = this.products; // Khởi tạo filteredProducts bằng toàn bộ sản phẩm
          console.log("Products:", this.products);
        } else {
          this.products = [];
          this.filteredProducts = []; // Không có sản phẩm nào
        }
      }
    );
  }

  paginatedProducts(): GetListProductSpResult[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  viewDetail(): void {
    this.router.navigate(['/xemchitiet']);
  }

  addToCart(): void {
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }
  
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      // Nếu không có từ khóa tìm kiếm, tải lại toàn bộ sản phẩm
      this.filteredProducts = this.products; // Reset filteredProducts
      return;
    }

    // Lọc danh sách sản phẩm theo tên sản phẩm
    this.filteredProducts = this.products.filter(product =>
      product.productName?.toLowerCase().includes(this.searchTerm.toLowerCase()) // Optional chaining to handle null
    );
    this.currentPage = 1; // Reset lại trang khi tìm kiếm
  }
}
