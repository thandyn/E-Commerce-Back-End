const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => res.status(500).json(err));
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const tagData = await Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product, through: ProductTag }],
  })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => res.status(400).json(err));
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => res.status(200).json(newTag))
    .catch((err) => res.status(404).json(err));
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => res.status(200).json(updatedTag))
    .catch((err) => res.status(404).json(err));
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => res.status(200).json(deletedTag))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
