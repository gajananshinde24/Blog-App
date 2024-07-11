const asyncHandler = require('../utils/asyncHandler')
const mongoose = require('mongoose')

const connectDB = asyncHandler(async () => { 
                                        //mongodb+srv://gajananshinde:AiNodeCluster@ainodecluster.e9jcyzu.mongodb.net/atmecs_db?retryWrites=true&w=majority&appName=aiNodeCluster
        const conn = await mongoose.connect("mongodb+srv://gajanan:Gajanan%40123@cluster0.u4qqbyg.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`MongoDB connected: ${conn.connection.host}`);
 
});

module.exports = connectDB;