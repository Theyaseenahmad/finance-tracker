import { connectToDB } from "@/lib/db/db";
import Transaction from "@/lib/db/Transaction-Model";

export async function DELETE(req:Request){
try {
    await connectToDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (!_id) {
      return new Response(JSON.stringify({ message: "Missing `_id` parameter" }), {
        status: 400,
      });
    }

    // Delete the transaction
    const result = await Transaction.deleteOne({ _id });
    console.log('transaction del res',result);
    
    return Response.json({message:"OK Deleted"},{status:201})
} catch (error) {
    console.log(error);
    
    return Response.json({message:"error deleting transaction"})
}
}

