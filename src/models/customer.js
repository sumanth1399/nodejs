import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    // name:String,
    industry:String,
    orders: [{
        item: String,
        price: Number
        }
    ]   
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
// module.exports= mongoose.model('Customer',customerSchema);