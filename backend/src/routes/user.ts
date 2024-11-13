import { Router } from "express"
import { User } from "./../models/User"
import { Request, Response } from "express"
import { AppDataSource } from "../initializers/data-source"
import argon2 from "argon2"
import { upload } from "../services/multer-config"

const router: Router = Router()


router.post('/', upload.none(), async (req: Request, res: Response) => {

    const { full_name, date_of_birth, gender, email, password, weight, height, interested_in } = req.body

    try {

        const userRepository = AppDataSource.getRepository(User)
        const foundUser = await userRepository.findOne({where: {email: email}})
        if (foundUser) return res.status(409).json({message: 'Email already exists', success: false})

        const hashedPassword = await argon2.hash(password)

        const user: User = User.create({
            full_name: full_name,
            date_of_birth: new Date(date_of_birth),
            gender: gender,
            email: email,
            password: hashedPassword,
            weight: parseFloat(weight),
            height: parseFloat(height),
            interested_in: interested_in,
            isAdmin: false
        })

        await userRepository.save(user)
        return res.status(200).json({ data: user, message: 'User registered successfully', success: true })

    } catch (error) {
        console.log(error)
    }

})



router.put('/', upload.none(), async (req: Request, res: Response) => {

    const { full_name, date_of_birth, gender, email, password, weight, height, interested_in } = req.body
    const targetId = req.query.targetId as string

    try {

        const userRepository = AppDataSource.getRepository(User)
        const foundUser = await userRepository.findOne({where: {id: parseInt(targetId)}})
        if (!foundUser) return res.status(404).json({message: 'User does not exist', success: false})
        
        foundUser.full_name = full_name
        foundUser.date_of_birth = date_of_birth? new Date(date_of_birth) : undefined
        foundUser.gender = gender
        foundUser.weight = parseFloat(weight)
        foundUser.height = parseFloat(height)
        foundUser.interested_in = interested_in
        foundUser.email = email
        if (password) foundUser.password = await argon2.hash(password)

        userRepository.save(foundUser)
        return res.status(200).json({data: foundUser, message: 'User is updated successfully', success: true})

    } catch (error) {
        console.log(error)
    }
    
})



router.get('/', upload.none(), async (req: Request, res: Response) => {

    const targetId = req.query.targetId as string

    try {

        const userRepository = AppDataSource.getRepository(User)

        if (targetId) {
            const user = await userRepository.findOne({where: {id: parseInt(targetId)}})
            if (user) return res.status(200).json({message: 'Data found', data: user, success: true})
            return res.status(404).json({message: 'No data found', success: false})
        }
        
        const userList = await userRepository.find()
        if (userList && userList.length > 0)
            return res.status(200).json({message: 'Data found', data: userList, success: true})

        return res.status(404).json({message: 'No data found', success: false})

    } catch (error) {
        console.log(error)
    }

})



router.delete('/', upload.none(), async (req: Request, res: Response) => {

    const targetId = req.query.targetId as string

    try {

        const userRepository = AppDataSource.getRepository(User)

        if (targetId) {
            const user = await userRepository.findOne({where: {id: parseInt(targetId)}})
            await userRepository.delete(user.id)
            return res.status(200).json({message: 'Deletion success', target: user, success: true})
        }

        return res.status(400).json({message: 'Valid id is required', success: false})
        
    } catch (error) {
        console.log(error)
    }

})


export default router