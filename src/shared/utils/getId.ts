import {nanoid} from "nanoid";

export const getId = (prefix: string = '') => {
    return `${prefix}${nanoid()}`
}