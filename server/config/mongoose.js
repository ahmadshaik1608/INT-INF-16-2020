const mongoose=require('mongoose');
//connecting db here name of db is todo_list_db
mongoose.connect('mongodb+srv://Recall_Test1:recalltest1@cluster0.dq0uh.mongodb.net/Cluster0?retryWrites=true&w=majority',{ useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
const db=mongoose.connection;
//checking if there is error while conection
db.on('error',console.error.bind(console,'error connectig to db'));
//checking whether connection is opened
db.once('open',function(){
    console.log('db sucesfully conected');
})

module.exports=db

// mongodb+srv://Recall_Test1:<password>@cluster0.dq0uh.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb://localhost/RecallDb