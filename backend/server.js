// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import 'dotenv/config'
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";





// const app=express()
// const port =4000


// app.use(express.json())
// app.use(cors({
//     origin: "https://fooddelivery-frontend.vercel.app/", //allow request only from these site
//     methods: ["GET","POST","PUT","DELETE"],
//     credentials: true, //for getting cookies and other headers from backend
//     samesite : "none",
//     secure: true,
//   }))

// //db connection
// connectDB();

// //api endpoints
// app.use("/api/food",foodRouter)
// app.use("/images",express.static('uploads'))
// app.use("/api/user",userRouter)
// app.use("/api/cart",cartRouter)
// app.use("/api/order",orderRouter)


// app.get("/",(req,res)=>{
//     res.send("API working")
// })

// app.listen(port,()=>{
//     console.log(`Server Started on http://localhost:${port}`)
// })
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = 4000;

app.use(express.json());

const allowedOrigins = [
  'https://fooddelivery-frontend.vercel.app',
  'https://fooddelivery-frontend-36mb7b0qp-sauravls-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // for getting cookies and other headers from backend
  samesite: "none",
  secure: true,
}));

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});


