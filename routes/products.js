var mysql = require('mysql')
	, pool = mysql.createPool({
		host: 'localhost',
		user: '',
		password: '',
		database: ''
});

exports.all_products = function (req, res) {
	//	res.json(200, { message: "My first route" });
	var sql = "SELECT part_typ FROM wt_splitlot";
	pool.getConnection( function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
			//make the query
			connection.query(sql, function(err, results) {
				if(err) { console.log(err); callback(true); return; }
					// callback(false, results);
					res.json(200, { products: results });
			});
	});
};

exports.all_lots = function (req, res) {
	//	res.json(200, { message: "My first route" });
	var sql = "SELECT lot_id FROM wt_splitlot";
	pool.getConnection( function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
			//make the query
			connection.query(sql, function(err, results) {
				if(err) { console.log(err); callback(true); return; }
					// callback(false, results);
					res.json(200, { products: results });
			});
	});
};

exports.oneproduct_alllots = function (req, res) {
	//	res.json(200, { message: "My first route" });
	var sql = "SELECT lot_id, part_typ FROM wt_splitlot WHERE part_typ = '"
		+ req.params.prod + "'";
	pool.getConnection( function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
			//make the query
			connection.query(sql, function(err, results) {
				if(err) { console.log(err); callback(true); return; }
					// callback(false, results);
				res.json(200, { products: results });
		});
	});
};

exports.oneproduct_onelot_allparts = function (req, res) {
	//	res.json(200, { message: "My first route" });
	var sql = "SELECT r.run_id, r.part_x, r.part_y, r.hbin_no, r.sbin_no, "
		+ " s.part_typ, s.lot_id  FROM wt_run as r "
		+ " INNER JOIN wt_splitlot as s ON s.splitlot_id = r.splitlot_id "
		+ " WHERE s.part_typ = '" + req.params.prod 
		+ "' AND s.lot_id = '" + req.params.lot + "'"
		+ " LIMIT 100";

pool.getConnection( function(err, connection) {
	if(err) { console.log(err); callback(true); return; }
		//make the query
		connection.query(sql, function(err, results) {
			if(err) { console.log(err); callback(true); return; }
				// callback(false, results);
				res.json(200, { products: results });
		});
	});
};
