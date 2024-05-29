const express = require('express')
const app = express()
const port = 8000

const escpos = require('escpos');
const usb = require('escpos-usb');

app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.get('/print', (req, res) => {

    const device = new usb.USB();

    const options = { encoding: "GB18030" /* Defina el conjunto de caracteres que corresponda a su necesidad */ };
    const printer = new escpos.Printer(device, options);
    
    device.open(function(error) {
      if (error) {
        console.error(error);
        return;
      }
      
      printer
        .font('a')
        .align('ct')
        .style('bu')
        .size(1, 1)
        .text('¡Hola, mundo!\n')
        .text('¡Esta es una impresión de prueba desde Node.js!\n')
        .cut()
        .close();
    });



    res.send('Mando la impresion')
  })









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})