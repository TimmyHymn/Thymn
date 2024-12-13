var sqlStatements = 
];
function initializeDatabase() {
  var db = openDatabase('myDatabase', '1.0', 'Test DB', 2 * 1024 * 1024);
  db.transaction(function(tx) {
    for (var i = 0; i < sqlStatements.length; i++) {
      tx.executeSql(sqlStatements[i]);
    }
  });
  alert('Database initialized successfully!');
}
