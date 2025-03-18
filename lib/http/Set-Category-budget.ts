
import { CategoryBudgetType } from "@/app/types/CategoryBudgetType"
import axios from "axios"

const SetCategoryBudget =async (data:CategoryBudgetType)=>{
    try {
        console.log('inb http');
        
        const response = await axios.patch('/api/set-category-budget',data)

        console.log(response,'res');
        

        return response.data
    } catch (error) {
        console.log(error);
        
        throw new Error('fucked')
    }
   
}

export default SetCategoryBudget