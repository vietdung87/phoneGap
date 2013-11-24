var db;
function ensureTableExit(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS LevelAndScore(id INTEGER PRIMARY KEY AUTOINCREMENT,level,score)');
}
function transaction_error(tx, error) {

    alert("Database Error: " + error);
}
