import { Router } from "express"
import { FitnessRecord } from "./../models/FitnessRecord"
import { Activity } from "./../models/Activity"
import { Recommendation } from "./../models/Recommendation"
import { User } from "./../models/User"
import { Request, Response } from "express"
import { AppDataSource } from "../initializers/data-source"
import { upload } from "../services/multer-config"

const router: Router = Router()


router.post('/', upload.none(), async (req: Request, res: Response) => {

    const { activity_id, user_id, activity_date, duration_min } = req.body

    try {

        const fitnessRecordRepository = AppDataSource.getRepository(FitnessRecord)
        const activityRepository = AppDataSource.getRepository(Activity)
        const userRepository = AppDataSource.getRepository(User)

        const foundActivity = await activityRepository.findOne({where: {id: parseInt(activity_id)}})
        const foundUser = await userRepository.findOne({where: {id: parseInt(user_id)}})


        // -----CALORIE BURN ESTIMATION ALGRORITHM-------------------------------------------------------------------
        const currentDate = new Date()
        const birthDate = new Date(foundUser.date_of_birth)
        let age = currentDate.getFullYear() - birthDate.getFullYear()
        const monthDifference = currentDate.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) age--
        let bmr: number
        if (foundUser.gender === "Male") bmr = 88.362 + (13.397 * foundUser.weight + (4.799 * (foundUser.height*30.48) ) ) - (5.677 * age)
        else bmr = 447.593 + (9.247 * foundUser.weight + (3.098 * (foundUser.height*30.48) ) ) - (4.330 * age)
        const calories_burnt = (bmr/24) * foundActivity.met_value * (duration_min/60)
        // -----CALORIE BURN ESTIMATION ALGRORITHM-------------------------------------------------------------------
        

        const fitnessRecord: FitnessRecord = FitnessRecord.create({
            activity: foundActivity,
            user: foundUser,
            activity_date: new Date(activity_date),
            duration_min: duration_min,
            calories_burnt: calories_burnt,
        })

        await fitnessRecordRepository.save(fitnessRecord)

        // updating recommendation
        const tags: string[] = JSON.parse(foundUser.tags);
        tags.push(foundActivity.tag);
        foundUser.tags = JSON.stringify(tags);
        userRepository.save(foundUser);

        return res.status(200).json({ data: fitnessRecord, message: 'Fitness_record registered successfully', success: true })

    } catch (error) {
        console.log(error)
    }

})



router.put('/', upload.none(), async (req: Request, res: Response) => {

    // const {  activity_id, user_id, activity_date  } = req.body
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

    const userId = req.query.userId as string

    try {

        const fitnessRecordRepository = AppDataSource.getRepository(FitnessRecord)
        const fitnessRecordList = await fitnessRecordRepository.find({where: {user: {id: parseInt(userId)}}, relations: ['activity'], order: { activity_date: 'DESC' }})
        if (fitnessRecordList && fitnessRecordList.length > 0)
            return res.status(200).json({message: 'Data found', data: fitnessRecordList, success: true})

        return res.status(404).json({message: 'No data found', success: false})

    } catch (error) {
        console.log(error)
    }

})



router.delete('/', upload.none(), async (req: Request, res: Response) => {

    const targetId = req.query.targetId as string

    try {

        const fitnessRecordRepository = AppDataSource.getRepository(FitnessRecord)

        if (targetId) {
            const fitnessRecord = await fitnessRecordRepository.findOne({where: {id: parseInt(targetId)}})
            await fitnessRecordRepository.delete(fitnessRecord.id)
            return res.status(200).json({message: 'Deletion success', target: fitnessRecord, success: true})
        }

        return res.status(400).json({message: 'Valid id is required', success: false})
        
    } catch (error) {
        console.log(error)
    }

})


export default router