import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../service/product.service';
declare var M: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('prodId') prodId: ElementRef;
  @ViewChild('prodName') prodName: ElementRef;
  @ViewChild('prodPrice') prodPrice: ElementRef;
  @ViewChild('prodStatus') prodStatus: ElementRef;
  @ViewChild('prodImage') prodImage: ElementRef;

  products?: Product[];
  name = '';
  userDetails: any;
  product: Product = {
    _id: '',
    name: '',
    price: 0,
    status: '',
    productImage: ''
  };
  productData: any;
  submitted = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(){
    let userEmail = localStorage.getItem('user-details');
    this.userDetails = userEmail; 
   
    if (userEmail == 'admin@gmail.com') {
      this.productService.getAll().subscribe(
        (data) => {
           this.products =  data.products;
        },
        (err) => {
          console.log('Error : ', err);
        }
      )
    }
    else {
      this.productService.getAllActiveProducts().subscribe((res) => {
        this.products = res.products;
      },
      (err) => {
        console.log('Error : ', err);
      });
    }

    
  }
  addProduct() {
    
    if (this.prodId.nativeElement.value == '') {
      const data = {
        _id: this.product._id,
        name: this.product.name,
        price: this.product.price,
        status: this.product.status,
        productImage: this.product.productImage
      };
      
      this.productService.create(data).subscribe({next: (res) => {
        this.submitted = true;
        window.location.reload();
        
      },
      error: (e) => console.log(`Error while saving data`)})
    }
    else {
      const data = {
        name: this.prodName.nativeElement.value,
        price: this.prodPrice.nativeElement.value,
        status: this.prodStatus.nativeElement.value,
        productImage: this.prodImage.nativeElement.value
      };
      this.productService.update(this.prodId.nativeElement.value, data).subscribe((res) => {
        this.submitted = true;
        window.location.reload();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      }, (err) => {
        console.log(`Error while updating data`)
      })
    }
   
  }

  editProduct(prod: Product) {
    this.prodId.nativeElement.value = prod._id;
    this.prodName.nativeElement.value = prod.name;
    this.prodPrice.nativeElement.value = prod.price;
    this.prodStatus.nativeElement.value = prod.status;
  
  }

  goBack() {
    this.router.navigateByUrl('/userprofile');
  }

  refreshProducts() {
    this.productService.getAll().subscribe((res) => {
      this.products = res as Product[];
    })
  }

  deleteProduct(prod: Product) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.productService.delete(prod._id).subscribe((res) => {
        window.location.reload();
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      })
    }
  }
}