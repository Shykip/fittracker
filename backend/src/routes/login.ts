import { Router } from "express"
import { Request, Response } from "express"
import argon2 from "argon2"
import { AppDataSource } from "../initializers/data-source"
import { User } from "../models/User"
import { upload } from "../services/multer-config"

const router: Router = Router()


router.post('/', upload.none(), async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
        
        const userRepository = AppDataSource.getRepository(User)
        
        const user = await userRepository.findOne({where: {email: email}})
        if (user) {
            if (await argon2.verify(user.password, password)) {

                return res.status(200).json({
                    data: {userId: user.id, isAdmin: user.isAdmin},
                    message: "Login successfull",
                    success: true}
                )
            }
        }

        return res.status(401).json({message: 'Invalid Credentials', success: false})

    } catch (error) { console.log(error) }
})


export default router