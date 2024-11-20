/* All packages imported */
const express = require(`express`);
const app = express();
require(`dotenv`).config();
const cors = require(`cors`);
const port = process.env.PORT || 5000;


/* Express Middleware */
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@provabok.zzy7f.mongodb.net/?retryWrites=true&w=majority&appName=Provabok`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        /* All collections of Database */
        const database = client.db(`provabok`);
        const jobs = database.collection(`jobs`);


        /* All client listed routes */


        /* All administration listed routes */

        /* jobs */
        app.get(`/v1/jobs`, async (req, res) => {

            const findRes = await jobs.find().toArray();
            console.log(`jobs: `, findRes);

            res.send(findRes);
        });

        app.post(`/v1/jobs/create-item`, async (req, res) => {
            const item = req.body;
            console.log(`create-item: `, item);

            const insertedRes = await jobs.insertOne(item);
            console.log(insertedRes);

            res.send(insertedRes);
        });



    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



/* all routes */
app.get(`/`, (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Provabok</title>
            </head>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; overflow-x: hidden; height: 100vh;">

                <!-- Header -->
                <header style="background-color: royalblue; color: white; padding: 15px 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">Provabok</h1>
                </header>

                <!-- Hero Section -->
                <section style="display: flex; flex-direction: column; align-items: center; padding: 50px 20px; text-align: center;">
                    <h2 style="font-size: 32px; color: #333; margin-bottom: 10px; animation: fadeInDown 1s;">Welcome to Provabok Backend Software Website.</h2>
                    <p style="font-size: 18px; color: #666; max-width: 600px; animation: fadeInUp 1s;">
                        This is a simple and clean landing backend application page. Here, you can find detials that is easy to read and navigate.
                    </p>

                    <a href="https://provabok.web.app/" style="margin-top: 20px; padding: 10px 25px; font-size: 18px; background-color: blue; color: white; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease; animation: fadeIn 1.5s; cursor: pointer;"
                    onmouseover="this.style.backgroundColor='royalblue';" 
                    onmouseout="this.style.backgroundColor='blue';">
                        Learn More
                    </a>
                </section>

                <!-- Features Section -->
                <section style="padding: 40px 20px; background-color: #fff;">
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
                        <!-- Feature 1 -->
                        <div style="width: 250px; padding: 20px; text-align: center; border: 1px solid #e0e0e0; border-radius: 8px; animation: fadeInUp 1s;">
                            <h3 style="font-size: 20px; color: royalblue;">Job</h3>
                            <p style="font-size: 16px; color: #777;">We are dedicated to building a beautiful, well-established that elevates your career.</p>
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer style="background-color: royalblue; color: white; text-align: center; padding: 10px 20px; animation: fadeIn 1s; width: 100%; position: absolute; bottom: 0px;">
                    <p style="margin: 0; font-size: 14px;">&copy; ${new Date().getFullYear()} Provabok. All rights reserved.</p>
                </footer>

                <!-- Animations -->
                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes fadeInUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }

                    @keyframes fadeInDown {
                        from { transform: translateY(-20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                </style>
            </body>
        </html>
        `)
});


/* port listener */
app.listen(port, (req, res) => {
    console.log(`Provabok Server Software is running now on PORT: ${port}.`);
    // console.log(process.env);
});