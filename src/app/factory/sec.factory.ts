import { SECEvent } from "./sec-event.factory";
import { Group } from "./group.factory";
import { SECUser } from "./user.factory";

export class SEC {
    id : number;
    groups: Group[];

    events: SECEvent[];
    users: SECUser[];
    startDate: Date | string;
    endDate: Date | string;
}