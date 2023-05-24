import React from 'react'
import { useGetCurrentUserProfileQuery } from '../../features/api/userApi';
import { DataResult } from '../../results/DataResult';
import { User } from '../../models/base/User';

export default function Profile() {


    const { data: userData, isLoading, error } = useGetCurrentUserProfileQuery();
    const userDataResult: DataResult<User> = userData as DataResult<User>;
    const user: User = (userDataResult?.data) as User;
    if(userDataResult?.success == false){
        return(
            <div className='mt-5' style={{ border: "1px solid black", borderRadius: "1em", height: "30vh", display:"flex", justifyContent: "center" }}>
               <h1 style={{ alignSelf: "center" }}>
               Unauthorized Request! Please Contact your Manager!
               </h1>
            </div>
        )
    }
    
    
  



    return (
        <div className='mt-3' style={{ border: "1px solid black", borderRadius: "1em", padding: "2em" }}>
            <h1>My Profile</h1>
            {/* BURADA EMPLOYEE UPDATE VE USER UPDATE SAYFASI OLCAK  */}
            {JSON.stringify(user)}
        </div>

    );
}
