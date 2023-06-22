
import { useGetSelectElementSocialActivitiesQuery } from "../../features/api/socialActivityApi";
import { SocialActivitySelectElement } from "../../models/frontdtos/SocialActivitySelectElement";
import { TaskSelectElement } from "../../models/frontdtos/TaskSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetSocialActivitySelectElements() {
    const { data: selectElementSocialActivities } = useGetSelectElementSocialActivitiesQuery();
    const selectElementSocialActivitiesAsDataResult: DataResult<SocialActivitySelectElement[]> = selectElementSocialActivities as DataResult<SocialActivitySelectElement[]>;
    const socialActivitySelectElementList: TaskSelectElement[] = (selectElementSocialActivitiesAsDataResult?.data) as TaskSelectElement[];

    return socialActivitySelectElementList;
}