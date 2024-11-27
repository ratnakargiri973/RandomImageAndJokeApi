import axios from 'axios';
import express from 'express';

const app = express();

const port = 9400;

app.use(express.json());

// Endpoint for random jokes
app.get('/api/jokes/random', async (req, res) => {
    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
        const joke = {
            setup: response.data.setup,
            punchline: response.data.punchline
        };
        res.json(joke);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching random jokes");
    }
});

// Endpoint for random images
app.get('/api/images/random', async (req, res) => {
    try {
        const response = await axios.get('https://picsum.photos/200', { responseType: 'arraybuffer' });
        res.set('Content-Type', 'image/jpeg');
        res.send(response.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching random images");
    }
});

// Combined endpoint for random jokes and images
app.get('/api/jokes-and-images/random', async (req, res) => {
    try {
        // Fetch random joke
        const jokeResponse = await axios.get("https://official-joke-api.appspot.com/random_joke");
        const joke = {
            setup: jokeResponse.data.setup,
            punchline: jokeResponse.data.punchline
        };

        // Fetch random image
        const imageResponse = await axios.get('https://picsum.photos/200', { responseType: 'arraybuffer' });
        const imageBase64 = Buffer.from(imageResponse.data, 'binary').toString('base64');

        // Send combined response
        res.json({
            joke: joke,
            image: `data:image/jpeg;base64,${imageBase64}`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching random joke and image");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
