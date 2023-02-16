//dependencies
import { Router } from "express";
const router = Router();
import passport from "passport";
//Import User model
import User, { register } from "../models/User";

//new user signup page display
router.get("/", (req, res) => {
  res.render("clerksReg", { title: "New Clerk Registration" });
});

//New user signup
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await register(newUser, req.body.passCode, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(req.body);
        res.redirect("/login");
      }
    });
  } catch (err) {
    res.status(500).send("Error");
    console.log(err);
  }
});


// Sign out route
router.get('/logout',(req,res)=>{
  if(req.session){
      req.session.destroy((err)=>{
          if(err){
              console.log('Sign out error');
          }
          else{
              return res.redirect('/');
          }
      });
  }
});

//Export module
export default router;
