// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

// ENDPOINTS

// [GET] fetches all posts 
router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    })
})

// [GET] fetches post by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
    .then(post => {
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "The post information could not be retrieved" 
        })
    })
})

// [POST] creates post and returns id of newly created post
// router.post('/', (req, res) => {
//     const { title, contents } = req.body;
//     Posts.insert({ title, contents })
//     .then(id => {
//         const newPostId = id
//         Posts.findById(newPostId)
//         .then(post => {
//             console.log(post)
//         })
        
//     })
//     .catch(err => {
//         res.status(500).json({
//             message: "There was an error while saving the post to the database"
//         })
//     })
//  })

router.post('/', async (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        try {
            const newId = await Posts.insert({ title, contents })
            const newPost = await Posts.findById(newId.id)
            res.status(201).json(newPost);
    }   catch (err) {
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        }
    }
 })

module.exports = router;