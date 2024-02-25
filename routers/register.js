const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
     res.render("register");
});

router.post('/', async (req, res) => {
     //console.log(req.body);
     const { emailSignIn, pwSignIn, email, pw1, pw2 } = req.body ?? {};
     if (email && pw1 && pw2) {
          try {
               if (pw1 != pw2) 
                    throw new Error('Passwords don\'t match');
               else{
                    const result = await db('useraccount').count('email').where({ email: email });
                    const mail = result[0]['count(`email`)']     
                    if (mail === 1) 
                         throw new Error('I already have an email');
                    else { //create acccount
                         const result = await db('useraccount').insert({ Email: email,Passwords: pw1 });
                         const insertedID = result[0];
                         if(insertedID){
                              const pf  = await db('userprofile').insert({user_id: insertedID});
                              const img = await db('images').insert({image_id: insertedID});
                              const fll = await db('follow').insert({follow_id: insertedID});
                              if(!pf || !img || !fll)
                                 throw new Error(); 
                          }
                         else
                             throw new Error();    
               }
          }
          } catch (error) {
               console.log(error);
               let errmass = 'มีบ่างอย่างผิกพลาด โปรดลองใหม่ในภายหลัง';
               if (error.message === 'Passwords don\'t match') {
                    errmass = 'Passwords don\'t match';
               }
               else if (error.message === 'I already have an email') {
                    errmass = 'I already have an email';
               }
               return res.render("register", { errmass, values: { email, pw1, pw2 } });
          }
          res.redirect('register');
     }

     if (emailSignIn && pwSignIn) {
          //  console.log(emailSignIn);
          //  console.log(pwSignIn);
          try {
               // ตรวจสอบข้อมูล login จากฐานข้อมูล
               const user = await db('useraccount')
                    .where({ Email: emailSignIn ,Passwords:pwSignIn})
                    .first();
                    if (user) {
                         // ถ้า login สำเร็จ, ตั้งค่า userId ใน session
                         res.cookie("session-id", user.id, {
                              maxAge: 3 * 24 * 60 * 60 * 1000 // กำหนด timeout หน่วยเป็น millisecond
                          });
                          
                          //console.log(req.cookies["session-id"]);
                          res.redirect('/Youporfile');
                          res.end();  // หรือไปที่หน้าอื่น หลังจากล็อกอินสำเร็จ
                         
                    }
                    else 
                       throw new Error('*is not account');
                       
          } catch (error) {
               console.log(error);
               let err;
               if(error.message)
                    err = error.message;

               return res.render('register',{err, val:{emailSignIn,pwSignIn}})
          }       
     }    
});

module.exports = router;