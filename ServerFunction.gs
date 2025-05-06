function doGet() {
  const html = HtmlService.createTemplateFromFile('Main');
  const output = html.evaluate();
  return output;
}
function include(fileName){
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}
function createId(){
  let nId = 0;
  if(movimientos.getLastRow() === 1){
    nId = 1;
    return nId;
  }
  const ids = movimientos.getRange(2,1,movimientos.getLastRow()-1,1).getValues().map(id => id[0]);
  ids.forEach(id =>{
    if(id > nId){
      nId = id;
    }
  }
  );
  return nId+1;
}
function run(){
  //editRow(1,["11/04/2023",11,"Ingreso","cambio","abril2005"]);
  deleteRowById(6)
}
function getMovement() {
  var mov = consultasDB.getDataRange().getDisplayValues();
  mov.shift();
  return mov;
}
function getBalance(){
  var balanceM = balances.getRange(3,1,balances.getLastRow() - 2,balances.getLastColumn()).getDisplayValues();
  return balanceM; 
}

function editRow(id,data){
  console.log(id);
 /* for(let i=0;i<datos.length;i++){
    console.info("datos: "+datos[i][0])
    if(parseInt(datos[i][0]) === parseInt(id)){*/
      //const fila = i+2;
      const fila = getRowById(id);
      var ingreso = `=IF(D# = "Ingreso";C#;0)`;
      var gasto = `=IF(D# = "Gasto";C#;0)`;
      ingreso = ingreso.replaceAll("#",fila);
      gasto = gasto.replaceAll("#",fila);
      var values = [data[0],data[1],data[2],data[3],data[4],ingreso,gasto];
      console.log(values);
      console.log(values.length);
      console.info("Fila: "+fila);
      movimientos.getRange(fila,2,1,values.length).setValues([values]);
    /*  break;
    }
  }*/
}
function getRowById(id) {
  var datos = movimientos.getDataRange().getValues();
  datos.shift();
  console.info("ID: "+id)
  var fila = 0;
  for(let i=0;i<datos.length;i++){
    console.info("datos: "+datos[i][0])
    if(parseInt(datos[i][0]) === parseInt(id)){
      fila = i+2;
      break;
    }
  }
  console.info("Fila: "+fila);
  return fila;
}
function deleteRowById(id){
  const fila = getRowById(id);
  movimientos.deleteRow(fila);
}
function saveMovment(type,fecha,monto,etiqueta,mes){
  var ultiR = movimientos.getLastRow();
  var campoF = (ultiR+1)+"";
  var ingreso = `=IF(D# = "Ingreso";C#;0)`;
  var gasto = `=IF(D# = "Gasto";C#;0)`;
  ingreso = ingreso.replaceAll("#",campoF);
  gasto = gasto.replaceAll("#",campoF);
  console.error("Ingreso nuevo: "+ingreso);
  movimientos.appendRow([createId(),fecha,monto,type,etiqueta,mes,ingreso,gasto]);
}