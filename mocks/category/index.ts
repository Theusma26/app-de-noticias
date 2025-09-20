import { MaterialIconsEnum } from "@/enums/MaterialIconsEnum";
import { Category } from "@/interfaces/category";

export const categories: Category[] = [
    { id: "1", name: "Business", icon: MaterialIconsEnum.Business },
    { id: "2", name: "Entertainment", icon: MaterialIconsEnum.Movie },
    { id: "3", name: "Health", icon: MaterialIconsEnum.HealthAndSafety },
    { id: "4", name: "Science", icon: MaterialIconsEnum.Science },
    { id: "5", name: "Sports", icon: MaterialIconsEnum.Sports },
    { id: "6", name: "Technology", icon: MaterialIconsEnum.Computer },
];