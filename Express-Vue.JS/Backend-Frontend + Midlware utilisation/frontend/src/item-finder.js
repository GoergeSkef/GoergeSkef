// Install dependency by running: npm install jwt-decode
const jwtDecode = require('jwt-decode')

const networkDelayInMs = 10
const rootPath = "http://localhost:3000"

let accessToken = null

async function sendRequest(method, uri, body=null, contentType="application/json"){
	
	let bodyToSend = ""
	const headers = new Headers()
	
	// Add the access token if signed in.
	if(accessToken != null){
		headers.append("Authorization", "Bearer "+accessToken)
	}
	
	// Add the body if available.
	if(body != null){
		
		headers.append("Content-Type", contentType)
		
		switch(contentType){
			
			case "application/json":
				bodyToSend = JSON.stringify(body)
				break
			
			case "application/x-www-form-urlencoded":
				const data = new URLSearchParams()
				for(const key of Object.keys(body)){
					data.append(key, body[key])
				}
				bodyToSend = data.toString()
				break
			
			default:
				alert("ERROR, unknown Content-Type to send body with.")
			
		}
		
	}
	
	try{
		
		const requestInit = {
			method,
			headers,
			credentials: "omit"
		}
		
		if(bodyToSend != ""){
			requestInit.body = bodyToSend
		}
		
		await sleep(networkDelayInMs)
		return await fetch(rootPath+uri, requestInit)
		
	}catch(error){
		throw ["networkError"] 
	}
	
}

function displayError(response){
	
	alert(`
		SDK has not been programmed to handle status code ${response.status}
		for the last request sent.
	`)
	
}

