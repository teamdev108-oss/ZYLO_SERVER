import  express from 'express'
import  {config} from 'dotenv'
import  connectDb  from "./config/db.js"
config()
const app =  express()
const port = process.env.PORT

connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`app running port ${port}`);
        
    })
})


 