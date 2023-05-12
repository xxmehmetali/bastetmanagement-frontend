
import React from 'react'

export default function MeetingPlatformAdd() {
  // const [addCorporation, { isLoading }] = useAddCorporationMutation();
  function onSubmit(values: any, actions: any) {
    // addCorporation(values)
    actions.resetForm();
  }
  return (
    <div>
      {/* <CorporationAddForm/> */}
      {/* <Calendar value={dateTime24h} onChange={(e) => setDateTime24h(e.value as Date)} showTime hourFormat="24" /> */}
      
    </div>
  );
}
