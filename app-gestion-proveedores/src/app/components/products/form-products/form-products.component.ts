import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from '../../../services/products-service.service';
import { proveedor } from '../../../models/proveedoresVIEJO';
import { producto } from '../../../models/producto';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})
export class FormProductsComponent implements OnInit{

  constructor(public productsService: ProductsServiceService, private categoryService: CategoryService, private route:ActivatedRoute, private router:Router){}

  parametroURL : string = ''
  tituloFormulario : string = "Agregar Producto"

  product = {};

  suppliersList : proveedor[] = [];
  productos : producto[] = [];

  categories : any[] = []

  disabledInEdit : boolean = false;

  skuRepetido = false;

  categorias : string[] = [ "Art. Oficina", "Catering", "Electrónicos", "Papelería", "Reparaciones", "Servicios"]

  ngOnInit(): void {
    this.parametroURL = this.route.snapshot.params['edit'];
    this.getProveedores();
    this.getProductos();
    this.getCategories();
    if(this.parametroURL) {
      this.setEditForm();
    }
    else{
      this.productsService.clearProductData()
    }
  }

  getProveedores(){
    this.productsService.getSuppliersList().subscribe((response)=>{
      this.suppliersList = response;
      this.suppliersList = this.suppliersList.filter(item => item.deleted == false)
    })
  }

  getProductos(){
    this.productsService.getProducts().subscribe((response)=>{
      this.productos = response;
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories = response.filter((item: any)=> item.deleted == 0);
    })
  }

  setEditForm(){
    this.tituloFormulario = "Editar Producto";
    this.getAProduct(this.parametroURL);
    this.disabledInEdit = true;

  }

  getAProduct(id : string){
    this.productsService.getAProduct(id).subscribe(
      (response) =>{
        console.log(response)
        this.productsService.setProductForEdit(response)
      }
    )
  }

  onClickForm(formularioProveedores:NgForm){
    if(formularioProveedores.valid && !this.skuRepetido){
      if(this.parametroURL){
        this.productsService.editProduct(this.parametroURL).subscribe((response)=> console.log(response))
      } else {
        this.productsService.saveProduct().subscribe((response)=> console.log(response))
      }
      this.productsService.clearProductData()
      this.router.navigate(["productos"])
      Swal.fire("Los datos del producto fueron cargados exitosamente");
    } else {
      Swal.fire({
        text: "Hay campos incompletos o erróneos. Por favor, revise el formulario",
        icon: "warning"
      });    }
  }

  skuIsUnique(event : Event){
    const currentSku = (event.target as HTMLSelectElement).value;
    const productosSKUs = this.productos.map(item=> item.SKUProducto)
    this.skuRepetido = productosSKUs.includes(currentSku);
  }

  cancelar(objetivo: string){
    Swal.fire({
      text: "¿Seguro desea salir? Los datos se perderán",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar"
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
        this.categoryService.saveCategory(result.value).subscribe((result)=> console.log(result))
        Swal.fire({
          text: `The Category "${result.value}" has been saved`,
        });
        this.getCategories();
      }
    });
  }

    //Delete a category
    deleteCategoryModal(){
      const options = Object.fromEntries(this.categories.map(item => [item.id, item.name]))
      Swal.fire({
        title: "Delete Category",
        text: "Select a category to delete",
        input: "select",
        inputOptions: options,
        inputPlaceholder: "Select a category",
        showCancelButton: true,
        confirmButtonText: "Delete category",
        allowOutsideClick: () => !Swal.isLoading(),
        inputValidator: (value): any => {
          if (value == '') {
            return "You need to choose something!";
          }
        }
      }).then((result) => {
        if (result.isConfirmed && result.value != '') {
          const chosenOption = this.categories.find(item => item.id == result.value).name
          this.categoryService.logicalDeleteCategory(result.value).subscribe((result)=> console.log(result))
          Swal.fire({
            text: `Category "${chosenOption}" has been deleted`,
          });

          //No alcanza con llamar de nuevo a las categorías para refrescar. Se ve que se tarda mucho en actualizar todo. Voy a hacer el cambio en el front en paralelo.
          this.categories = this.categories.filter(item => item.id !=result.value)
        }
      });
    }

}

