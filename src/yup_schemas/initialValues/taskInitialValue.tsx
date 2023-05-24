import { Priority } from "../../models/enums/Priority";
import { TaskStatus } from "../../models/enums/TaskStatus";

export const taskInitialValue = {
    name: "",
    description: "",
    tags: "",
    taskStatus: TaskStatus.WAITING_FOR_INFO,
    priority: Priority.NOT_DECLARED,
    assignedFrom:{
        id: ""
    },
    assignedTo: {
        id: ""
    },
    reviewer:{
        id: ""
    },
    context: {
        id: ""
    }
}