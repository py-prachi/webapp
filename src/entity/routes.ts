import { UserController } from "./controller/UserController"

const AppRoutes: {
    method: "get" | "post" | "put" | "delete";
    route: string;
    controller: any; 
    action: string;
  }[] = [ {
    method: "post",
    route: "/api/webapp/login",
    controller: UserController,
    action: "save"
}]

export{AppRoutes};