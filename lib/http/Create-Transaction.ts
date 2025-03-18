
import { TransactionData } from "@/app/types/TransactionData"
import axios from "axios"

const CreateTransaction =async (data:TransactionData)=>{
    try {

        const actualData = {
            amount:Number(data.amount),
            date:(data.date),
            description:(data.description),
            category:data.category
        }
        
        const response = await axios.post('/api/add-transaction',actualData)

        return response.data
    } catch (error) {
        console.log(error);
        
        throw new Error('fucked')
    }
   
}

export default CreateTransaction