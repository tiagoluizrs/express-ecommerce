const express = require("express");
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

const categoryCtrl = new CategoryController();

router.get("/", async (req, res) => {
  const result = await categoryCtrl.getCategories(req.query);
  res.statusCode = result.status;
  res.send(result.result);
});

router.get("/:id", async (req, res) => {
  const result = await categoryCtrl.getCategory(req.params.id);
  res.statusCode = result.status;
  res.send(result.result);
});

// Cria um category
router.post("/", async (req, res) => {
  const result = await categoryCtrl.createCategory(req.body);
  res.statusCode = result.status;
  res.send(result.result);
});

// // Edita um category
// router.put("/:id", async (req, res) => {
//   categoryCtrl.updateCategory(req.params.id, {})
//   res.send("Dados alterados com sucesso.");
// });

// Edita um category
router.patch("/:id", async (req, res) => {
  const result = await categoryCtrl.updateCategory(req.params.id, req.body);
  res.statusCode = result.status;
  res.send(result.result);
});

// Deleta um category
router.delete("/:id", async (req, res) => {
  const result = await categoryCtrl.deleteCategory(req.params.id);

  res.statusCode = result.status;
  res.send(result.result);
});

module.exports = router;
