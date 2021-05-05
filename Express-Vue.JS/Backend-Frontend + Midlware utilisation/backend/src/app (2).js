const express  = require('express')
const hasTypes = require('./has-types')
const router = express.Router()
const multer = require('multer')


const db = require('./db')
const jwt = require('jsonwebtoken')

// Constants used for validation of resources.
const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 9
const MIN_PASSWORD_LENGTH = 6 // Should be higher, is low to facilitate testing.

const TITLE_MIN_LENGTH = 4
const TITLE_MAX_LENGTH = 50
const DESCRIPTION_MIN_LENGTH = 15
const DESCRIPTION_MAX_LENGTH = 500

const ACCESS_TOKEN_SECRET = "sdfsdsd4flkjdsflkdsj"
const ID_TOKEN_SECRET = "fdkjjlpadfglfd6kyeu"

// The application.
const app = express()
app.use(express.static("public"))
// Enable CORS.
app.use(function(request, response, next){
	
	// Allow any client to do anything (not optimal!).
	response.setHeader("Access-Control-Allow-Origin", "*")
	
	// Firefox still don't support wildcards, so let's do this the hard way.
	// https://stackoverflow.com/a/13147554/2104665
	response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
	if(request.header("Access-Control-Request-Headers")){
		response.setHeader(
			"Access-Control-Allow-Headers",
			request.header("Access-Control-Request-Headers")
		)
	}
	response.setHeader("Access-Control-Expose-Headers", "Location")
	
	next()
	
})

// Try to extract info from potential access token in the request.
app.use(function(request, response, next){
	
	try{
		
		const authorizationHeader = request.get("Authorization")
		const accessToken = authorizationHeader.substr("Bearer ".length)
		
		jwt.verify(accessToken, ACCESS_TOKEN_SECRET, function(error, payload){
			if(error){
				console.log(`Retrieved invalid access token "${accessToken}".`)
			}else{
				request.accountId = payload.accountId
			}
			next()
		})
		
	}catch(error){
		next()
	}
	
})

// Add middleware to parse the boyd in incoming HTTP requests.
app.use(express.json())
app.use(express.urlencoded({
	extended: false
}))

app.use("/uploads", express.static("../public/uploads"))

// Requests for account resources.
app.get("/accounts", function(request, response){
	db.getAllAccounts(function(errors, accounts){
		if(errors.length == 0){
			accounts.forEach(account => delete account.password)
			response.status(200).json(accounts)
		}else{
			response.status(500).end()
		}
	})
})

app.get("/accounts/:id", function(request, response){
	
	const id = request.params.id
	
	db.getAccountById(id, function(errors, account){
		if(errors.length == 0){
			if(account){
				delete account.password
				response.status(200).json(account)
			}else{
				response.status(404).end()
			}
		}else{
			response.status(500).end()
		}
	})
	
})

app.post("/accounts", function(request, response){
	
	const account = request.body
	
	// Check that the account contains all expected properties.
	const accountTypes = {
		username: String,
		password: String
	}
	
	if(!hasTypes(account, accountTypes)){
		response.status(422).end()
		return
	}
	
	// Validate the account.
	const validationErrors = []
	
	if(account.username.length < USERNAME_MIN_LENGTH){
		validationErrors.push("usernameTooShort")
	}else if(USERNAME_MAX_LENGTH < account.username.length){
		validationErrors.push("usernameTooLong")
	}
	
	if(account.password.length < MIN_PASSWORD_LENGTH){
		validationErrors.push("passwordTooShort")
	}
	
	if(0 < validationErrors.length){
		response.status(400).json(validationErrors)
		return
	}
	
	// Try to create the account.
	db.createAccount(account, function(errors, id){
		if(errors.length == 0){
			response.setHeader("Location", "/accounts/"+id)
			response.status(201).end()
		}else if(errors.includes("usernameTaken")){
			response.status(400).json(errors)
		}else{
			response.status(500).end()
		}
	})
	
})


