import { connectToDB } from "@/lib/db/db";
import Transaction from "@/lib/db/Transaction-Model";
import { TransactionUpdateSchema } from "@/lib/validators/TransactionUpdateSchema";

export async function PATCH(req:Request){
let validData;
const Data = await req.json()
try {
    await connectToDB();

    console.log('dataaa',Data);

    validData = await TransactionUpdateSchema.parse(Data)
   

    if(validData){

        const { id, ...updateData } = validData;
        const transaction = await Transaction.updateOne(
            { _id: id }, // Filter: Find the transaction by `id`
            { $set: updateData } // Update: Set the new values
          );

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

