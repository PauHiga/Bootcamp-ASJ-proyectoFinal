import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from '../../../services/products-service.service';
import Swal from 'sweetalert2';
import { Supplier } from '../../../models/supplier';
import { ProductDisplay } from '../../../models/productDisplay';
import { map } from 'rxjs';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
  encapsulation: ViewEncapsulation.None,
    styles: `
    .custom-tooltip .tooltip-inner {
    background-color: grey;
    color: white;
    font-size: 100%;
    padding: 5px;
  }`,
})
export class ListProductsComponent implements OnInit{

  constructor(public productsService: ProductsServiceService, private route:ActivatedRoute, private router:Router){}

  products : ProductDisplay[]= [];
  suppliersList : Supplier[] = [];

  activeProducts : number = 0
  activeSuppliers : number = 0

  showDeleted = false
  showDeletedButtonMessage = "Show inactive products"
  title : String = "Products"

  toggleShowDeleted(){
    this.showDeleted = !this.showDeleted
    if (this.showDeleted){
      this.showDeletedButtonMessage = "Show active products"
      this.title = "Products Eliminated"
    } else{
      this.showDeletedButtonMessage = "Show inactive products"
      this.title = "Products"
    }
  }

  search : string = ""
  sortByProperty : string = "sku";
  sortByPropertyActivated : boolean = false;
  sortBySubproperty : string = "";
  sortBySubpropertyActivated : boolean = false;
  sortByDesc : boolean = false;

  setSortByCode(property : string){
    this.sortByPropertyActivated = true;
    this.sortByProperty = property;
    this.sortByDesc = !this.sortByDesc;
  }

  setSortBySubpropertyCode(property : string, subproperty : string){
    this.sortBySubpropertyActivated = true;
    this.sortByProperty = property;
    this.sortBySubproperty = subproperty;
    this.sortByDesc = !this.sortByDesc;
  }

  ngOnInit(): void {
    this.getSuppliers();
    this.getProducts();
    this.getActiveProducts();
    this.getActiveSuppliers();
  }

  getProducts(){
    this.productsService.getProducts().subscribe(
      (response)=>{
        this.products = response
        this.sortByProductName(this.products)
      }
    )
  }

  getSuppliers(){
    this.productsService.getSuppliersList().subscribe((response)=>{
      this.suppliersList = response;
    })
  }

  getActiveProducts(){
    this.productsService.getProductsCount(false).subscribe((response)=>{
      this.activeProducts = response;
    })
  }

  getActiveSuppliers(){
    this.productsService.getSuppliersCount(false).subscribe((response)=>{
      this.activeSuppliers = response;
    })
  }

  deleteProduct(id:number, nombreProducto : string){
    Swal.fire({
      text: `¿Eliminate product "${nombreProducto}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminate this product",
      cancelButtonText: "Do not eliminate this product"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(id).subscribe( {
          next:(data) =>{
            this.getProducts();
            this.getActiveProducts();
            Swal.fire({
              title: "Product eliminated",
              text: `The product has been eliminated`,
              icon: "success"
            })
          },
          error: (error) =>{
            console.log(error);
            Swal.fire({
              title: "Product not eliminated",
              text: "There was an error! The product could not be eliminated",
              icon: "error"
            })
        }})
      }
    });
  }

  activateProduct(id:number, nombreProducto : string){
    Swal.fire({
      text: `Activate product "${nombreProducto}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Activate this product",
      cancelButtonText: "Do not activate this product"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.activateProduct(id).subscribe( {
          next:(data) =>{
            this.getProducts();
            this.getActiveProducts();
            Swal.fire({
              title: "Product activated",
              text: `The product has been activated`,
              icon: "success"
            })
          },
          error: (error) =>{
            console.log(error);
            Swal.fire({
              title: "Product not activated",
              text: "There was an error! The product could not be activated",
              icon: "error"
            })
        }})
      }
    });
  }

  activateSupplier(id:number, supplierName : string){
    Swal.fire({
      title: "Activate supplier",
      html: `<p>This product is inactive because the supplier "${supplierName}" has been inactivated.</p><p>Do you want to activate the supplier "${supplierName}"?</p> This will affect all of "${supplierName}"'s products`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, activate the supplier "${supplierName}"`,
      cancelButtonText: `Do not activate the supplier "${supplierName}"`
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.activateSupplier(id).subscribe( {
          next:(data) =>{
            this.getProducts();
            this.getActiveProducts();
            this.getActiveSuppliers();
            Swal.fire({
              title: "Supplier activated",
              text: `The supplier "${supplierName}" has been activated`,
              icon: "success"
            })
          },
          error: (error) =>{
            console.log(error);
            Swal.fire({
              title: "Supplier not activated",
              text: "There was an error! The supplier could not be activated",
              icon: "error"
            })
        }})
      }
    });
  }

  editProduct(id:number){
    const selectedProduct = this.products.find(item => item.id == id)
    if(!selectedProduct){
      console.log("Error! No supplier found to be edited!")
    } 
    else{
      if(selectedProduct.deleted == true){
        Swal.fire({
          title: "This product is deleted",
          text: "If you edit this product, it will be activated again.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Activate product and edit"
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([`products/product-form/${selectedProduct.id}`])
          }
        });
      }    
      else{
        this.router.navigate([`products/product-form/${id}`])
      }
    }
  }

  imageError(event: Event):void{
    const image = event.target as HTMLImageElement;
    image.src = 'data:image/png;base64,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'
  }

  sortByProductName(array : ProductDisplay[]){
    array.sort((product1, product2) => { if (product1.name.toUpperCase() >product2.name.toUpperCase()){ return 1} else {return -1}})
  }

  getAProduct(id : number){
    this.productsService.getAProduct(id).subscribe(
      (response) =>{
        console.log(response)
        this.productsService.setProductForEdit(response)
      }
    )
  }

}
