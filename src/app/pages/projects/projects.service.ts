import { Injectable } from "@angular/core";

export interface Project {
  title: string;
  description: string;
  url: string;
  gif?: string;
}

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  projects = [
    {
      title: "Angular CRUD",
      description:
        "Angular CRUD app powered by Angular Material and JSON.Server. Load, create, update and delete products.",
      url: "https://github.com/mrChernicharo/angular-crud",
      // gif: gif5,
    },
    {
      title: "GoMarketplace",
      description:
        "Ecommerce-like Mobile App. Written in Typescript, using React Native and Android Studio. Just add products to the Cart and let's go shopping!",
      url: "https://github.com/mrChernicharo/goMarketplace",
      // gif: gif3,
    },
    {
      title: "I-Recipe",
      description:
        "Complete App covering most of Angular's features: Authenticate, create recipes, store and fetch them from the backend. Using different techniques like Services/Subjects and also NgRx Reducers, Actions and Effects. Strorage and Authentication provided by Firebase APIs integration.",
      url: "https://github.com/mrChernicharo/iRecipe",
      // gif: gif4,
    },
    {
      title: "Ecoleta",
      description:
        "React Native Mobile App. Written in Typescript, using Expo. Geolocation and zipcode services provided by API integration!",
      url: "https://github.com/mrChernicharo/goMarketplace",
      // gif: gif6,
    },
    {
      title: "Mosquito Killer",
      description:
        "Python3/pygame project made for the Introduction to Software Development class in the Software Analysis and Developmet graduation course at UNIGRANRIO University",
      url: "https://www.github.com/mrChernicharo/pygame-pca",
      // gif: gif0,
    },
    {
      title: "Car Rush",
      description:
        "My first game! Build with Python3 and pygame! Try to stay alive by dodging furious cars that really don't seem to care if you're in their way!",
      url: "https://www.github.com/mrChernicharo/car-rush",
      // gif: gif2,
    },
    {
      title: "App Lista Tarefas",
      description:
        "Task list App. Written in Php. Create, update, delete and check your tasks! Just type your chores in and never again you'll miss an appointment. Get organized! Make a list!",
      url: "https://www.github.com/mrChernicharo/app-lista-tarefas",
      // gif: gif1,
    },
    // { title: '', description:'', gif: gif3 },
  ];

  constructor() {}
}
