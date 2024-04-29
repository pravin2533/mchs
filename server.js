const express=require ("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const path = require('path'); // Import the path module
const ejs = require("ejs");
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filepath) => {
        if (filepath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));


// Connection URI
const uri = 'mongodb+srv://pravin:pass123@cluster0.xlle609.mongodb.net/your_database_name2';

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Call the function to establish connection


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    exp: String,
    area: String,
    location:String,
  });

  const Contact = mongoose.model('Contacts', contactSchema);
//route defining here
app.get("/",async function(req,res)
{
    try
    {
        res.sendFile(__dirname+"/homepage1.html");
    }
    catch(err)
    {
        console.log("error occuring while loading home page"+err);
        res.send("error occurs in home page");
    }
})
app.get("/uk",async function(req,res)
{
    try
    {
        res.sendFile(__dirname+"/ukpage.html");
    }
    catch(err)
    {
        console.log("error occuring while loading home page"+err);
        res.send("error occurs in home page");
    }
})
app.get("/explore",async function(req,res)
{
    try{
        res.sendFile(__dirname+"/explore.html")
    }
    catch(err)
    {
        console.log("can't open the explore page"+err)
    }
})
app.get("/canada",async function(req,res)
{
    try
    {
        res.sendFile(__dirname+"/canada.html");
    }
    catch(err)
    {
        console.log("error occur during canada page"+err)
    }
})
app.get("/germany",async function(req,res)
{
    try
    {
        res.sendFile(__dirname+"/germany.html");
    }
    catch(err)
    {
        console.log("error occur during canada page"+err)
    }
})

app.get("/ireland",async function(req,res)
{
    try
    {
        res.sendFile(__dirname+"/ire.html");
    }
    catch(err)
    {
        console.log("error occur during canada page"+err)
    }
})

//application section route
app.get("/application",async function(req,res)
{
    try{
        res.sendFile(__dirname+"/homepage.html") //place application file here
    }
    catch(err)
    {
        console.log("error occur in student visa route"+err)
    }
})

//about us section route
app.get("/about",async function(req,res)
{
    try{
        res.sendFile(__dirname+"/about.html") //place application file here
    }
    catch(err)
    {
        console.log("error occur in about us route"+err)
    }
})

//contact us page
app.get("/contact",async function(req,res)
{
    try
    {
        res.sendFile(__dirname+"/contact.html");
    }
    catch(err)
    {
        console.log("error occurs during contact us page"+err);
    }
})

//posting request to the database from user
// posting request to the database from user
app.post("/contact", async function(req, res) {
    try {
        const { name, email, exp, area, location } = req.body;
        const newContact = new Contact({ name, email, exp, area, location });
        const savedContact = await newContact.save(); // save the document
        console.log("Contact saved successfully:", savedContact); // log the saved document
        res.json({ success: true, message: "Message sent successfully" });
    } catch (err) {
        console.error("Error saving contact:", err); // log the error
        res.status(500).json({ success: false, message: "Error: Unable to process the request" });
    }
});




//route for study section
app.get("/study",async function(req,res)
{
    try
    {
        res.sendFile(__dirname+"/studypage.html")//study section file 
    }
    catch(err)
    {
        console.log("can't reach to the study page" +err);
        res.send("can't reach to the study page");
    }
})
app.listen(4000,async function()
{
    console.log("server is running on port 4000");
})