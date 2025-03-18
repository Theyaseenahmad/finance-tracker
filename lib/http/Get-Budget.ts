
import axios from "axios"

const GetBudget = async ()=>{
    try {
        const response = await axios.get('/api/get-budget')

        return response.data
    } catch (error) {
        console.log(error);
        throw new Error('fucked')
    }
   
}

export default GetBudget