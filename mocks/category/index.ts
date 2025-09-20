import { MaterialIconsEnum } from "@/enums/MaterialIconsEnum";
import { Category } from "@/interfaces/category";

export const categories: Category[] = [
    { id: "1", name: "Business", icon: MaterialIconsEnum.BUSINESS },
    { id: "2", name: "Entertainment", icon: MaterialIconsEnum.MOVIE },
    { id: "3", name: "Health", icon: MaterialIconsEnum.HEALTH_AND_SAFETY },
    { id: "4", name: "Science", icon: MaterialIconsEnum.SCIENCE },
    { id: "5", name: "Sports", icon: MaterialIconsEnum.SPORTS },
    { id: "6", name: "Technology", icon: MaterialIconsEnum.COMPUTER },
];