// Requests for token resources.
app.post("/tokens", function(request, response){
	
	const grantInfo = request.body
	
	// Check that grantInfo contains all expected properties.
	const grantInfoTypes = {
		grant_type: String,
		username: String,
		password: String
	}
	
	if(!hasTypes(grantInfo, grantInfoTypes)){
		response.status(400).json({error: "invalid_request"})
		return
	}
	
	// Check that the grant type is supported.
	if(grantInfo.grant_type != "password"){
		response.status(400).json({error: "unsupported_grant_type"})
		return
	}
	
	db.getAccountByUsername(grantInfo.username, function(errors, account){
		if(errors.includes("databaseError")){
			response.status(500).end()
		}else if(!account){
			response.status(400).json({error: "invalid_grant"})
		}else if(account.password != grantInfo.password){
			response.status(400).json({error: "invalid_grant"})
		}else{
			
			// Generate and send back access token + id token.
			const accessToken = jwt.sign({
				accountId: account.id
			}, ACCESS_TOKEN_SECRET)
			
			const idToken = jwt.sign({
				sub: account.id,
				preferred_username: account.username
			}, ID_TOKEN_SECRET)
			
			response.status(200).json({
				token_type: "Bearer",
				access_token: accessToken,
				id_token: idToken
			})
			
		}
	})
	
})


// Requests for item resources.
app.get("/items", function(request, response){
	
	if(request.query.accountId){
		
		const accountId = request.query.accountId
		
		db.getItemsByAccountId(accountId, function(errors, items){
			if(errors.length == 0){
				response.status(200).json(items)
			}else{
				response.status(500).end()
			}
		})
		
	}else{
	
		db.getAllItems(function(errors, items){
			if(errors.length == 0){
				response.status(200).json(items)
			}else{
				response.status(500).end()
			}
		})
		
	}
})

app.get("/items/:id", function(request, response){
	
	const id = request.params.id
	
	db.getItemById(id, function(errors, item){
		if(errors.length == 0){
			if(item){
				response.status(200).json(item)
			}else{
				response.status(404).end()
			}
		}else{
			response.status(500).end()
		}
	})
	
})




	const uploading = multer({
		dest: __dirname + './../public/uploads/',
	})

	app.post("/uploadImage", uploading.single("images"), function(request, response){
		const ImageUrl = request.file.path.split("\\public\\")[1]
		const file= request.file
		console.log({file})
		response.json(ImageUrl) 
	})
		


  app.post("/items", function(request, response){

	const item = request.body
	

	// Check that the item contains all expected properties.
	const itemTypes = {
		accountId: Number,
		title: String,
		description: String,
		images: String,
		
	}
	
	if(!hasTypes(item, itemTypes)){
		response.status(422).end()
		return
	}
	
	// Check authorization.
	const accountId = request.accountId
	if(!accountId){
		response.status(401).json(["notAuthenticated"])
		return
	}else if(item.accountId != accountId){
		// Not creator of item.
		response.status(401).json(["notAuthorized"])
		return
	}
	
	// Validate the item.
	const validationErrors = []
	
	if(item.title.length < TITLE_MIN_LENGTH){
		validationErrors.push("titleTooShort")
	}else if(TITLE_MAX_LENGTH < item.title.length){
		validationErrors.push("titleTooLong")
	}
	
	if(item.description.length < DESCRIPTION_MIN_LENGTH){
		validationErrors.push("descriptionTooShort")
	}else if(DESCRIPTION_MAX_LENGTH < item.description.length){
		validationErrors.push("descriptionTooLong")
	}

	
	if(0 < validationErrors.length){
		response.status(400).json(validationErrors)
		return
	}
	
	// Try to create the item.
	db.createItem(item, function(errors, id){
		if(errors.length == 0){
			response.setHeader("Location", "/items/"+id)
			response.status(201).end()
		}else if(errors.includes("accountNotFound")){
			response.status(400).json(errors)
		}else{
			response.status(500).end()
		}
	})
	
})



