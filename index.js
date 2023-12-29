const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
const connect = require('./db/Config')
const userRouter = require('./router/UserRouter')
const taskRouter = require('./router/TaskRouter')


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static('./frontEnd/build'))

app.use('/api/user', userRouter);
app.use('/api/task', taskRouter)

const PORT = process.env.PORT || 5000;

connect().then(()=> {
    try{
        app.listen(PORT, ()=> {
            console.log(`Server Connected Successfully to the PORT ${PORT}`)
        })
    }
    catch(error) {
        console.log(error)
        console.log("Some error occured while connecting to the server.")
    }
}).catch((error) =>{
    console.log(error)
    console.log('Invalid Database Connection...!')
})