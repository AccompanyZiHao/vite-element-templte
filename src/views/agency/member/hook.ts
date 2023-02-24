import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { queryMemberById, cancelled } from '@/api/agency/member';
import { http } from '@/utils/http';

export const useMemberIdQuery = () => {
  const state = reactive({
    name: '',
    avatar: '',
    loading: false,
  });

  function getQueryMemberById(userId: number) {
    state.loading = true;
    if (!userId) return;
    http
      .get(queryMemberById, { params: { userId } })
      .then(({ code, detail }) => {
        if (code === 1) {
          state.name = detail.name;
          state.avatar = detail.avatar;
        }
        state.loading = false;
      })
      .catch(() => (state.loading = false));
  }

  function resetQuery() {
    state.name = '';
    state.avatar = '';
    state.loading = false;
  }

  return {
    state,
    getQueryMemberById,
    resetQuery,
  };
};

export const useCancel = (dialogRef) => {
  const cancelForm = reactive({
    reason: '',
    id: '',
  });

  function onSubmit(fn) {
    http.postForm(cancelled, cancelForm).then(({ code }) => {
      if (code === 1) {
        dialogRef.value.show(false);
        ElMessage.success('cancelled successfully!');
        fn({ page: 1 });
      }
    });
  }
  function onCancel(row) {
    cancelForm.id = row.id;
    dialogRef.value.show(true);
  }
  return {
    cancelForm,
    onSubmit,
    onCancel,
  };
};
