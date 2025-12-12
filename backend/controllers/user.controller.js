const db = require("../models");
const User = db.User;

exports.findAll = async (req, res) => {
  res.json(await User.findAll());
};

exports.create = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};
exports.loginAdmin = async (req,res)=>{
   const {login,password}=req.body;

   const user = await User.findOne({where:{login,password}});
   if(!user) return res.json({ok:false,error:"wrong login"});

   res.json({
      ok:true,
      role:"admin"
   });
}

