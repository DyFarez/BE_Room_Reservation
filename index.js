const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const cookieParse = require('cookie-parser')
const { roomRouter } = require('./routes/roomRoute.js');
const { userRouter } = require('./routes/UserRoute.js');

const app = express();
const port = 8000;

dotenv.config();
app.use(cors({ credentials:true, origin:'http://localhost:3000' }))
app.use(cookieParse())
app.use(express.json());
app.use(roomRouter)
app.use(userRouter)

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(port, () => console.log(`Server Successfully Running On ${port}`))