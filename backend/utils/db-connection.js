const {Sequelize}=require('sequelize');

const sequelize = new Sequelize('chat_app','root','Satvant123!',{
    host:'localhost',
    dialect:'mysql'
});

(async()=>{
    try{
        await sequelize.authenticate();
        console.log('database connected successfully');

    }catch(err){
        console.log(err);
        console.log('database connection failed');
    }

})();
module.exports=sequelize;