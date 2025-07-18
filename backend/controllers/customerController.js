const db = require("../models/db");

exports.getAllCustomers = async (req, res) => {
	try {
		const result = await db.query(
			"SELECT * FROM customers ORDER BY created_at DESC"
		);
		res.json(result.rows);
	} catch (err) {
		console.error("Gagal mengambil data customer:", err);
		res.status(500).json({ error: "Gagal mengambil data" });
	}
};

exports.createCustomer = async (req, res) => {
	const { name, email, message } = req.body;
	try {
		await db.query(
			"INSERT INTO customers (name, email, message, status, notes, created_at) VALUES ($1, $2, $3, 'baru', '', NOW())",
			[name, email, message]
		);
		res.status(201).json({ message: "Pesan berhasil dikirim" });
	} catch (error) {
		console.error("Gagal menyimpan pesan", error);
		res.status(500).json({ error: "Gagal menyimpan pesan" });
	}
};

exports.updateCustomer = async (req, res) => {
	const { id } = req.params;
	const { status, notes } = req.body;
	try {
		await db.query(
			"UPDATE customers SET status = $1, notes = $2 WHERE id = $3",
			[status, notes, id]
		);
		res.json({ message: "Customer berhasil diperbarui" });
	} catch (err) {
		console.error("Gagal update customer", err);
		res.status(500).json({ error: "Gagal update customer" });
	}
};

exports.deleteCustomer = async (req, res) => {
	const { id } = req.params;
	try {
		await db.query("DELETE FROM customers WHERE id = $1", [id]);
		res.json({ message: "Customer berhasil dihapus" });
	} catch (err) {
		console.error("Gagal hapus customer", err);
		res.status(500).json({ error: "Gagal hapus customer" });
	}
};