app.put("/uploadImage", uploading.single("images"), function(request, response){
	const ImageUrl = request.file.path.split("\\public\\")[1]
	const file= request.file
	console.log({file})
	response.json(ImageUrl) 
})

app.put("/items/:id", function(request, response){
	
	const id = request.params.id
	const updatedItem = request.body
	
	// Check that the item contains all expected properties.
	const itemTypes = {
		id: Number,
		accountId: Number,
		title: String,
		description: String,
		images: String
	}
	
	if(!hasTypes(updatedItem, itemTypes)){
		response.status(422).end()
		return
	}
	
	db.getitemById(id, function(errors, oldItem){
		
		if(0 < errors.length){
			response.status(500).end()
			return
		}else if(!oldItem){
			response.status(404).end()
			return
		}
		
		// Check authorization.
		const accountId = request.accountId
		if(!accountId){
			// Unauthenticated.
			response.status(401).json(["notAuthenticated"])
			return
		}else if(oldItem.accountId != accountId){
			// Not creator of Item.
			response.status(401).json(["notAuthorized"])
			return
		}else if(updatedItem.accountId != accountId){
			// Not allowed to give the Item to another account.
			response.status(401).json(["notAuthorized"])
			return
		}
		
		// Validate the Item.
		const validationErrors = []
		
		if(oldItem.id != updatedItem.id){
			validationErrors.push("idChanged")
		}
		
		
		if(oldItem.accountId != updatedItem.accountId){
			validationErrors.push("accountIdChanged")
		}
		
		if(updatedItem.title.length < TITLE_MIN_LENGTH){
			validationErrors.push("titleTooShort")
		}else if(TITLE_MAX_LENGTH < updatedItem.title.length){
			validationErrors.push("titleTooLong")
		}
		
		if(updatedItem.description.length < DESCRIPTION_MIN_LENGTH){
			validationErrors.push("descriptionTooShort")
		}else if(DESCRIPTION_MAX_LENGTH < updatedItem.description.length){
			validationErrors.push("descriptionTooLong")
		}
		
		if(0 < validationErrors.length){
			response.status(400).json(validationErrors)
			return
		}
		
		// Try to update the Item.
		db.updateItemById(id, updatedItem, function(errors, didExist){
			if(errors.length == 0){
				if(didExist){
					response.status(204).end()
				}else{
					response.status(404).end()
				}
			}else if(errors.includes("invalidAccountId")){
				response.status(400).json(errors)
			}else{
				response.status(500).end()
			}
		})
		
	})
	
})

app.delete("/items/:id", function(request, response){
	
	const id = request.params.id
	
	db.getItemById(id, function(errors, item){
		
		if(0 < errors.length){
			response.status(500).end()
			return
		}else if(!item){
			response.status(404).end()
			return
		}
		
		// Check authorization.
		const accountId = request.accountId
		if(!accountId){
			// Unauthenticated.
			response.status(401).json(["notAuthenticated"])
			return
		}else if(item.accountId != accountId){
			// Not creator of item.
			response.status(401).json(["notAuthorized"])
			return
		}
		
		// Try to delete the item.
		db.deleteItemById(id, function(errors, didExist){
			if(errors.length == 0){
				if(didExist){
					response.status(204).end()
				}else{
					response.status(404).end()
				}
			}else{
				response.status(500).end()
			}
		})
		
	})
	
})




//COMMENTS

app.get("/comments", function(request, response){
	
	if(request.query.accountId){
		
		const accountId = request.query.accountId
		
		db.getCommentsByAccountId(accountId, function(errors, comments){
			if(errors.length == 0){
				response.status(200).json(comments)
			}else{
				response.status(500).end()
			}
		})
		
	}else{
	
		db.getAllComments(function(errors, comments){
			if(errors.length == 0){
				response.status(200).json(comments)
			}else{
				response.status(500).end()
			}
		})
		
	}
})

