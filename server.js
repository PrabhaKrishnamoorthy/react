import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import session from 'express-session';

const saltRounds =10;
const jwtSecret="sample";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
    session({
        secret:'records',
        resave:true,
        saveUninitialized:false,
        cookie:{
            maxAge:30000, //set the expiration time to 30 sec
        }
    })
);

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mydb3"
})

con.connect((err)=>{
    if(err){
        console.err('Error connecting to the database:',err);
        return;
    }
    console.log('Connected to the database.');
});

app.post("/register", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const sql ="INSERT INTO admin (username, password) VALUES(?, ?)";

    bcrypt.hash(password, saltRounds, (err, hashedPassword)=>{
        if(err){
            console.err("Error hashing password:",err);
            return res.status(500).json({err:"An error occured during registration."})
        }
        con.query(sql,[username, hashedPassword],(err, result)=>{
            if(err){
                console.err("Error registering user:",err);
                return res.status(500).json({err:"An err occured during registration."})
            }
            res.status(200).json({message:"Registration Successful"});
        });
    });
});

app.post ("/login",(req, res)=>{
    const username = req.body.username;
    const password = req. body.password;
    const sql = "SELECT * FROM admin WHERE username=?";

    con.query(sql, username,(err, result)=>{
        if(err){
            res.send({err:err});
        }
        if(result.length >0){
            bcrypt.compare(password, result[0].password,(err, response)=>{
                if(response){
                    req.session.username = username;
                    const token = jwt.sign({username},jwtSecret,{expiresIn:'30m'});
                    return res.status(200).json({token});
                }else{
                    res.send({message:'Wrong username/password combination'})
                }
            })
        }else {
            res.send({message:"user doesn't exists"});
        }
    });  
});

//middleware to verify JWT token 
const verifyToken =(req, res, next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(403).json ({message:"Access denied. No token provided"});
    }
    jwt.verify(token, jwtSecret, (err, decoded)=>{
        if(err){
            return res.status(401).json({message:"Invalid token."});
        }
        req.user = decoded;
        next();
    });
}
/*
app.get('/employees/', verifyToken, (req, res)=>{
    let {limit = 5, offset =0}=req.query;

    limit = parseInt(limit);
    offset = parseInt(offset);

    if(isNaN(limit)){
        limit=5;
    }
    if(isNaN(offset)){
        offset=0
    }
    const sql ="SELECT * FROM employee LIMIT ? OFFSET ?";
    con.query(sql, [limit, offset],(err, result)=>{
        if(err){
            console.err("An error occured while retriving employees.",err);
            return res.status(500).json({err:"An error occured while retriving employees."});
        }
        console.log(result);
        return res.json(result);
    });
});
*/

app.get('/employees', verifyToken,(req, res)=>{
    
    const username= req.session.username;

    const sql ="SELECT * FROM employee"
    con.query(sql, (err, result)=>{
        if(err){
            console.err("An errror occured while retriving employees",err);
            return res.status(500).json({err:"An error occured while retrieving employee"});
        }
        console.log(result);
        return res.json(result)
    });
});

app.get('/read/:id', verifyToken,(req, res)=>{
    const sql="SELECT * FROM employee WHERE id=?"
    const id = req.params.id;
    con.query(sql,[id],(err, result)=>{
        if(err) throw err;
        return res.json(result)
    })
});

app.post('/create', verifyToken, (req, res)=>{
    const sql="INSERT INTO employee (`id`,`employee_id`,`name`,`email`,`mobile_no`) VALUES(?)";
    const values=[
        req.body.id,
        req.body.employee_id,
        req.body.name,
        req.body.email,
        req.body.mobile_no
    ]
    con.query(sql,[values],(err, result)=>{
        if(err) {
            if(err.code === 'ER_DUP_ENTRY'){
                console.error("Employee with this ID already exists.");
                return res.status(400).json({error:"employee with this ID already exists."});
            }
            console.error("An error occurred while creating an employee.", err);
            return res.status(500).json({error:'An error occured while creating an employee.'});
        }
        return res.status(201).json({message:'Employee created successfully.'});
    })
})

app.put('/update/:id',(req, res)=>{
    const sql="UPDATE employee SET `id`=?,`employee_id`=?,`name`=?,`email`=?,`mobile_no`=? WHERE id=?"
    const id=req.params.id;
    const values=[
        req.body.id,
        req.body.employee_id,
        req.body.name,
        req.body.email,
        req.body.mobile_no,
        id
    ]
    con.query(sql,values,(err, result)=>{
        if(err) throw err;
        return res.json(result);
    })
})

app.delete('/delete/:id', verifyToken,(req, res)=>{
    const sql="DELETE FROM employee WHERE id=?";
    const id=req.params.id;
    con.query(sql,[id],(err, result)=>{
        if(err) throw err;
        return res.json(result);
    })
})

app.listen(8001,()=>{
    console.log("listening on port 8001");
});