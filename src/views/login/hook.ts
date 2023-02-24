import { reactive, ref, unref } from 'vue';
import { http } from '@/utils/http/index';
import { captcha, login } from '@/api/login';
import { ElMessage, FormInstance } from 'element-plus';
import { ResponseCaptchaType, ResponseLoginType } from '@/type/login';
import { useLoginStore } from '@/store/login';

let c = '';
const { setToken } = useLoginStore();
// 登陆
export const useLogin = (router) => {
  const formRef = ref<FormInstance>();

  const form = reactive({
    username: '',
    pwd: '',
    code: '',
  });
  const loading = ref<boolean>(false);
  const rules = {
    username: [
      {
        required: true,
        message: 'Please input username',
        trigger: 'blur',
      },
    ],
    pwd: [
      {
        required: true,
        message: 'Please input pwd',
        trigger: 'blur',
      },
    ],
    code: [
      {
        required: true,
        message: 'Please input code',
        trigger: 'blur',
      },
    ],
  };
  function onSubmit(getCaptcha) {
    router.push('/member');
    return;
    formRef.value.validate((valid) => {
      if (valid) {
        loading.value = true;
        http
          .post<ResponseLoginType>(login, unref(form), {
            headers: {
              c,
            },
          })
          .then((data) => {
            loading.value = false;
            if (data.code === 1) {
              setToken(data.token);
              ElMessage.success('login successfully!');
              setTimeout(() => {
                // router.push('/member');
              }, 500);
            } else if (data.code === 4002121) {
              getCaptcha();
            }
          })
          .catch(() => (loading.value = false));
      }
    });
  }

  return {
    form,
    formRef,
    rules,
    onSubmit,
    loading,
  };
};
// 验证码
export const useCaptcha = () => {
  const captchaSrc = ref('');
  function getCaptcha() {
    // http.get<ResponseCaptchaType>(`${captcha}?${+new Date()}`).then((data) => {
    //   if (data.code === 1) {
    //     captchaSrc.value = 'data:image/png;base64,' + data.i;
    //     c = data.v;
    //   }
    // });
  }

  getCaptcha();

  return { captchaSrc, getCaptcha };
};
