const utilConst = require("../../utils/const");

class connectDB{
    async dbCredentials(){
    const pgConnect = {
    user: `${utilConst.Const.username}`,
    host: `${utilConst.Const.host}`,
    database: `${utilConst.Const.dbName}`,
    password: `${utilConst.Const.psd}`,
    port: `${utilConst.Const.port}`,
    ssl: { rejectUnauthorized: false }
   };
   return pgConnect
}
}
module.exports= new connectDB();