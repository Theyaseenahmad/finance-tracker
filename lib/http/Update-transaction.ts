import axios from "axios"

export interface UpdatedData {
    id: string; // Assuming `_id` is a string
    amount: number;
    description: string;
    category:string,
    date: string; // Date in ISO format (e.g., "2023-10-25")
  }

const UpdateTransaction = async(data : UpdatedData)=>{
    try {
        const response = await axios.patch('/api/update-transaction',data)

        if(response.data){

            return Response.json({message:response.data},{status:200})
        }
        return Response.json({message:response.data},{status:400})

    } catch (error) {
        console.log(error);
        
        return Response.json({message:'error in http'},{status:500})
    }

  

}
export default UpdateTransaction