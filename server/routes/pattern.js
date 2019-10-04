const express = require('express')
const patternModel = require('../models/Pattern')
const router = express.Router()
const updateFile = require('./../configs/cloudinary')

// Route to get all countries
router.get('/', (req, res, next) => {
  Pattern.find()
    .then(patterns => {
      res.json(patterns)
    })
    .catch(err => next(err))
})

// Route to add
router.post('/', (req, res, next) => {
  let { name, description } = req.body
  Pattern.create({ name, description })
    .then(pattern => {
      res.json({
        success: true,
        pattern,
      })
    })
    .catch(err => next(err))
})

router.get('/my-pattern', (req, res) => {
  console.log('here')
  patternModel
    .find()
    .then(dbRes => {
      console.log(dbRes)
      res.send(dbRes)
    })
    .catch(err => console.log(err))
})

router.delete('/my-pattern/delete/:id', (req, res) => {
  patternModel
    .remove({ _id: req.params.id })
    .then(() => res.send('Pattern deleted'))
    .catch(err => console.log(err))
})

router.get('/my-pattern/:id', (req, res) => {
  res.render('my-pattern')
})

router.get('/my-pattern/edit/:id', (req, res) => {
  patternModel
    .findById({ _id: req.params.id })
    .then(dbRes => {
      res.render('my-pattern', dbRes)
    })
    .catch(err => console.log(err))
})

router.post('/my-pattern', updateFile.single('image'), (req, res) => {
  console.log(req.body)
  const pattern = {
    image: req.file.secure_url,
    description: req.body.description,
    name: req.body.name,
  }
  console.log(pattern)
  patternModel
    .create(pattern)
    .then(dbRes => {
      res.send(dbRes)
    })
    .catch(err => console.log(err))
})

router.post('/library', (req, res) => {
  console.log('here')
  patternModel
    .find()
    .then(dbRes => {
      console.log(dbRes)
      res.send(dbRes)
    })
    .catch(err => console.log(err))
})

module.exports = router
