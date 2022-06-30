const express = require('express')
const rutas = express.Router()
const productoController = require('../controller/productoController.js')

// la basura de handlebars funca sin hacer el layout, sin el {{{body}}} 
//use la misma ruta layouts para hacer los estilos
rutas.get('/productos/handlebars',productoController.productoGet)
rutas.get('/productos/pug',productoController.productoGetPug)
rutas.get('/productos/ejs',productoController.productoGetEjs)
rutas.post('/productos',productoController.nuevoProducto)


module.exports = rutas


//esto es de lo anterior


/*rutas.get('/productos/:id',async (req,res)=>{
	const data = await req.db.getById(req.params.id)
	console.log(data)
	if(data.message){
		res.json({error:data.message})
	}else{
		res.json(data)
	}
})
rutas.post('/productos',async (req,res)=>{
	// console.log('entra')
	const {body:{title,price,thumbnail}} = req
	const precio = parseFloat(price)
	const data = await req.db.save({title,precio,thumbnail})
	res.send(req.body)
})
rutas.put('/productos/:id',async (req,res)=>{
	const {body:{title,price,thumbnail}} = req
	const data = await req.db.updateById({title,price,thumbnail,id:parseInt(req.params.id)})
	if(data.message){
		res.json({error:data.message})
	}else{
		res.send(data)
	}

	
})
rutas.delete('/productos/:id',async (req,res)=>{
	const data = await req.db.borrarById(parseInt(req.params.id))
	if(data.message){
		res.send(data.message)
	}else{
		res.send(data)
	}
})*/