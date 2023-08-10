const express = require('express');

const db = require('./db')
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// Models
const User = require("./models/User")
const Recipe = require('./models/Recipe');


const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 4000;

const cors = require('cors');

app.set('views-engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const salt = bcrypt.genSaltSync(10);
const secret = 'd3123u12buibduwub32u12b31u2b31iu2beib12o3b';

app.use(cors({credentials:true,origin:'http://localhost:19006'}));
app.use(express.json())
app.use(cookieParser());



app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api/recipes', require('./routes/api/recipes'));


app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const existingUser = await User.findOne({ username });
    
    if (existingUser) {
      // A user with this username already exists
      return res.status(409).json({ error: 'Username already taken' });
    }
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });
  
  app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});

    if (!userDoc) {
      return res.status(400).json('Wrong credentials. There is no username like this');
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });
  
  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (!token) return;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });
  
  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });


  
  app.get('/initialize', async (req, res) => {
    try {
      // Create a new user
      const user = new User({
        username: 'testUser',
        password: 'password',
      });
      await user.save();
  
      // Create two new recipes for the user
      const recipe1 = new Recipe({
        name: 'Pasta with Tomato Sauce',
        complexity: 2,
        ingredients: 'pasta, tomato sauce, garlic, onion, olive oil',
        thumbnail: `uploads/img1.jpg`,
        content: 'Cook the pasta according to the package directions. Meanwhile, heat the olive oil in a large pan over medium heat. Add the garlic and onion and cook until soft, about 5 minutes. Add the tomato sauce and simmer for 10 minutes. Serve the pasta topped with the tomato sauce.',
        author: user._id,
      });
      await recipe1.save();
  
      const recipe2 = new Recipe({
        name: 'Roasted Chicken',
        complexity: 3,
        ingredients: 'chicken, salt, pepper, olive oil',
        thumbnail: `uploads/img2.jpg`,
        content: 'Preheat the oven to 375°F. Season the chicken with salt and pepper. Heat the olive oil in a large oven-safe pan over high heat. Add the chicken and cook until browned on both sides, about 5 minutes. Transfer the pan to the oven and roast for 20-25 minutes, until the chicken is cooked through. Serve hot.',
        author: user._id,
      });
      await recipe2.save();
  
      res.send('User and recipes created!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating user and recipes');
    }
  });


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});



