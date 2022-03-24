const express = require('express');
const router = express.Router();
const db = require('../database/controllers');



router.route('/')
  .get((req, res) => {

    db.getAllPosts()
    .then((response) => res.status(200).json(response))
    .catch(err => res.status(400).json(err))

  });


  router.route('/:post_id')
    .get((req,res) => {

      console.log('posts/:userid called, req.params: ', req.params)
      let {post_id} = req.params

      db.getPostById(post_id)
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        console.log(err)
        res.status(400).json('Something went wrong')

      })

    })
    .patch((req,res) => {
      let {post_id} = req.params
      console.log('posts/:post id patch called, req.body',req.body)
      db.updatePost(post_id, req.body)
      .then(response => res.status(200).json(`${post_id} updated.`))
      .catch(err => console.log('Error at /posts/:id PATCH', err))
    })
    .delete((req,res) => {
      let {post_id} = req.params
      db.removePost(post_id)
      .then(response => res.status(202).json(`Successfully deleted Post`))
      .catch(err => console.log('DELETE error @ /posts/:post_id ', err))
    })



  module.exports = router;