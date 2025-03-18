import { connectToDB } from "@/lib/db/db";
import Transaction from "@/lib/db/Transaction-Model";

export async function GET(){

try {
    await connectToDB();

    const transactions = await Transaction.find();

    console.log('trans',transactions);

    if(transactions.length>0){
        return Response.json({
            transactions,
        },{status:200})
    }else{
        return Response.json({
            transactions:[],
        },{status:200})
    }

  
} catch (error) {
    console.log(error);
    return Response.json({transactions:[],message:"cannot get transactions transaction"},{status:500})
}
}

