import { DataSource } from "typeorm"
import { User } from "../models/User"
import { FitnessRecord } from "../models/FitnessRecord"
import { Activity } from "../models/Activity"
import { Recommendation } from "../models/Recommendation"
import { Group } from "../models/Group"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "fitness_tracker",
    synchronize: true,
    logging: false,
    entities: [
        User, FitnessRecord, Activity, Recommendation, Group
    ],
    subscribers: [],
    migrations: [],
})