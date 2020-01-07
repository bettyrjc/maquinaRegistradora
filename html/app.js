
// como vn a lucir los productos
class Product {
   constructor(name, price, year){
      this.name = name;
      this.price = price;
      this.year = year;
   }
}
// agregar algo dentro de la interfaz, listarlos.
class UI{
   // este metodo para que acceda al dom o html, para agregarlo al div.
   // Este product accedera al product del evento submit
   addProduct(product){
      const product_list = document.getElementById('product-list');
      const element = document.createElement('div')
      {/* listar el producto que estoy obteniendo */}
      element.innerHTML = `
         <div class="card text-center mb-4 ">
            <div class="card-body">
               <strong>Nombre</strong>: ${product.name}
               <strong>Precio</strong>: ${product.price}
               <strong>Año</strong>: ${product.year}
               <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
         </div>
    `
    product_list.appendChild(element);
   //  Manera dos dde resetear el formulario.
   //  this.resetForm();
   }
   resetForm(){
      document.getElementById('product-form').reset();
   }
   deleteProduct(element){
      if(element.name === 'delete'){
         // el producti list debe eliminar es a la tarjeta, el enlace es hijo del product list y el product list es hijo de la tarjeta, por ende debe eliminar al padre.
         // console.log(element.parentElement.parentElement.parentElement.remove())
         element.parentElement.parentElement.parentElement.remove()
         this.showMessage('Product deleted successfully', 'info')
      }
   }
   showMessage(message, cssClass){
         const div= document.createElement('div');

         div.className = `alert alert-${cssClass} mt-2`;

         div.appendChild(document.createTextNode(message));
         // Mostrando en el dom
         const container = document.querySelector('.container');
         const app = document.querySelector('#app');
         container.insertBefore(div, app);

         setTimeout(() => {
            document.querySelector('.alert').remove()
         }, 3000);
   }
   
}

// Dom eventos, la interaccion del usuario
// Boton save
document.getElementById('product-form')
   .addEventListener('submit', function(e){
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      const year = document.getElementById('year').value;
      // .log(name, price, year)
      const product = new Product(name, year, price);
      const ui = new UI();

      if(name === '' || year === '' || price ===''){
         // si se coloca sin el return lanza los dos message el de danger y el succes, con el return, muere ahi.
        return  ui.showMessage('complete field','danger' )
      }

      ui.addProduct(product);
      // una manera de resetear el formulario, dejarlo en blanco.
      ui.resetForm();
      ui.showMessage('Producto agregado, bien hecho', 'success')
      // .log(new Product(name, price, year))
      // cancelar el comportamiento por defecto
      e.preventDefault();
   })
   // Boton de eliminar

   document.getElementById('product-list').addEventListener('click', function(e){
      // alert('eliminando')
      //  ver que esta capturando
      // console.log(e.target)
      const ui = new UI ();
      ui.deleteProduct(e.target)

   })

