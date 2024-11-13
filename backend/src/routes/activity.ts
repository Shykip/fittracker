import { Router } from "express"
import { Activity } from "./../models/Activity"
import { Request, Response } from "express"
import { AppDataSource } from "../initializers/data-source"
import { upload } from "../services/multer-config"

const router: Router = Router()


router.post('/', upload.none(), async (req: Request, res: Response) => {

    const { activity_name, met_value } = req.body

    try {

        const activityRepository = AppDataSource.getRepository(Activity)
        const foundActivity = await activityRepository.findOne({where: {activity_name: activity_name}})
        if (foundActivity) return res.status(409).json({message: 'Activity name already exist', success: false})

        const activity: Activity = Activity.create({
            activity_name: activity_name,
            met_value: parseFloat(met_value)
        })

        await activityRepository.save(activity)
        return res.status(200).json({ data: activity, message: 'Activity registered successfully', success: true })

    } catch (error) {
        console.log(error)
    }

})



router.put('/', upload.none(), async (req: Request, res: Response) => {

    // const { full_name, date_of_birth, gender, email, password, weight, height } = req.body
    // const targetId = req.query.targetId as string

    // try {

    //     const userRepository = AppDataSource.getRepository(User)
    //     const foundUser = await userRepository.findOne({where: {id: parseInt(targetId)}})
    //     if (!foundUser) return res.status(404).json({message: 'User does not exist', success: false})
        
    //     foundUser.full_name = full_name
    //     foundUser.date_of_birth = date_of_birth? new Date(date_of_birth) : undefined
    //     foundUser.gender = gender
    //     foundUser.weight = parseFloat(weight)
    //     foundUser.height = parseFloat(height)
    //     foundUser.email = email
    //     if (password) foundUser.password = await argon2.hash(password)

    //     userRepository.save(foundUser)
    //     return res.status(200).json({data: foundUser, message: 'User is updated successfully', success: true})

    // } catch (error) {
    //     console.log(error)
    // }
    
})



router.get('/', upload.none(), async (req: Request, res: Response) => {

    const targetId = req.query.targetId as string

    try {

        const activityRepository = AppDataSource.getRepository(Activity)

        if (targetId) {
            const activity = await activityRepository.findOne({where: {id: parseInt(targetId)}})
            if (activity) return res.status(200).json({message: 'Data found', data: activity, success: true})
            return res.status(404).json({message: 'No data found', success: false})
        }
        
        const activityList = await activityRepository.find()
        if (activityList && activityList.length > 0)
            return res.status(200).json({message: 'Data found', data: activityList, success: true})

        return res.status(404).json({message: 'No data found', success: false})

    } catch (error) {
        console.log(error)
    }

})



router.delete('/', upload.none(), async (req: Request, res: Response) => {

    const targetId = req.query.targetId as string

    try {

        const activityRepository = AppDataSource.getRepository(Activity)

        if (targetId) {
            const activity = await activityRepository.findOne({where: {id: parseInt(targetId)}})
            await activityRepository.delete(activity.id)
            return res.status(200).json({message: 'Deletion success', target: activity, success: true})
        }

        return res.status(400).json({message: 'Valid id is required', success: false})
        
    } catch (error) {
        console.log(error)
    }

})


export default router