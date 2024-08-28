import express, { query, Request, response, Response } from 'express';
import expressSession from "express-session";
import path from 'path';
import fs from "fs";
import jsonfile from "jsonfile";
import { Client } from "pg";
import dotenv from "dotenv";
import { checkPassword, hashPassword } from "./utils/hash";
import { userRouter } from "./routes/userRoutes";


dotenv.config();

export const pgClient = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost"
    // port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432
});

pgClient.connect();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    expressSession({
        secret: "Tecky-C32-WSP012-Michael-Victor-Kees",
        resave: true,
        saveUninitialized: true,
    })
);

declare module "express-session" {
    interface SessionData {
        userId?: number;
    }
}


//get photo from databases
app.get('/main', async (req: Request, res: Response) => {
    try {
        const result = await pgClient.query(`select image_path from product_image where product_id between 1 and 6`);
        console.log('result is!!!!!!!!', result);
        res.json(result.rows.map(row => row.image_path));
    } catch (error) {
        console.log('error is!!!!!!!!!', error);
        res.status(500).json({ message: "An error occurred while retrieving the images." });
    }
});

<<<<<<< HEAD
//     try {
//         const cardId = req.query.id;
//         if (!cardId) {
//             return res.status(400).json({ message: "Missing card ID parameter." });
//         }
//         const result = await pgClient.query(`select image_path from product_image where id = $1`, [cardId]);
//         if (result.rows.length === 0) {
//             return res.status(404).json({ message: "Image not found." 
//             });
//         }
//         console.log('result is!!!!!!!!', result);
//         res.json({ imagePath: result.rows[0].image_path });
//     } catch (error) {
//         console.log('error is!!!!!!!!!', error);
//         res.status(500).json({ message: "An error occurred while retrieving the image." });
//     } return
// });

// app.get('/', (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, 'public', 'main.html'));
// });

app.post("/login", async (req: Request, res: Response) => {
    const data = req.body
    const username = data.username
    const password = data.password
    const result = ((await pgClient.query(`select * from member where username = '${username}' and password = '${password}';`)));
    const row = result.rows[0]
    const count = result.rowCount
    if (count == 0) {
        res.status(401).json({ message: "The username or password is incorrect." })
        return
    }
    req.session.userId = row.id
    res.json({ message: "Login successful.", nickanme: row.nickname, userId: req.session.userId })
})



app.post("/register", async (req: Request, res: Response) => {
   
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const nickname = data.nickname;
    const gender = data.gender;
    const birthday = data.birthday;
    const phone = data.phone;
    const address = data.address;
    const email = data.email
    const sql_1 = `Select * from member where username = '${username}'`;
    const userResult = await pgClient.query(sql_1);
    const row = userResult.rows;
    const rowCount = userResult.rowCount;
    if (rowCount == null || rowCount > 0) {
        res.status(400).json({ message: "username exists in database" });
        return;
    }
    const sql = `INSERT INTO member (username, password, nickname, gender, birthday, phone, address, email) 
      VALUES ('${username}', '${password}', '${nickname}', '${gender}', '${birthday}', '${phone}', '${address}', '${email}')RETURNING id;`;

    const insertResult = await pgClient.query(sql);
    req.session.userId = insertResult.rows[0].id
    res.json({ message: "Register successful" });
});

app.get("/userprofile", async (req: Request, res: Response) => {
    const userId = req.session.userId
    const sql_1 = `select id, username, nickname, gender, birthday, phone, address, email from member where id = $1`
    const userResult = await pgClient.query(sql_1, [userId])
    const userRows = userResult.rows
    
    
    res.json({ message: "userprofile", user: userRows[0] })
})

app.post("/logout", async (req: Request, res: Response) => {
    if (req.session.userId) {
        req.session.destroy(() => {
            res.json({ message: "Logout successful." })
        })
    } else {
        res.json({ message: "Please login first." })
    }
})


=======
>>>>>>> 8021298d27411d89bb91a540256e81c3eb47ab4c
import { isLoggedIn } from './utils/guards'

// In main.ts
app.use('/', userRouter)
// app.use('/resources', isLoggedIn, appleRoutes) // protected resources

app.use(express.static('public'))
app.use(isLoggedIn, express.static('private'))

app.use((req, res) => {
    res.redirect('404.html');
});

const port = 8080;



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});