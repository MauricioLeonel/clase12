//express
const express = require('express')
const app = express()
//rutas
const productos = require('./router/productos.js')
const index = require('./router/index.js')
//db
const db = require('./models/misproductos.js')
//para poder joinear la ruta ja
const path = require('path')
//importo los motores
const { engine } = require('express-handlebars')
const pug = require('pug');
const ejs = require('ejs');
//importo http para tener la instancia completa del server
const server = require('http').createServer(app)
//importo socket
const io = require('socket.io')(server)
//mensaje
const chats= [{ email: 'mauricio@emial.com',fecha:'30/6/2022, 15:00:09', mensaje: 'hola como estas' },
{ email: 'mauricio@emial.com',fecha:'30/6/2022, 15:00:56', mensaje: 'hola como estas2' }]

/*seteo los motores*/
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))


//direcctorio de las vistas
app.use(express.static('views'))
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
//uso la INSTANCIA DEL DB y lo paso en el middleware
app.use(function(req,res,next){
	req.db = db
	next()
})

//index para la carga de datos
app.use('/',index)
//plantillas
app.use('/api',productos)


//instancion socket
io.on('connection',async function(cliente){
	//agrego data
	cliente.on('envio',async data=>{
		const {title,price,thumbnail} = data
		const precio = parseFloat(price)
		const result = await db.save({title,precio,thumbnail})
		io.sockets.emit('agrego',{dir:'/layouts/main.handlebars',elementos:result})
	})
	//solo recargo data
	const elementos = await db.getAll()
	cliente.emit('agrego',{dir:'/layouts/main.handlebars',elementos:elementos})
	//envio data
	cliente.on('mensajeChat',(data)=>{
		chats.push(data)
		io.sockets.emit('mensajesChat',chats)

	})
	//solo recargo data
	cliente.emit('mensajesChat',chats)
})




server.listen('8080',()=>{
	console.log('todo perfecto')
})