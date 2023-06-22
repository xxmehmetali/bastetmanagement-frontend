import { Priority } from "../../models/enums/Priority";
import { TaskStatus } from "../../models/enums/TaskStatus";

export class taskInitialValue {
    name: string;
    description: string;
    tags: string;
    taskStatus: TaskStatus;
    priority: Priority;
    assignedFrom: object;
    assignedTo: object;
    reviewer: object;
    context: object;

    constructor(
        name: string = "",
        description: string = "",
        tags: string = "",
        taskStatus: TaskStatus = TaskStatus.WAITING_FOR_INFO,
        priority: Priority = Priority.NOT_DECLARED,
        assignedFrom: object = { id: "" },
        assignedTo: object = { id: "" },
        reviewer: object = { id: "" },
        context: object = { id: "" }
    ) {
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.taskStatus = taskStatus;
        this.priority = priority;
        this.assignedFrom = assignedFrom;
        this.assignedTo = assignedTo;
        this.reviewer = reviewer;
        this.context = context;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            tags: this.tags,
            taskStatus: this.taskStatus,
            priority: this.priority,
            assignedFrom: this.assignedFrom,
            assignedTo: this.assignedTo,
            reviewer: this.reviewer,
            context: this.context
        };
    }
}