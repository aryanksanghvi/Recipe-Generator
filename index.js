// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');

// const app = express();
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));
// app.use(express.static(path.join(__dirname, 'public')));

// // MongoDB Connection
// const uri = "mongodb+srv://aryanksanghvi:AAWz5JSw6p962JVL@recipe.gmwfgw0.mongodb.net/credentials?retryWrites=true&w=majority&appName=Recipe";
// mongoose.connect(uri)
//   .then(() => console.log("Database Connected Successfully"))
//   .catch(err => console.log("Database cannot be Connected", err));


// // User Schema
// const Loginschema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// const User = mongoose.model("users", Loginschema);

// // Routes
// const intial = path.join(__dirname, "public");
// app.get('/', (req, res) => {
//   res.sendFile(path.join(intial, "./login/login.html"));
// });
// app.get('/login', (req, res) => {
//   res.sendFile(path.join(intial, "./login/login.html"));
// });

// app.get('/home', (req, res) => {
//   res.sendFile(path.join(intial, "./home/home.html"));
// });
// app.post('/login', async (req, res) => {
//   try {
//     const {
//       username,
//       password
//     } = req.body;
//     const user = await User.findOne({
//       username
//     });
//     if (!user) {
//       return res.send('User not found');
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.send('Incorrect password');
//     }
//     res.redirect('/home'); // Or wherever you want on success
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Login failed due to an error');
//   }
// });

// app.post('/signup', async (req, res) => {
//   try {
//     const {
//       username,
//       password
//     } = req.body;
//     const existingUser = await User.findOne({
//       username
//     });
//     if (existingUser) {
//       return res.send('User already exists');
//     }
//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);
//     const newUser = new User({
//       username,
//       password: passwordHash
//     });
//     await newUser.save();
//     console.log('User saved successfully!');
//     res.redirect('/login'); // Redirect to login page after signup
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Signup failed due to an error');
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const uri = "mongodb+srv://aryanksanghvi:AAWz5JSw6p962JVL@recipe.gmwfgw0.mongodb.net/credentials?retryWrites=true&w=majority&appName=Recipe";
mongoose.connect(uri)
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log("Database cannot be Connected", err));

const Loginschema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
const User = mongoose.model("users", Loginschema);
const Contact = mongoose.model("Contact", contactSchema);

// Routes
const intial = path.join(__dirname, "public");
app.get('/', (req, res) => {
  res.sendFile(path.join(intial, "./login/login.html"));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(intial, "./login/login.html"));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(intial, "./home/home.html"));
});
app.post('/login', async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const user = await User.findOne({
      username
    });
    if (!user) {
      return res.send('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.send('Incorrect password');
    }
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed due to an error');
  }
});

app.post('/signup', async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const existingUser = await User.findOne({
      username
    });
    if (existingUser) {
      return res.send('User already exists');
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      password: passwordHash
    });
    await newUser.save();
    console.log('User saved successfully!');
    res.redirect('/login'); // Redirect to login page after signup
  } catch (error) {
    console.error(error);
    res.status(500).send('Signup failed due to an error');
  }
});

// New route to handle contact form submissions
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log('Contact message saved successfully!');
    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred. Please try again later.');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
