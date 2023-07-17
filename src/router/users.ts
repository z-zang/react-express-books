import { getAllUsers } from "../controllers/users";
import { isAuthenticated } from "../middleware";
import { Router } from "express";

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers)
} 