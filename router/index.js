const express = require('express')
const rutas = express.Router()
	
rutas.get('/',(req,res)=>{
	res.sendFile('index.html')
	// res.render('home')
})



module.exports = rutas