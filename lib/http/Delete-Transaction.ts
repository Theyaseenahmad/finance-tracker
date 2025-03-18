import axios from "axios"

const DeleteTransaction = async(_id : string)=>{
    try {
        console.log('here http');
        
        const response = await axios.delete(`/api/delete-transaction`, {
            params: { _id }, // Pass `_id` as a query parameter
          });

        return Response.json({message:response.data},{status:200})
    } catch (error) {
        console.log(error);
        
        return Response.json({message:'error in http'},{status:500})
    }

}
export default DeleteTransaction