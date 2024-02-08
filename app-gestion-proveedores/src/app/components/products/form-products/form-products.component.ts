import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from '../../../services/products-service.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { Supplier } from '../../../models/supplier';
import { ProductDisplay } from '../../../models/productDisplay';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})
export class FormProductsComponent implements OnInit{

  constructor(public productsService: ProductsServiceService, private categoryService: CategoryService, private route:ActivatedRoute, private router:Router){}

  parametroURL : string = ''
  formTitle : string = "Create product"

  product = {};

  suppliersList : Supplier[] = [];
  products : ProductDisplay[] = [];

  categories : any[] = []

  disabledInEdit : boolean = false;

  skuRepetido = false;

  saveButtonPressed : boolean = false

  categorias : string[] = []

  ngOnInit(): void {
    this.parametroURL = this.route.snapshot.params['edit'];
    this.getSuppliers();
    this.getProducts();
    this.getCategories();
    if(this.parametroURL) {
      this.setEditForm();
    }
    else{
      this.productsService.clearProductData()
    }
  }

  getSuppliers(){
    this.productsService.getSuppliersList().subscribe((response)=>{
      this.suppliersList = response;
      this.suppliersList = this.suppliersList.filter(item => item.deleted == false)
    })
  }

  getProducts(){
    this.productsService.getProducts().subscribe((response)=>{
      this.products = response;
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories = response.filter((item: any)=> item.deleted == false);
    })
  }

  setEditForm(){
    this.formTitle = "Edit Product";
    this.getAProduct(Number(this.parametroURL));
    this.disabledInEdit = true;

  }

  getAProduct(id : number){
    this.productsService.getAProduct(id).subscribe(
      (response) =>{
        console.log(response)
        this.productsService.setProductForEdit(response)
      }
    )
  }

  //Create product clicked
  onClickForm(formularioProveedores:NgForm){
    this.saveButtonPressed = true
    if(formularioProveedores.valid && !this.skuRepetido){
      if(this.parametroURL){
        this.productsService.editProduct(this.parametroURL).subscribe( {
          next:(data) =>{
          this.productsService.clearProductData()
          this.router.navigate(["products"])
          Swal.fire("The product data was edited successfully");
        },
        error: (error) =>{
          Swal.fire({
            title: "Product not edited",
            text: "There was an error! The product data could not be edited",
            icon: "error"
          })
        }})
      } else {
        this.productsService.saveProduct().subscribe( {
          next:(data) =>{
          this.productsService.clearProductData()
          this.router.navigate(["products"])
          Swal.fire("The product data was saved successfully");
        },
        error: (error) =>{
          console.log(error);
          Swal.fire({
            title: "Product not saved",
            text: "There was an error! The product could not be saved",
            icon: "error"
          })
        }
      })
      }

    } else {
      Swal.fire({
        text: "There are incomplete or incorrect fields. Please check the form.",
        icon: "warning"
      });    }
  }

  skuIsUnique(event : Event){
    const currentSku = (event.target as HTMLSelectElement).value;
    const productsSKUs = this.products.map(item=> item.sku)
    this.skuRepetido = productsSKUs.includes(currentSku);
  }

  cancel(objetivo: string){
    Swal.fire({
      text: "Are you sure you want to exit? The modifications won't be saved",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Leave this page",
      cancelButtonText: "Stay in this page"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([objetivo])
      }
    });
  }

  //Add a new sector
  addCategoryModal(){
    Swal.fire({
      title: "New category",
      text: "Write a new category",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Save category",
      allowOutsideClick: () => !Swal.isLoading(),
      inputValidator: (value): any => {
        if (value == '') {
          return "You need to write something!";
        } else if (this.categories.some(item => (item.name.toUpperCase() === value.toUpperCase())&& item.deleted == false)){
          return "That category name already exists!";
        }
      }
    }).then((result) => {
      const exists = this.categories.some(item => item.name === result.value);
      if (result.isConfirmed && !exists) {
        this.categoryService.saveCategory(result.value).subscribe( {
          next:(data) =>{
          Swal.fire({
            text: `The Category "${data.name}" has been saved`,
          });
          this.productsService.product.category.name = data.name;
          this.getCategories();
        },
        error: (error) =>{
          console.log(error);
          Swal.fire({
            title: "Category not created",
            text: "There was an error! The category could not be created",
            icon: "error"
          })
        }})
      }
    });
  }

  //Edit or delete a category
  EditCategoryModal(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        denyButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: true
    });
    
    const options = Object.fromEntries(this.categories.map(item => [item.id, item.name]))
    swalWithBootstrapButtons.fire({
      title: "Edit or Delete Category",
      text: "Select a category to delete",
      input: "select",
      inputOptions: options,
      inputPlaceholder: "Select a category to edit or delete",
      showDenyButton: true,
      returnInputValueOnDeny: true,
      showCancelButton: true,
      confirmButtonText: "Edit category",
      denyButtonText: "Delete category",
      allowOutsideClick: () => !Swal.isLoading(),
      inputValidator: (value): any => {
        if (value == '') {
          return "You need to choose something!";
        }
      }
    }).then((result) => {
      const chosenOption = this.categories.find(item => item.id == result.value).name
      const chosenOptionId = result.value
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Edit category name",
          text: "Write a new name for the category: " + chosenOption,
          showCancelButton: true,
          confirmButtonText: "Accept new name",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.categoryService.changeCategoryName(chosenOptionId, result.value).subscribe( {
              next:(data) => 
            {
              console.log(result);
              Swal.fire({
                title: "Category edited",
                text: "The category has been edited",
                icon: "success"
              });
              this.getCategories();
            },
            error: (error) =>{
              console.log(error);
              Swal.fire({
                title: "Category not edited",
                text: "There was an error! The category could not be edited",
                icon: "error"
              })
          }})
          }
        });
      }
      else if (result.isDenied) {
        swalWithBootstrapButtons.fire({
          title: `Are you sure you want to delete "${chosenOption}"?`,
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d63043",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            this.categoryService.logicalDeleteCategory(chosenOptionId).subscribe( {
              next:(data) =>
            {
              Swal.fire({
                text: `Category "${data.name}" has been deleted`,
              });
              this.getCategories();
            },
            error: (error) =>{
              console.log(error);
              Swal.fire({
                title: "Category not deleted",
                text: "There was an error! The category could not be deleted",
                icon: "error"
              })
          }})
          }
        })
      };
    })
  }
}


