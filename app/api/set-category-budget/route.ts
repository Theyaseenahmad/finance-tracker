import CategoryBudget from "@/lib/db/Category-Budget-Model";
import { connectToDB } from "@/lib/db/db";
import { CategoryBudgetSchema } from "@/lib/validators/CategoryBudgetSchema";

export async function PATCH(req:Request){
let validData;
const Data = await req.json()
try {
    console.log('in api');
    
    await connectToDB();
    validData = await CategoryBudgetSchema.parse(Data)
    if(validData){
        const newBudget = await CategoryBudget.updateOne(
            {}, // Empty filter: Matches the only document in the collection
            { $set: validData } // Update: Use $set to update the document with the new data
          );
          console.log("newBudget",newBudget);
                    
       
        return Response.json({message:"OK"},{status:201})
    }
    else{
        return Response.json({message:"error in schema validation"},{status:400})
    }
} catch (error) {
    console.log(error);
    return Response.json({message:"error updating budget"})
}
}

