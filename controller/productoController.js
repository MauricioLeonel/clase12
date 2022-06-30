const productoGet = async (req,res)=>{
	const data = await req.db.getAll()
	res.render('handlebars/productoshandle.handlebars',{data})
}
const productoGetPug = async (req,res)=>{
	const data = await req.db.getAll()
	res.render('pug/main.pug',{data})
}
const productoGetEjs = async (req,res)=>{
	const data = await req.db.getAll()
	res.render('ejs/productosEJS.ejs',{data})
}
const nuevoProducto = async (req,res)=>{
	// console.log('entra')
	const {body:{title,price,thumbnail}} = req
	const precio = parseFloat(price)
	const data = await req.db.save({title,precio,thumbnail})
	res.redirect('/')
}

module.exports= {productoGet,productoGetPug,productoGetEjs,nuevoProducto}