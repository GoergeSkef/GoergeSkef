const express  = require('express')
const hasTypes = require('./has-types')
const db = require('./db')
const jwt = require('jsonwebtoken')

// Constants used for validation of resources.
const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 9
const MIN_PASSWORD_LENGTH = 6 // Should be higher, is low to facilitate testing.

const TITLE_MIN_LENGTH = 5
const TITLE_MAX_LENGTH = 50
const DESCRIPTION_MIN_LENGTH = 20
const DESCRIPTION_MAX_LENGTH = 500

const ACCESS_TOKEN_SECRET = "sdfsdsd4flkjdsflkdsj"
const ID_TOKEN_SECRET = "fdkjjlpadfglfd6kyeu"

// The application.
const app = express()

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


// Requests for activity resources.
app.get("/activities", function(request, response){
	
	if(request.query.accountId){
		
		const accountId = request.query.accountId
		
		db.getActivitiesByAccountId(accountId, function(errors, activities){
			if(errors.length == 0){
				response.status(200).json(activities)
			}else{
				response.status(500).end()
			}
		})
		
	}else{
	
		db.getAllActivities(function(errors, activities){
			if(errors.length == 0){
				response.status(200).json(activities)
			}else{
				response.status(500).end()
			}
		})
		
	}
})

app.get("/activities/:id", function(request, response){
	
	const id = request.params.id
	
	db.getActivityById(id, function(errors, activity){
		if(errors.length == 0){
			if(activity){
				response.status(200).json(activity)
			}else{
				response.status(404).end()
			}
		}else{
			response.status(500).end()
		}
	})
	
})

app.post("/activities", function(request, response){
	
	const activity = request.body
	
	// Check that the activity contains all expected properties.
	const activityTypes = {
		accountId: Number,
		title: String,
		description: String,
		startTime: Number,
		endTime: Number,
		latitude: Number,
		longitude: Number
	}
	
	if(!hasTypes(activity, activityTypes)){
		response.status(422).end()
		return
	}
	
	// Check authorization.
	const accountId = request.accountId
	if(!accountId){
		response.status(401).json(["notAuthenticated"])
		return
	}else if(activity.accountId != accountId){
		// Not creator of activity.
		response.status(401).json(["notAuthorized"])
		return
	}
	
	// Validate the activity.
	const validationErrors = []
	
	if(activity.title.length < TITLE_MIN_LENGTH){
		validationErrors.push("titleTooShort")
	}else if(TITLE_MAX _LENGTH < activity.title.length){
		validationErrors.push("titleTooLong")
	}
	
	if(activity.description.length < DESCRIPTION_MIN_LENGTH){
		validationErrors.push("descriptionTooShort")
	}else if(DESCRIPTION_MAX_LENGTH < activity.description.length){
		validationErrors.push("descriptionTooLong")
	}
	
	if(activity.startTime < Date.now()){
		validationErrors.push("startTimeTooEarly")
	}
	
	if(activity.endTime < activity.startTime){
		validationErrors.push("endingBeforeStarting")
	}
	
	if(0 < validationErrors.length){
		response.status(400).json(validationErrors)
		return
	}
	
	// Try to create the activity.
	db.createActivity(activity, function(errors, id){
		if(errors.length == 0){
			response.setHeader("Location", "/activities/"+id)
			response.status(201).end()
		}else if(errors.includes("accountNotFound")){
			response.status(400).json(errors)
		}else{
			response.status(500).end()
		}
	})
	
})

app.put("/activities/:id", function(request, response){
	
	const id = request.params.id
	const updatedActivity = request.body
	
	// Check that the activity contains all expected properties.
	const activityTypes = {
		id: Number,
		accountId: Number,
		title: String,
		description: String,
		startTime: Number,
		endTime: Number,
		latitude: Number,
		longitude: Number
	}
	
	if(!hasTypes(updatedActivity, activityTypes)){
		response.status(422).end()
		return
	}
	
	db.getActivityById(id, function(errors, oldActivity){
		
		if(0 < errors.length){
			response.status(500).end()
			return
		}else if(!oldActivity){
			response.status(404).end()
			return
		}
		
		// Check authorization.
		const accountId = request.accountId
		if(!accountId){
			// Unauthenticated.
			response.status(401).json(["notAuthenticated"])
			return
		}else if(oldActivity.accountId != accountId){
			// Not creator of activity.
			response.status(401).json(["notAuthorized"])
			return
		}else if(updatedActivity.accountId != accountId){
			// Not allowed to give the activity to another account.
			response.status(401).json(["notAuthorized"])
			return
		}
		
		// Validate the activity.
		const validationErrors = []
		
		if(oldActivity.id != updatedActivity.id){
			validationErrors.push("idChanged")
		}
		
		if(oldActivity.startTime < Date.now()){
			validationErrors.push("started")
			response.status(400).json(errors)
			return
		}
		
		if(oldActivity.accountId != updatedActivity.accountId){
			validationErrors.push("accountIdChanged")
		}
		
		if(updatedActivity.title.length < TITLE_MIN_LENGTH){
			validationErrors.push("titleTooShort")
		}else if(TITLE_MAX_LENGTH < updatedActivity.title.length){
			validationErrors.push("titleTooLong")
		}
		
		if(updatedActivity.description.length < DESCRIPTION_MIN_LENGTH){
			validationErrors.push("descriptionTooShort")
		}else if(DESCRIPTION_MAX_LENGTH < updatedActivity.description.length){
			validationErrors.push("descriptionTooLong")
		}
		
		if(updatedActivity.startTime < Date.now()){
			validationErrors.push("startTimeTooEarly")
		}
		
		if(updatedActivity.endTime < updatedActivity.startTime){
			validationErrors.push("endingBeforeStarting")
		}
		
		if(0 < validationErrors.length){
			response.status(400).json(validationErrors)
			return
		}
		
		// Try to update the activity.
		db.updateActivityById(id, updatedActivity, function(errors, didExist){
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

app.delete("/activities/:id", function(request, response){
	
	const id = request.params.id
	
	db.getActivityById(id, function(errors, activity){
		
		if(0 < errors.length){
			response.status(500).end()
			return
		}else if(!activity){
			response.status(404).end()
			return
		}
		
		// Check authorization.
		const accountId = request.accountId
		if(!accountId){
			// Unauthenticated.
			response.status(401).json(["notAuthenticated"])
			return
		}else if(activity.accountId != accountId){
			// Not creator of activity.
			response.status(401).json(["notAuthorized"])
			return
		}
		
		// Try to delete the activity.
		db.deleteActivityById(id, function(errors, didExist){
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


app.listen(8000)