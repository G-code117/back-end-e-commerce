const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });
    if(!categoryData){
      res.status(400).json({ message: 'no categories'})
      return
    }
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    });
    if(!categoryData){
      res.status(400).json({ message: 'no categories'})
      return
    }
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData)
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData)
  } catch(err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(categoryData){
    res.status(200).json({status: `deleted category id = ${req.params.id}`})
    } else{
    res.status(400).json({status: `no category of id = ${req.params.id}`});
    }
  } catch(err) {
  }
});

module.exports = router;
