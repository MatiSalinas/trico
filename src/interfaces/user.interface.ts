import { Auth } from "./auth.inteface";

export interface User extends Auth{
    name: string;
    description: string;
}