import { app } from "./app";
require('./config/DDBB/mongooseImpl')

app.listen(3000,()=>{
    console.log('Node server running on port 3000');
});
