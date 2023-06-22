import { useGetSelectElementSocialActivityTypesQuery } from "../../features/api/socialActivityTypeApi";
import { SocialActivityTypeSelectElement } from "../../models/frontdtos/SocialActivityTypeSelectElement";
import { DataResult } from "../../results/DataResult";

export function GetSocialActivityTypeSelectElements() {
    const { data: selectElementSocialActivityTypes } = useGetSelectElementSocialActivityTypesQuery();
    const selectElementSocialActivityTypesAsDataResult: DataResult<SocialActivityTypeSelectElement[]> = selectElementSocialActivityTypes as DataResult<SocialActivityTypeSelectElement[]>;
    const socialActivityTypeSelectElementList: SocialActivityTypeSelectElement[] = (selectElementSocialActivityTypesAsDataResult?.data) as SocialActivityTypeSelectElement[];

    return socialActivityTypeSelectElementList;
}