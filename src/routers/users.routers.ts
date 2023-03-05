import { Router } from "express";

const usersRoutes: Router = Router();

usersRoutes.post("");
usersRoutes.get("");
usersRoutes.patch("/:id");
usersRoutes.delete("/:id");

export default usersRoutes;
