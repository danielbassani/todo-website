export class Todo {
    title: string;
    isCompleted?: boolean = false;

    constructor(title:string, isCompleted?:boolean) {
        this.title = title;
        this.isCompleted = isCompleted;
    }
}