app.get("/comments/:id", function(request, response){
	
	const id = request.params.id
	
	db.getCommentById(id, function(errors, comment){
		if(errors.length == 0){
			if(comment){
				response.status(200).json(comment)
			}else{
				response.status(404).end()
			}
		}else{
			response.status(500).end()
		}
	})
	
})

app.post("/comments", function(request, response){
	
	const comment = request.body
	
	// Check that the comment contains all expected properties.
	const commentTypes = {
		accountId: Number,
		itemId: Number,
		userComment: String,
	}
	
	if(!hasTypes(comment, commentTypes)){
		response.status(422).end()
		return
	}
	
	// Check authorization.
	const itemId = request.itemId
	if(!itemId){
		response.status(401).json(["notAuthenticated"])
		return
	}else if(comment.itemId != itemId){
		// Not creator of comment.
		response.status(401).json(["notAuthorized"])
		return
	}
	
	// Try to create the comment.
	db.createComment(comment, function(errors, id){
		if(errors.length == 0){
			response.setHeader("Location", "/comments/"+id)
			response.status(201).end()
		}else if(errors.includes("accountNotFound")){
			response.status(400).json(errors)
		}else{
			response.status(500).end()
		}
	})
	
})

app.put("/comments/:id", function(request, response){
	
	const id = request.params.id
	const updatedComment = request.body
	
	// Check that the comment contains all expected properties.
	const commentTypes = {
		id: Number,
		accountId: Number,
		itemId: Number,
		userComment: String,
		
	}
	
	if(!hasTypes(updatedComment, commentTypes)){
		response.status(422).end()
		return
	}
	
	db.getCommentById(id, function(errors, oldComment){
		
		if(0 < errors.length){
			response.status(500).end()
			return
		}else if(!oldComment){
			response.status(404).end()
			return
		}
		
		// Check authorization.
		const itemId = request.itemId
		if(!itemId){
			// Unauthenticated.
			response.status(401).json(["notAuthenticated"])
			return
		}else if(oldComment.itemId != itemId){
			// Not creator of Comment.
			response.status(401).json(["notAuthorized"])
			return
		}else if(updatedComment.itemId != itemId){
			// Not allowed to give the Comment to another account.
			response.status(401).json(["notAuthorized"])
			return
		}
		
		// Validate the Comment.
		const validationErrors = []
		
		if(oldComment.id != updatedComment.id){
			validationErrors.push("idChanged")
		}
		
		if(oldComment.itemId != updatedComment.itemId){
			validationErrors.push("itemIdChanged")
		}
		
		if(0 < validationErrors.length){
			response.status(400).json(validationErrors)
			return
		}
		
		// Try to update the Comment.
		db.updateCommentById(id, updatedComment, function(errors, didExist){
			if(errors.length == 0){
				if(didExist){
					response.status(204).end()
				}else{
					response.status(404).end()
				}
			}else if(errors.includes("invaliditemId")){
				response.status(400).json(errors)
			}else{
				response.status(500).end()
			}
		})
		
	})
	
})

app.delete("/comments/:id", function(request, response){
	
	const id = request.params.id
	
	db.getCommentById(id, function(errors, comment){
		
		if(0 < errors.length){
			response.status(500).end()
			return
		}else if(!comment){
			response.status(404).end()
			return
		}
		
		// Check authorization.
		const itemId = request.itemId
		if(!itemId){
			// Unauthenticated.
			response.status(401).json(["notAuthenticated"])
			return
		}else if(comment.itemId != itemId){
			// Not creator of comment.
			response.status(401).json(["notAuthorized"])
			return
		}
		
		// Try to delete the comment.
		db.deleteCommentById(id, function(errors, didExist){
			if(errors.length == 0){
				if(didExist){
					response.status(204).end()
				}else{
					response.status(404).end()
				}
			}else{
				response.status(500).end()
			}
		})
		
	})
	
})



app.listen(3000)