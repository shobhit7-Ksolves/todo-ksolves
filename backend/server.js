// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const consul = require('consul');




// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());


// const consulClient = new consul({
//   host: 'localhost', 
//   port: 8500,
//   promisify: true,
// });


// async function getMongoDBUri() {
//   try {
//     const services = await consulClient.catalog.service.list();
//     const mongoService = services['mongo']; 
//     if (mongoService && mongoService.length > 0) {
//       const mongoInstance = mongoService[0]; 
//       return `mongodb://${mongoInstance.ServiceAddress}:${mongoInstance.ServicePort}`;
//     }
//   } catch (error) {
//     console.error('Error getting MongoDB service from Consul:', error);
//   }
//   return process.env.MONGO_URL || 'mongodblocalhost:27017/todos'; 
// }

// // Connect to MongoDB
// async function connectToMongoDB() {
//   try {
//     const mongoUri = await getMongoDBUri();
//     await mongoose.connect(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//   }
// }


// // Define Todo Schema
// const todoSchema = new mongoose.Schema({
//   text: String,
//   completed: Boolean
// });

// const Todo = mongoose.model('Todo', todoSchema, 'todos');


// app.get('/', async (req, res) => {
//   res.json({ message: "Welcome there...." });
// });


// // Routes
// app.get('/todos', async (req, res) => {
//   const todos = await Todo.find();
//   res.json(todos);
// });

// app.post('/todos', async (req, res) => {
//   const newTodo = new Todo({
//     text: req.body.text,
//     // completed: false
//   });
//   const savedTodo = await newTodo.save();
//   res.json(savedTodo);
// });

// app.put('/todos/:id', async (req, res) => {
//   const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updatedTodo);
// });

// app.delete('/todos/:id', async (req, res) => {
//   await Todo.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Todo deleted' });
// });

// const PORT = process.env.PORT;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  





// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const consul = require('consul');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// const consulClient = new consul({
//   host: 'localhost',
//   port: 8500,
//   promisify: true,
// });

// async function getMongoDBUri() {
//   try {
//     const services = await consulClient.catalog.service.list();
//     const mongoService = services['mongo-service'];
//     if (mongoService && mongoService.length > 0) {
//       const mongoInstance = mongoService[0];
//       return `mongodb://${mongoInstance.ServiceAddress}:${mongoInstance.ServicePort}/todos`;
//     }
//   } catch (error) {
//     console.error('Error getting MongoDB service from Consul:', error);
//   }
//   // Fallback to local MongoDB
//   return process.env.MONGO_URL || 'mongodb://localhost:27017/todos';
// }

// // Connect to MongoDB
// async function connectToMongoDB() {
//   try {
//     const mongoUri = await getMongoDBUri();
//     await mongoose.connect(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//   }
// }

// connectToMongoDB().catch(console.error);

// // Define Todo Schema
// const todoSchema = new mongoose.Schema({
//   text: String,
//   completed: Boolean,
// });

// const Todo = mongoose.model('Todo', todoSchema);

// app.get('/', async (req, res) => {
//   res.json({ message: 'Welcome there....' });
// });

// // Routes
// app.get('/todos', async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/todos', async (req, res) => {
//   try {
//     const newTodo = new Todo({
//       text: req.body.text,
//       completed: req.body.completed || false,
//     });
//     const savedTodo = await newTodo.save();
//     res.json(savedTodo);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.put('/todos/:id', async (req, res) => {
//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedTodo);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.delete('/todos/:id', async (req, res) => {
//   try {
//     await Todo.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Todo deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const consul = require('consul');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const consulClient = new consul({
  host: 'localhost',
  port: 8500,
  promisify: true,
});

async function getMongoDBUri() {
  let mongoUri = '';
  let isUsingConsul = false; // Track if Consul service is used

  try {
    const mongoServiceName = process.env.MONGO_SERVICE; // Default to 'mongo-service' if not provided
    const services = await consulClient.catalog.service.nodes(mongoServiceName);
    if (services && services.length > 0) {
      const mongoInstance = services[0];
      mongoUri = `mongodb://${mongoInstance.Address}:${mongoInstance.ServicePort}/todos`;
      isUsingConsul = true; // Update flag
    } else {
      console.error(`MongoDB service "${mongoServiceName}" not found in Consul. Falling back to local MongoDB.`);
    }
  } catch (error) {
    console.error('Error getting MongoDB service from Consul:', error);
  }

  // If mongoUri is still empty, fallback to local MongoDB
  if (!mongoUri) {
    mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/todos';
  }

  // Log whether Consul is used or fallback to local MongoDB
  if (isUsingConsul) {
    console.log('Using MongoDB URI retrieved from Consul:', mongoUri);
  } else {
    console.log('Using local MongoDB URI:', mongoUri);
  }

  return mongoUri;
}
// Connect to MongoDB
async function connectToMongoDB() {
  try {
    const mongoUri = await getMongoDBUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToMongoDB().catch(console.error);

// Define Todo Schema
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/', async (req, res) => {
  res.json({ message: 'Welcome there....' });
});
// Routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      completed: req.body.completed || false,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