module.exports.getAllAccounts = async function(callback){
	
	let response
	
	try{
		response = await sendRequest("GET", "/accounts")
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let accounts = []
	
	switch(response.status){
		
		case 200:
			accounts = await response.json()
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, accounts)
	
}

module.exports.getAccountById = async function(id, callback){
	
	let response
	
	try{
		response = await sendRequest("GET", "/accounts/"+id)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let account = null
	
	switch(response.status){
		
		case 200:
			account = await response.json()
			break
		
		case 404:
			errors = ["notFound"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, account)
	
}

module.exports.createAccount = async function(account, callback){
	
	let response
	
	try{
		response = await sendRequest("POST", "/accounts", account)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let id = -1
	
	switch(response.status){
		
		case 201:
			const locationHeader = response.headers.get("Location")
			id = parseInt(locationHeader.substr("/accounts/".length))
			break
		
		case 400:
			errors = await response.json()
			break
		
		case 422:
			errors = ["invalidAccount"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, id)
	
}



module.exports.signIn = async function(username, password, callback){
	
	const bodyToSend = {
		username,
		password,
		grant_type: "password"
	}
	
	let response
	
	try{
		response = await sendRequest("POST", "/tokens", bodyToSend, "application/x-www-form-urlencoded")
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let account = {
		id: -1,
		username: ""
	}
	
	let body
	
	switch(response.status){
		
		case 200:
			
			body = await response.json()
			
			accessToken = body.access_token
			
			const payload = jwtDecode(body.id_token)
			account.id = payload.sub
			account.username = payload.preferred_username
			
			break
		
		case 400:
			
			body = await response.json()
			
			switch(body.error){
				
				case "invalid_grant":
					errors = ["wrongCredentials"]
					break
				
				default:
					errors = ["unknownErrorGettingToken: "+body.error]
					alert(`
						SDK has not been programmed to handle error ${body.error}
						when failing to login.
					`)
				
			}
			
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, account)
	
}

module.exports.signOut = async function(callback){
	accessToken = null
	callback()
}



module.exports.getAllItems = async function(callback){
	
	let response
	
	try{
		response = await sendRequest("GET", "/items")
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let items = []
	
	switch(response.status){
		
		case 200:
			items = await response.json()
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, items)
	
}

module.exports.getItemsByAccountId = async function(accountId, callback){
	
	let response
	
	try{
		response = await sendRequest("GET", "/items?accountId="+accountId)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let items = []
	
	switch(response.status){
		
		case 200:
			items = await response.json()
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, items)
	
}

module.exports.getItemById = async function(id, callback){
	
	let response
	
	try{
		response = await sendRequest("GET", "/items/"+id)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let item = null
	
	switch(response.status){
		
		case 200:
			item = await response.json()
			break
		
		case 404:
			errors = ["notFound"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, item)
	
}

module.exports.createItem = async function(item, callback){
	
	let response
	
	try{
		response = await sendRequest("POST", "/items", item)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let id = -1
	
	switch(response.status){
		
		case 201:
			const locationHeader = response.headers.get("Location")
			id = parseInt(locationHeader.substr("/items/".length))
			break
		
		case 400:
			errors = await response.json()
			break
		
		case 401:
			errors = await response.json()
			break
		
		case 422:
			errors = ["invalidItem"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, id)
	
}

module.exports.updateItemById = async function(id, item, callback){
	
	let response
	
	try{
		response = await sendRequest("PUT", "/items/"+id, item)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	
	switch(response.status){
		
		case 204:
			break
		
		case 400:
			errors = await response.json()
			break
		
		case 401:
			errors = await response.json()
			break
		
		case 404:
			errors = ["notFound"]
			break
		
		case 422:
			errors = ["invalidItem"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors)
	
}

module.exports.deleteItemById = async function(id, callback){
	
	let response
	
	try{
		response = await sendRequest("DELETE", "/items/"+id)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	
	switch(response.status){
		
		case 204:
			break
		
		case 401:
			errors = await response.json()
			break
		
		case 404:
			errors = ["notFound"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors)
	
}




//COMMENTS
module.exports.getAllComments = async function(callback){
	
	let response
	
	try{
		response = await sendRequest("GET", "/comments")
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let comments = []
	
	switch(response.status){
		
		case 200:
			comments = await response.json()
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, comments)
	
}

module.exports.getCommentsByAccountId = async function(accountId, callback){
	
	let response
	
	try{
		response = await sendRequest("GET", "/comments?accountId="+accountId)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let comments = []
	
	switch(response.status){
		
		case 200:
			comments = await response.json()
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, comments)
	
}

module.exports.getCommentById = async function(id, callback){
	
	let response
	
	try{
		response = await sendRequest("GET", "/comments/"+id)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let comment = null
	
	switch(response.status){
		
		case 200:
			comment = await response.json()
			break
		
		case 404:
			errors = ["notFound"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, comment)
	
}

module.exports.createComment = async function(comment, callback){
	
	let response
	
	try{
		response = await sendRequest("POST", "/comments", comment)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	let id = -1
	
	switch(response.status){
		
		case 201:
			const locationHeader = response.headers.get("Location")
			id = parseInt(locationHeader.substr("/comments/".length))
			break
		
		case 400:
			errors = await response.json()
			break
		
		case 401:
			errors = await response.json()
			break
		
		case 422:
			errors = ["invalidComment"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors, id)
	
}

module.exports.updateCommentById = async function(id, comment, callback){
	
	let response
	
	try{
		response = await sendRequest("PUT", "/comments/"+id, comment)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	
	switch(response.status){
		
		case 204:
			break
		
		case 400:
			errors = await response.json()
			break
		
		case 401:
			errors = await response.json()
			break
		
		case 404:
			errors = ["notFound"]
			break
		
		case 422:
			errors = ["invalidComment"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors)
	
}

module.exports.deleteCommentById = async function(id, callback){
	
	let response
	
	try{
		response = await sendRequest("DELETE", "/comments/"+id)
	}catch(errors){
		callback(errors)
		return
	}
	
	let errors = []
	
	switch(response.status){
		
		case 204:
			break
		
		case 401:
			errors = await response.json()
			break
		
		case 404:
			errors = ["notFound"]
			break
		
		case 500:
			errors = ["backendError"]
			break
		
		default:
			displayError(response)
		
	}
	
	callback(errors)
	
}


async function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}