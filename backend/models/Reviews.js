import {Schema,model,Types} from 'mongoose'

const reviewsSchema = new Schema({
    rating:{
        type:Number,
        default:1,
    },
    comment:{
        type:String,
    },
    productId:{
        type:Types.ObjectId,
        ref:"Product",
    },
    userId: { type: Types.ObjectId ,ref:"User" },

},{
    timestamps:true
})

const ReviewModel = model("Review",reviewsSchema)

export default ReviewModel