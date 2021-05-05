const sqlite = require('sqlite3')

const db = new sqlite.Database("activity-finder.db")

// Enable foreign key constraints.
db.run("PRAGMA foreign_keys = ON")

// Create the database tables if they don't exist.
db.run(`
	CREATE TABLE IF NOT EXISTS accounts (
		id INTEGER PRIMARY KEY,
		username TEXT,
		password TEXT,
		CONSTRAINT uniqueUsername UNIQUE(username)
	)
`)

db.run(`
	CREATE TABLE IF NOT EXISTS activities (
		id INTEGER PRIMARY KEY,
		accountId INTEGER,
		title TEXT,
		description TEXT,
		startTime INTEGER,
		endTime INTEGER,
		latitude INTEGER,
		longitude INTEGER,
		FOREIGN KEY(accountId) REFERENCES accounts(id)
	)
`)

// Export functions used to work with the accounts table.
exports.createAccount = function(account, callback){
	
	const query = `
		INSERT INTO accounts
			(username, password)
		VALUES
			(?, ?)
	`
	const values = [
		account.username,
		account.password
	]
	
	db.run(query, values, function(error){
		if(error){
			if(error.message == "SQLITE_CONSTRAINT: UNIQUE constraint failed: accounts.username"){
				callback(["usernameTaken"])
			}else{
				console.log(error)
				callback(["databaseError"])
			}
		}else{
			callback([], this.lastID)
		}
	})
	
}

exports.getAllAccounts = function(callback){
	
	const query = `
		SELECT * FROM accounts ORDER BY username
	`
	const values = []
	
	db.all(query, values, function(error, accounts){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], accounts)
		}
	})
	
}

exports.getAccountById = function(id, callback){
	
	const query = `
		SELECT * FROM accounts WHERE id = ?
	`
	const values = [id]
	
	db.get(query, values, function(error, account){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], account)
		}
	})
	
}

exports.getAccountByUsername = function(username, callback){
	
	const query = `
		SELECT * FROM accounts WHERE username = ?
	`
	const values = [username]
	
	db.get(query, values, function(error, account){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], account)
		}
	})
	
}


// Export functions used to work with the activities table.
exports.createActivity = function(activity, callback){
	
	const query = `
		INSERT INTO activities
			(accountId, title, description, startTime, endTime, latitude, longitude)
		VALUES
			(?, ?, ?, ?, ?, ?, ?)
	`
	const values = [
		activity.accountId,
		activity.title,
		activity.description,
		activity.startTime,
		activity.endTime,
		activity.latitude,
		activity.longitude
	]
	
	db.run(query, values, function(error){
		if(error){
			// TODO check foreign key violation error.
			if(true){
				callback(["accountNotFound"])
			}else{
				console.log(error)
				callback(["databaseError"])
			}
		}else{
			callback([], this.lastID)
		}
	})
	
}

exports.getAllActivities = function(callback){
	
	const query = `
		SELECT * FROM activities ORDER BY startTime
	`
	const values = []
	
	db.all(query, values, function(error, activities){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], activities)
		}
	})
	
}

exports.getActivityById = function(id, callback){
	
	const query = `
		SELECT * FROM activities WHERE id = ?
	`
	const values = [id]
	
	db.get(query, values, function(error, activity){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], activity)
		}
	})
	
}

exports.getActivitiesByAccountId = function(accountId, callback){
	
	const query = `
		SELECT * FROM activities WHERE accountId = ? ORDER BY startTime
	`
	const values = [
		accountId
	]
	
	db.all(query, values, function(error, activities){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], activities)
		}
	})
	
}

exports.updateActivityById = function(id, updatedActivity, callback){
	
	const query = `
		UPDATE activities SET
			title = ?,
			description = ?,
			startTime = ?,
			endTime = ?,
			latitude = ?,
			longitude = ?
		WHERE
			id = ?
	`
	const values = [
		updatedActivity.title,
		updatedActivity.description,
		updatedActivity.startTime,
		updatedActivity.endTime,
		updatedActivity.latitude,
		updatedActivity.longitude,
		id
	]
	
	db.run(query, values, function(error){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			const activityExisted = (this.changes == 1)
			callback([], activityExisted)
		}
	})
	
}

exports.deleteActivityById = function(id, callback){
	
	const query = `
		DELETE FROM activities WHERE id = ?
	`
	const values = [
		id
	]
	
	db.run(query, values, function(error){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			const activityExisted = (this.changes == 1)
			callback([], activityExisted)
		}
	})
	
}