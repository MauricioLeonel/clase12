const socket = io.connect();

const envioFormu = function(e){
	e.preventDefault()
	e.stopPropagation()
	const {title,price,thumbnail} =e.target
	socket.emit('envio',{title:title.value,price:price.value,thumbnail:thumbnail.value})

}
const envioFormuChat= function(e){
	e.preventDefault()
	e.stopPropagation()
	const {email:{value:email},mensaje:{value:mensaje}} =e.target
	const fecha = new Date(Date.now())
	socket.emit('mensajeChat',{email,fecha:fecha.toLocaleString(),mensaje})
}

document.getElementById('formu').addEventListener('submit',(e)=>{envioFormu(e)})
document.getElementById('formuChat').addEventListener('submit',(e)=>{envioFormuChat(e)})

const envioData = async (data)=>{
	const template = await fetch(data.dir)
	const text = await template.text()
	const templateRender = Handlebars.compile(text);
	const html = templateRender({ data:data.elementos })
	document.getElementById('elementosRender').innerHTML = html
}

const envioMensaje = (data)=>{
	document.getElementById('chatContenedor').innerHTML = ''
	data.map(e=>{
		document.getElementById('chatContenedor').innerHTML +=`<span class="email">${e.email}</span> [<span class="fecha">${e.fecha}</span>]: <span class="mensaje">${e.mensaje}</span> </br>` 
	})
}

socket.on('agrego',envioData)

socket.on('mensajesChat',envioMensaje)





