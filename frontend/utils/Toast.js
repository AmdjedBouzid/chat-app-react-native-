// Import Toast
import Toast from "react-native-toast-message";
const showErrorToast = (message) => {
  Toast.show({
    type: "error",
    text1: "Error!",
    text2: message || "Something went wrong.",
  });
};

const showSuccessToast = (message) => {
  Toast.show({
    type: "success",
    text1: "Success!",
    text2: message || "Logged in successfully.",
  });
};

const ToastUtils = { showErrorToast, showSuccessToast };

export default ToastUtils;
