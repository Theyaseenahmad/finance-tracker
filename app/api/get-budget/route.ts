import CategoryBudget from "@/lib/db/Category-Budget-Model";
import { connectToDB } from "@/lib/db/db";

export async function GET(){

try {
    await connectToDB();

    console.log('in api budget');
    

    const budget = await CategoryBudget.find();

    console.log('budget',budget);

    if(budget.length>0){
        return Response.json({
            budget,
        },{status:200})
    }else{
        return Response.json({
            budget:[],
        },{status:200})
    }

  
} catch (error) {
    console.log(error);
    return Response.json({budget:[],message:"cannot get budget"},{status:500})
}
}

