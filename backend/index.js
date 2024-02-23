const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
	user: 'postgres',
	host: 'p4b-1.c92a60umwufn.us-east-2.rds.amazonaws.com',
	database: 'postgres',
	password: '900360412',
	port: 5432,
});

// Middleware para permitir solicitudes CORS desde http://localhost:3000
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	next();
});

pool.connect((err) => {
	if (err) {
		console.error('Error connecting to PostgreSQL database', err);
	} else {
		console.log('Conexión a la base de datos PostgreSQL establecida');
	}
});

app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
	const sql = 'SELECT * FROM dbo.blog';
	pool.query(sql, (err, result) => {
		if (err) {
			console.error('Error executing query', err);
			res.status(500).json({ error: 'Error executing query' });
		} else {
			res.json(result.rows);
		}
	});
});

app.get('/entries/:entryId', (req, res) => {
	const entryId = req.params.entryId;
	const sql = 'SELECT * FROM dbo.blog WHERE id = $1';
	pool.query(sql, [entryId], (err, result) => {
		if (err) {
			console.error('Error executing query', err);
			res.status(500).json({ error: 'Error executing query' });
		} else {
			if (result.rows.length === 0) {
				res.status(404).json({ error: 'Entrada no encontrada' });
			} else {
				res.json(result.rows[0]);
			}
		}
	});
});

app.post('/api/post', (req, res) => {
	const { title, author, content, publication_date } = req.body;
	const sql = `INSERT INTO dbo.blog (title, author, content, created) VALUES ($1, $2, $3, $4) RETURNING id`;
	const values = [title, author, content, publication_date];
	pool.query(sql, values, (err, result) => {
		if (err) {
			console.error('Error executing query', err);
			res.status(500).json({ error: 'Error executing query' });
		} else {
			res.json({
				message: 'Entrada creada correctamente',
				id: result.rows[0].id,
			});
		}
	});
});

app.delete('/api/post/:id', (req, res) => {
	const postId = req.params.id;
	const sql = 'DELETE FROM dbo.blog WHERE id = $1';
	pool.query(sql, [postId], (err, result) => {
		if (err) {
			console.error('Error executing query', err);
			res.status(500).json({ error: 'Error executing query' });
		} else {
			if (result.rowCount === 0) {
				res.status(404).json({ error: 'Entrada no encontrada' });
			} else {
				res.json({ message: 'Entrada eliminada correctamente' });
			}
		}
	});
});

app.listen(port, () => {
	console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
