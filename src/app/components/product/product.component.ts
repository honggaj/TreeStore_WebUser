import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../api/services';
import { GetListProductSpResult, ProductResponse } from '../../api/models';
import { TreeTypeMenuComponent } from '../tree-type-menu/tree-type-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiConfiguration } from '../../api/api-configuration';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, TreeTypeMenuComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: GetListProductSpResult[] = [];
  filteredProducts: GetListProductSpResult[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';
  selectedCategory: string = ''; // Lưu loại cây được chọn
  productId: number = 0; 
  product!: ProductResponse; 
  cartItems: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
 
  quantity: number = 1; // Khai báo số lượng

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
          this.products = response.data ?? [];
          this.filteredProducts = this.products;
        } else {
          this.products = [];
          this.filteredProducts = [];
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

  viewDetail(product: GetListProductSpResult): void {
    // Chuyển hướng đến trang chi tiết sản phẩm và truyền thông tin sản phẩm
    this.router.navigate(['/xemchitiet', product.productId]); // Thay đổi product.id thành ID của sản phẩm
  }

  addToCart(product: GetListProductSpResult) {
    const item = {
      productId: product.productId,
      name: product.productName,
      price: product.priceOutput,
      quantity: this.quantity, // Số lượng hiện tại muốn thêm
      imageUrl: this.rootUrl + '/' + product.img
    };
  
    // Tìm xem sản phẩm này đã tồn tại trong giỏ hàng chưa
    const existingItem = this.cartItems.find(cartItem => cartItem.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += this.quantity; // Cộng dồn số lượng
    } else {
      this.cartItems.push(item); // Thêm mới sản phẩm vào giỏ hàng nếu chưa có
    }
  
    // Cập nhật giỏ hàng vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  
  
  
    // Sử dụng SweetAlert2 để hiển thị thông báo
    Swal.fire({
      title: 'Thành công!',
      text: 'Sản phẩm đã được thêm vào giỏ hàng!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  
  


  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.productName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
  }

  // Phương thức để lọc sản phẩm theo loại cây
  filterProductsByCategory(category: string): void {
    console.log('Loại cây nhận được từ sự kiện:', category); // Log để kiểm tra
    this.selectedCategory = category;
    this.filteredProducts = this.products.filter(product =>
      product.categoryName === this.selectedCategory
    );
    console.log('Sản phẩm sau khi lọc:', this.filteredProducts); // Log để kiểm tra danh sách sản phẩm sau khi lọc
    this.currentPage = 1;
  }
  
}
