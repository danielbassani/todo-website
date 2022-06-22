export class Todo {
    title: string;
    description?: string = "";
    isCompleted?: boolean = false;

    constructor(title:string, description?:string, isCompleted?:boolean) {
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
    }
}