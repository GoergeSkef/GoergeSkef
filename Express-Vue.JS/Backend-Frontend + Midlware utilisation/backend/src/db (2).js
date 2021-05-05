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
	CREATE TABLE IF NOT EXISTS items (
		id INTEGER PRIMARY KEY,
		accountId INTEGER,
		title TEXT,
		description TEXT,
		images TEXT,
		FOREIGN KEY(accountId) REFERENCES accounts(id)
	)
`)
db.run(`
    CREATE TABLE IF NOT EXISTS comments(
        id  INTEGER PRIMARY KEY,
        accountId INTEGER,
		itemId INTEGER,
		userComment TEXT,
        FOREIGN KEY(accountId) REFERENCES account(id)
        FOREIGN KEY(itemId) REFERENCES items(id)

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


// Export functions used to work with the comments table.
exports.createComment = function(comment, callback){
	
	const query = `
		INSERT INTO comments
			(accountId, itemId, userComment)
		VALUES
			(?, ?, ?)
	`
	const values = [
		comment.accountId,
		comment.itemId,
		comment.userComment,
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

exports.getAllComments = function(callback){
	
	const query = `
		SELECT * FROM comments ORDER BY id
	`
	const values = []
	
	db.all(query, values, function(error, comments){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], comments)
		}
	})
	
}

exports.getCommentById = function(id, callback){
	
	const query = `
		SELECT * FROM comments WHERE id = ?
	`
	const values = [id]
	
	db.get(query, values, function(error, comment){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], comment)
		}
	})
	
}

exports.getCommentsByAccountId = function(accountId, callback){
	
	const query = `
		SELECT * FROM comments WHERE accountId = ? ORDER BY id
	`
	const values = [
		accountId
	]
	
	db.all(query, values, function(error, comments){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], comments)
		}
	})
	
}

exports.updateCommentById = function(id, updatedComment, callback){
	
	const query = `
		UPDATE comments SET
			itemId = ?,
			userComment = ?,
			
		WHERE
			id = ?
	`
	const values = [
		updatedComment.userComment,
		id
	]
	
	db.run(query, values, function(error){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			const commentExisted = (this.changes == 1)
			callback([], commentExisted)
		}
	})
	
}

exports.deleteCommentById = function(id, callback){
	
	const query = `
		DELETE FROM comments WHERE id = ?
	`
	const values = [
		id
	]
	
	db.run(query, values, function(error){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			const commentExisted = (this.changes == 1)
			callback([], commentExisted)
		}
	})
	
}




// Export functions used to work with the ITEMS table.
exports.createItem = function(item, callback){
	
	const query = `
		INSERT INTO items
			(accountId, title, description, images)
		VALUES
			(?, ?, ?, ?)
	`
	const values = [
		item.accountId,
		item.title,
		item.description,
		item.images
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

exports.getAllItems = function(callback){
	
	const query = `
		SELECT * FROM items ORDER BY id
	`
	const values = []
	
	db.all(query, values, function(error, items){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], items)
		}
	})
	
}

exports.getItemById = function(id, callback){
	
	const query = `
		SELECT * FROM items WHERE id = ?
	`
	const values = [id]
	
	db.get(query, values, function(error, item){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], item)
		}
	})
	
}

exports.getItemsByAccountId = function(accountId, callback){
	
	const query = `
		SELECT * FROM items WHERE accountId = ? ORDER BY id
	`
	const values = [
		accountId
	]
	
	db.all(query, values, function(error, items){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], items)
		}
	})
	
}

exports.updateItemById = function(id, updatedItem, callback){
	
	const query = `
		UPDATE items SET
			title = ?,
			description = ?,
			images = ?,

		WHERE
			id = ?
	`
	const values = [
		updatedItem.title,
		updatedItem.description,
		updatedItem.images,
		id
	]
	
	db.run(query, values, function(error){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			const itemExisted = (this.changes == 1)
			callback([], itemExisted)
		}
	})
	
}

exports.deleteItemById = function(id, callback){
	
	const query = `
		DELETE FROM items WHERE id = ?
	`
	const values = [
		id
	]
	
	db.run(query, values, function(error){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			const itemExisted = (this.changes == 1)
			callback([], itemExisted)
		}
	})
	
}