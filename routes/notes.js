var express = require('express');
var router = express.Router();
// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = "*****";
const client = new MongoClient(uri);

router.get('/', async (req, res, next) => {
  try {
    // MongoDB に接続
    await client.connect();
    
    // データベース、コレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');

    // idが2のドキュメントを取得
    const query = { id: 2 };
    const note = await notes.findOne(query);

    res.json(note);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

module.exports = router;