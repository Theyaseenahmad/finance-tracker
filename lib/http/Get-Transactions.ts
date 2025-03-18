
import axios from "axios"

const GetTransactions = async ()=>{
    try {
        
        const response = await axios.get('/api/get-transactions')

        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('fucked')
    }
   
}

export default GetTransactions