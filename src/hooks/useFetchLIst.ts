import { http } from '@/utils/http';
import { reactive, unref } from 'vue';
import { ResponseTableDataType } from '@/type/http';
import { formParams } from '@/utils/util';

/**
 *
 *
 * @param {string} url api 链接
 * @param {*} params 表单查询参数
 * @param {boolean} [autoLoad=true] 是否自动调用 getData
 * @return {*}
 */
export const useFetchList = (url: string, params: any, autoLoad = true) => {
  const state = reactive({
    loading: false,
    currentPage: 1,
    pageSize: 10,
    total: 0,
    data: [],
    sum: null,
  });
  function getData(externalPrams?: any) {
    let data = {
      page: state.currentPage,
      limit: state.pageSize,
      ...unref(params),
      ...unref(externalPrams),
    };

    state.loading = true;
    http
      .postForm<ResponseTableDataType>(url, formParams(data))
      .then((response) => {
        state.loading = false;
        if (response.code === 1) {
          state.data = response.page.list;
          state.currentPage = response.page.currPage;
          state.pageSize = response.page.pageSize;
          state.total = response.page.totalCount;
          state.sum = response.sum
        }
      })
      .catch(() => (state.loading = false));
  }
  autoLoad && getData();
  function setCurrentPage(page: number) {
    state.currentPage = page;
    getData();
  }
  function setPageSize(pageSize: number) {
    state.pageSize = pageSize;
    state.currentPage = 1;
    getData();
  }
  return {
    state,
    getData,
    setCurrentPage,
    setPageSize,
  };
};
