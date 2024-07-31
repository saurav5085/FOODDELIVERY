// import orderModel from "../models/orderModel.js"
// import userModel from "../models/userModel.js"
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// //pacing user order for frontend

// const placeOrder =async (req,res) =>{

//     const frontend_url = "http://localhost:5174"
// try {
//     const newOrder = new orderModel({
//         userId:req.body.userId,
//         items:req.body.items,
//         amount:req.body.amount,
//         address:req.body.address
//     })
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//     const line_items =req.body.items.map((item)=>({
//         price_data:{
//             currency:"inr",
//             product_data:{
//                 name:item.name
//             },
//             unit_amount:item.price*100*80
//         },
//         quantity:item.quantity

//     }))

//     line_items.push({
//         price_data:{
//             currency:"inr",
//             product_data:{
//                 name:"Delivery Charges"
//             },
//             unit_amount:2*100*80
//         },
//         quantity:1
//     })

//     const session =await stripe.checkout.sessions.create({
//         line_items:line_items,
//         mode:'payment',
//         success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//         cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
//     })

//     res.json({success:true,session_url:session.url})
// } catch (error) {
//     console.log(error)
//     res.json({success:false,message:"Error"})
// }
// }

// const verifyOrder= async (req,res)=>{
//     const {orderId,success}=req.body;
//     try {
//         if(success=="true")
//         {
//             await orderModel.findByIdAndUpdate(orderId,{payment:true});
//             res.json({success:true,message:"Paid"})
//         }
//         else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false,message:"Not Paid"})
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }
// //users order for frontend
// const userOrders =async (req,res)=>{
//     try {
//         const orders =await orderModel.find({userId:req.body.userId});
//         res.json({success:true,data:orders})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// // Listing orders for admin panel
// const listOrders = async(req,res)=>{
//     try {
//         const orders = await orderModel.find({});
//         res.json({success:true,data:orders})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }
// //api for updating order status
// const updateStatus = async (req,res) =>{
//     try {
//         await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
//         res.json({success:true,message:"Status Updated"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }
// export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define frontend URL based on environment
const frontend_url = process.env.FRONTEND_URL || "http://localhost:5174";

// Place user order
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price , // Ensure price is in the smallest unit
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 20, // Delivery charges
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log('Error placing order:', error);
        res.json({ success: false, message: "Error placing order" });
    }
};

// Verify order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.log('Error verifying order:', error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

// Get user orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log('Error fetching user orders:', error);
        res.json({ success: false, message: "Error fetching user orders" });
    }
};

// List all orders for admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log('Error listing orders:', error);
        res.json({ success: false, message: "Error listing orders" });
    }
};

// Update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.log('Error updating order status:', error);
        res.json({ success: false, message: "Error updating order status" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
