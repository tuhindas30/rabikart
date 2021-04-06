import { useToast } from "../contexts/toast-context";

const Toast = () => {
  const {
    toast: { addedOrRemoved, fromComponent },
  } = useToast();
  return (
    <div id="toast-contents" className="toast">
      <p>
        Product is {addedOrRemoved} My {fromComponent}
      </p>
    </div>
  );
};
export default Toast;
