import { toast } from "react-toastify";
import { Result } from "../../results/Result";
import { ToastError } from "./ToastError";
import { ToastSuccess } from "./ToastSuccess";
import { connect, useDispatch } from "react-redux";
import { setIsUserLoggedIn } from "../../features/slices/userSlice";
import React, { useEffect, useState } from "react";

export const ResolveResult = (result: any) => {
    console.log("resolveresult enter")
    const dispatch = useDispatch();
    const data = result.data
    dispatch(setIsUserLoggedIn(true))
    ToastSuccess(data.message)
    dispatch(setIsUserLoggedIn(true))
}

export function ResolveResultx(result: any) {


    // const data = result.data
    // const dispatch = useDispatch();

    // if (data.success) {
    //     ToastSuccess(data.message)
    //     if (data.hasOwnProperty('jwt')) {
    //         dispatch(setUserLoggedIn(true))
    //     }
    // } else {
    //     ToastError(data.message)
    // }


    //----

    //BURADA INVALID HOOK CALL OLUŞUYOR BUNU NASIL ÇÖZEBİLİRSİN BAK. BURAYI ÇÖZERSEN OK GİBİ
    // amaç : burda login olmaya çalışırken success:true gelirse redux taki isUserLoggedIn i true ya çek
    // ve youtbedaki adam gibi localStorage da sakla gelen response u
    //https://legacy.reactjs.org/docs/hooks-custom.html

    const shouldDispatch = true;
    const dispatch = useDispatch();
    useEffect(() => {
        const data = result.data
        dispatch(setIsUserLoggedIn(true))
        if (data.success) {
            console.log("yuppi")
            ToastSuccess(data.message)
            console.log("x")
            console.log(data.hasOwnProperty('jwt'))
            if (data.hasOwnProperty('jwt')) {

                dispatch(setIsUserLoggedIn(true))
            }
        } else {
            ToastError(data.message)
        }
    }, [shouldDispatch, dispatch]);
}
