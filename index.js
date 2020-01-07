
class Table {
  constructor(unid,codigo,item, price, total){
    this.unid = unid;
    this.codigo = codigo;
    this.item = item;
    this.price = price;
    this.total = total;
  }
}
class TicketForm {
  constructor(cedula, nombreTicket, apellidoticket, direccionitem, telefonoitem){
    this.cedula= cedula;
    this.nombreTicket = nombreTicket;
    this.apellidoticket = apellidoticket;
    this.direccionitem = direccionitem;
    this.telefonoitem = telefonoitem;

  }
}

class UI {
  addTicket(item){
    const ticketDatos = document.getElementById('section_datos');
    const div = document.createElement('div')
    div.innerHTML = `
    <h5 class="text-center text-primary pt-2 pb-2">Datos del cliente</h5>
    <h6  class="pl-2" id="name_fact">Nombre: ${item.nombreTicket}  ${item.apellidoticket}</h6>
    <p  class="pl-2" id="cedula_item"> <strong>Cedula:</strong> ${item.cedula}</p>
    <p  class="pl-2" id="direccion"> <strong>Direccion:</strong>${item.direccionitem}</p>
    <p  class="pl-2" id="telefono"> <strong>Telefono:</strong> ${item.telefonoitem}</p>
    `
    ticketDatos.appendChild(div)
  };
  clearItemFields(){
    document.getElementById('cedula').value = '';
    document.getElementById('name').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('location').value = '';
    document.getElementById('phone').value = '';
  }
  addList(list){
    const tabla = document.getElementById('table_products');
    const tr = document.createElement('tr')
    tr.innerHTML=`
      <td>${list.unid} </td>
      <td>${list.codigo} </td>
      <td>${list.item} </td>
      <td>${list.price} $ </td>  
      <td>${list.total} $ </td>     
      `;
    
    tabla.appendChild(tr)
  }

  clearListFields(){
    document.getElementById('cantidad_imput').value = ''
    document.getElementById('codigo_list').value = ''
    document.getElementById('item_name').value = ''
    document.getElementById('price_items').value = ''


  }
  showAlert(message, cssClass){
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
  addPrice (total){
    const precio = document.getElementById('price_total');
    precio.innerHTML = `${total} $`
  }
// ticket
}

var total_products= [];
    
function fuck(unid,codigo,item, price, total){
  let total_items = {}
      total_items.unid=unid
      total_items.codigo=codigo
      total_items.item=item
      total_items.price=price
      total_items.total=total
      total_products.push({total_items})
  return total_products
}


document.getElementById('form_section_factura')
  .addEventListener('submit', function(e){
  console.log('click');

  const cedula = document.getElementById('cedula').value,
        nombreTicket = document.getElementById('name').value,
        apellidoticket = document.getElementById('lastname').value,
        direccionitem = document.getElementById('location').value,
        telefonoitem = document.getElementById('phone').value;

   const ticket = new TicketForm(cedula, nombreTicket, apellidoticket, direccionitem, telefonoitem)
   // ui.clearItemFields(
     // Instantiate UI
     const ui = new UI();
     
console.log(ui);
console.log(ticket);

if (cedula === '' ||nombreTicket ===' '||apellidoticket===''||direccionitem ===''||telefonoitem ==='' )
{
  ui.showAlert('Please, fill in all fields', 'danger')
}
else{
  ui.showAlert('List added!', 'success')
  ui.addTicket(ticket);
  ui.clearItemFields();
  imprimir(ticket)
}
function imprimir(item){
  const modal_ticket_content = document.getElementById('modal_write');
  const div = document.createElement('div');
  div.innerHTML = `
    <h5 class="text-center text-primary pt-2 pb-2">Datos del cliente</h5>
    <h6  class="pl-2" id="name_fact">Nombre: ${item.nombreTicket}  ${item.apellidoticket}</h6>
    <p  class="pl-2" id="cedula"> <strong>Cedula:</strong> ${item.cedula}</p>
    <p  class="pl-2" id="direccion"> <strong>Direccion:</strong>${item.direccionitem}</p>
    <p  class="pl-2" id="telefono"> <strong>Telefono:</strong> ${item.telefonoitem}</p>
    `
    modal_ticket_content.appendChild(div)
  
}
e.preventDefault();
})

document.getElementById('form_section_products').addEventListener('submit',function(e){
  e.preventDefault()
 
  const unid = parseInt(document.getElementById('cantidad_imput').value)
  const codigo = document.getElementById('codigo_list').value
  const item = document.getElementById('item_name').value
  const price = parseInt(document.getElementById('price_items').value)

  const total = parseInt(unid * price) 

  const product = new Table(unid,codigo,item, price, total);

  console.log(fuck(unid,codigo,item, price, total))
  console.log(product);
  console.log(total_products.length)

    var monto_inicial = null;
      total_products.length > 0 ?
      total_products.map(item => {
      let monto_final = (monto_inicial + item.total_items.total)
         monto_inicial = monto_final 
         console.log(monto_inicial);
      }): console.log(monto_inicial);
       
    const ui = new UI();
    
    if (unid === '' ||codigo ===' '||item===''||price ==='')
    {
      ui.showAlert('Please, fill in all fields', 'danger')
    }
    else{
      ui.showAlert('List added!', 'success')
      ui.addList(product);
      ui.addPrice (monto_inicial)
      ui.clearListFields()
      imprimir(product)
      addModalTotal (monto_inicial)
    }
    // modal de imprimir
  function imprimir(list){
    const modal_ticket_content = document.getElementById('modal_write_tabla');
    const tr = document.createElement('tr')
    tr.innerHTML=`
      <td>${list.id} </td>
      <td>${list.unid} </td>
      <td>${list.codigo} </td>
      <td>${list.item} </td>
      <td>${list.price} $ </td>  
      <td>${list.total} $ </td>     
    `;
    modal_ticket_content.appendChild(tr)
  }
  function  addModalTotal (total) {
    const precio = document.getElementById('modal_write_total');
    precio.innerHTML = `Total ${total}`
  }
})



