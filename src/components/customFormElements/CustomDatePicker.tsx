import { useField } from "formik";
import { Form } from "react-bootstrap";

import { useState } from "react";
import { Calendar } from "primereact/calendar";



const CustomDatePicker = ({ label, ...props }: any) => {
  const [dateTime24h, setDateTime24h] = useState(new Date());

  const [field, meta] = useField(props);
  return (
    <>
         
      

<Form.Group className="mt-3" style={{width:"70%", margin:"auto"}}>
        <Form.Label style={{fontSize: "18px", marginRight:"100%", width: "30%", textAlign:"left"}}>{label}</Form.Label>
        <Calendar style={{width:"100%"}} value={dateTime24h} onChange={(e) => {
        setDateTime24h(e.value as Date)
      }
      } showTime hourFormat="24" />
        {meta.touched && meta.error &&
          // if error happens
          <Form.Text className="text-danger error invalid" style={{fontSize: "16px"}}>
            {meta.error}
          </Form.Text>

        }
      </Form.Group>

    </>
  );
};
export default CustomDatePicker;
