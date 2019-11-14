const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
  db.serialize(function() {
    db.run(' CREATE TABLE IF NOT EXISTS urldesc ( shortUrl TEXT  ,originUrl TEXT )')

    // let stmt = db.prepare("INSERT INTO urldesc ( originUrl,shortUrl) VALUES  (?,?)");
    // stmt.run(['https://www.google.co.th','TestshortUrl']);
    // stmt.finalize();
    });

});


function select(shortUrl) {
    return new Promise((resolve, reject) => {
        const queries = [];
        const sql = "SELECT rowid AS id,originUrl,shortUrl FROM urldesc where shortUrl= ? "
        //console.log(sql)        
        db.each(sql,[shortUrl], (err, row) => {
            if (err) {
                reject(err); // optional: you might choose to swallow errors.
            } else {
                queries.push(row); // accumulate the data
            }
        }, (err, n) => {
            if (err) {
                reject(err); // optional: again, you might choose to swallow this error.
            } else {
                resolve(queries); // resolve the promise
            }
        });
    });
}

const getShortUrl = async (paramshortUrlName) => { 
    const row =  await select(paramshortUrlName)      

    if (row.length >0)  {
        return row[0]['originUrl']
    }else{
        return null
    }
    
}

const insetShortUrl = async (paramoriginUrl,paramshortUrl) => { 
    //console.log('insetShortUrl')
     db.serialize(function() {

        let stmt = db.prepare("INSERT INTO urldesc ( originUrl,shortUrl) VALUES  (?,?)");
        stmt.run([paramoriginUrl,paramshortUrl]);
        stmt.finalize();
        });

    return ''
}

module.exports = { getShortUrl , insetShortUrl }