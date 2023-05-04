import { useField } from "formik";
import { Form } from "react-bootstrap";

const CustomInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Group className="mt-3" style={{width:"70%", margin:"auto"}}>
        <Form.Label style={{fontSize: "18px", marginRight:"100%", width: "30%", textAlign:"left"}}>{label}</Form.Label>
        <Form.Control {...props} {...field} />
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
export default CustomInput;
