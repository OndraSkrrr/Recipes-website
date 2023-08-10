const express = require('express');
const cors = require('cors');
const Recipe = require('../../models/Recipe')
const router = express.Router();

const multer = require('multer');
const uploadMiddleware = multer({
    dest: 'uploads/',
    limits: {
      fieldNameSize: 1024, // increase the limit for the field name to 1024 bytes
      fieldSize: 20 * 1024 * 1024, // increase the limit for the field value to 20MB
      fileSize: 20 * 1024 * 1024 // increase the limit for the file size to 20MB
    }
  });
const fs = require('fs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { log } = require('console');


router.use(express.json());
router.use(cookieParser());
router.use(cors({credentials:true,origin:'http://localhost:19006'}));



const secret = 'd3123u12buibduwub32u12b31u2b31iu2beib12o3b';

router.get('/', cors(), async (req, res) => {
    const recipes = await Recipe.find()
    .populate('author', ['username'])
    .sort({createdAt: -1});
    res.json(recipes);
    console.log(recipes);
});

router.get('/:id', cors(), async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate('author', ['username']);
    if (recipe) {
        res.json(recipe)
    } else {
        res.status(404).json({msg: `A recipe with id=${req.params.id} was not found`});
    }
});

router.post('/', uploadMiddleware.single('file'), async (req, res) => {

    // Saving file to uploads
    let newPath;
    if (req.file) {
        const {originalname} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];

        const path = req.file.path; // define path variable here
        newPath = `${path}.${ext}`;
        fs.renameSync(path, newPath);
    }


    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {name, complexity, ingredients, content} = req.body
      const postDoc = await Recipe.create({
        name, 
        complexity,
        ingredients,    
        content, 
        thumbnail:newPath,
        author:info.id,
      });
      res.json(postDoc);
    });

})


router.put('/', uploadMiddleware.single('file'), async (req, res) => {
    
    let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }


    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {name, complexity, ingredients, content, id} = req.body;
      log("id is: ")
      log(id);
      log("name is: ")
      log(name);
      const recipeDoc = await Recipe.findById(id);
      log("recipe is: ")
      log(recipeDoc);
      const isAuthor = JSON.stringify(recipeDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }

        await recipeDoc.updateOne({
            name, 
            complexity,
            ingredients,    
            thumbnail: newPath ? newPath : recipeDoc.thumbnail,
            content,
        });
      res.json(recipeDoc);
    });
})


router.delete('/:id', async (req, res) => {

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {

        if (err) throw err;

        const recipeDoc = await Recipe.findById(req.params.id);
        const isAuthor = JSON.stringify(recipeDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                return res.status(400).json('you are not the author');
            }
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (recipe) {
            res.json(recipe)
        } else {
            res.status(404).json({msg: `A recipe with id=${req.params.id} was not found`});
        }

    });

});

module.exports = router;