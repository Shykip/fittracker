import { Router } from "express"
import { Recommendation } from "./../models/Recommendation"
import { Request, Response } from "express"
import { AppDataSource } from "../initializers/data-source"
import { upload } from "../services/multer-config"
import { User } from "../models/User"
import { Activity } from "../models/Activity"

const router: Router = Router()


router.post('/', upload.none(), async (req: Request, res: Response) => {

    const { content_name, description, time_min, tags } = req.body

    try {

        const recommendationRepository = AppDataSource.getRepository(Recommendation)
        const foundRecommendation = await recommendationRepository.findOne({where: {content_name: content_name}})
        if (foundRecommendation) return res.status(409).json({message: 'Content name already exist', success: false})
        
        const recommendation: Recommendation = Recommendation.create({
            content_name: content_name,
            description: description,
            time_min: time_min,
            tags: tags
        })

        await recommendationRepository.save(recommendation)
        return res.status(200).json({ data: recommendation, message: 'Recommendation registered successfully', success: true })

    } catch (error) {
        console.log(error)
    }

})



router.put('/', upload.none(), async (req: Request, res: Response) => {

    const { content_name, description, time_min, tags } = req.body
    const targetId = req.query.targetId as string

    try {

        const recommendationRepository = AppDataSource.getRepository(Recommendation)
        const foundRecommendation = await recommendationRepository.findOne({where: {id: parseInt(targetId)}})
        if (!foundRecommendation) return res.status(404).json({message: 'Recommendation does not exist', success: false})
        
        foundRecommendation.content_name = content_name
        foundRecommendation.description = description
        foundRecommendation.time_min = time_min
        foundRecommendation.tags = tags

        recommendationRepository.save(foundRecommendation)
        return res.status(200).json({data: foundRecommendation, message: 'Recommendation is updated successfully', success: true})

    } catch (error) {
        console.log(error)
    }
    
})



router.get('/', upload.none(), async (req: Request, res: Response) => {

    const targetId = req.query.targetId as string
    const userId = req.query.userId as string

    try {

        // const recommendationRepository = AppDataSource.getRepository(Recommendation)
        // const userRepository = AppDataSource.getRepository(User)

        // if (targetId) {
        //     const recommendation = await recommendationRepository.findOne({where: {id: parseInt(targetId)}})
        //     if (recommendation) return res.status(200).json({message: 'Data found', data: recommendation, success: true})
        //     return res.status(404).json({message: 'No data found', success: false})
        // }
        

        // // -----CONTENT BASED FILTERING ALGRORITHM-------------------------------------------------------------------
        // const user = await userRepository.findOne({where: {id: parseInt(userId)}})
        // const interested_in: string[] = JSON.parse(user.interested_in)
        // const recommendationList = await recommendationRepository.find()
        // const updatedRecommendationList: Recommendation[] = []
        // for (const element of recommendationList) {
        //     const recommendationTags: string[] = JSON.parse(element.tags)
        //     const hasMatchingTag = interested_in.some(interest => recommendationTags.includes(interest))
        //     if (hasMatchingTag) updatedRecommendationList.push(element)
        // }
        // // -----CONTENT BASED FILTERING ALGRORITHM-------------------------------------------------------------------


        // if (updatedRecommendationList && updatedRecommendationList.length > 0)
        //     return res.status(200).json({message: 'Data found', data: updatedRecommendationList, success: true})

        // return res.status(404).json({message: 'No data found', success: false})

        const activityRepository = AppDataSource.getRepository(Activity)
        const userRepository = AppDataSource.getRepository(User)
        const foundUser = await userRepository.findOne({where: {id: parseInt(userId)}})

        const tags: string[] = JSON.parse(foundUser.tags);

        
        const activityList = await activityRepository
            .createQueryBuilder("activity")
            .where("activity.tag IN (:tags)", { tags })
            .getMany();

        function shuffleArray(array: any) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));  // Random index from 0 to i
                [array[i], array[j]] = [array[j], array[i]];    // Swap elements
            }
            return array;
        }
        const randomizedActivityList = shuffleArray(activityList);

        if (activityList && activityList.length > 0)
            return res.status(200).json({message: 'Data found', data: randomizedActivityList, success: true})

        return res.status(404).json({message: 'No data found', success: false})

    } catch (error) {
        console.log(error)
    }

})



router.delete('/', upload.none(), async (req: Request, res: Response) => {

    const targetId = req.query.targetId as string

    try {

        const recommendationRepository = AppDataSource.getRepository(Recommendation)

        if (targetId) {
            const recommendation = await recommendationRepository.findOne({where: {id: parseInt(targetId)}})
            await recommendationRepository.delete(recommendation.id)
            return res.status(200).json({message: 'Deletion success', target: recommendation, success: true})
        }

        return res.status(400).json({message: 'Valid id is required', success: false})
        
    } catch (error) {
        console.log(error)
    }

})


export default router