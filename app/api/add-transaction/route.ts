import { connectToDB } from "@/lib/db/db";
import Transaction from "@/lib/db/Transaction-Model";
import { TransactionSchema } from "@/lib/validators/TransactionSchema";

export async function POST(req:Request){
let validData;
const Data = await req.json()
try {
    await connectToDB();

    console.log('dataaa',Data);

    validData = await TransactionSchema.parse(Data)
   

    if(validData){
        const transaction = await Transaction.create(validData)
        console.log('transaction',transaction);
        console.log('dataaa',Data);
        
        return Response.json({message:"OK"},{status:201})
    }
    else{
        return Response.json({message:"error in schema validation"},{status:400})
    }
} catch (error) {
    console.log(error);
    
    return Response.json({message:"error adding transaction"})
}
}

