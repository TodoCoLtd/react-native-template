
import { Toast } from 'teaset';

class ToastManager {

    static show = (text) => {
        Toast.show({
            text: text,
            option: Theme.toastOptions
        });
    }

}

export default ToastManager