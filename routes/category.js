const express = require("express");
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

const categoryCtrl = new CategoryController();

router.get("/", async (req, res) => {
  const result = await categoryCtrl.getCategories(req.query);
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await categoryCtrl.getCategory(req.params.id);
  res.send(result);
});

// Cria um category
router.post("/", async (req, res) => {
  res.send("Olá mundo category!!!");
});

// // Edita um category
// router.put("/:id", async (req, res) => {
//   categoryCtrl.updateCategory(req.params.id, {})
//   res.send("Dados alterados com sucesso.");
// });

// Edita um category
router.patch("/:id", async (req, res) => {
  const result = await categoryCtrl.updateCategory(req.params.id, {});
  res.send(result);
});

// Deleta um category
router.delete("/:id", async (req, res) => {
  const result = await categoryCtrl.deleteCategory(req.params.id);
  res.send(result);
});

module.exports = router;
