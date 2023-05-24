import { useField } from "formik";
import { Form } from "react-bootstrap";

const CustomSelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <>
    <Form.Group className="mt-3" style={{width:"70%", margin:"auto"}}>

    <Form.Label style={{fontSize: "18px", marginRight:"100%", width: "30%", textAlign:"left"}}>{label}</Form.Label>
      <Form.Select aria-label="Default select example"
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}>

      </Form.Select>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </Form.Group>
    
    </>
  );
};
export default CustomSelect;
