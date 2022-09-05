const router = require('express').Router();
const controller = require('../controllers/products');

router.route("/").post(controller.createProduct).get(controller.getProducts);
router.route("/:id").delete(controller.deleteProducts).put(controller.deleteProducts).patch(controller.patchProduct);

module.exports = router;
