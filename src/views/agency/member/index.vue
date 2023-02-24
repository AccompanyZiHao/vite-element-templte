<template>
  <div>
    <el-form
      class="search-form"
      :model="form"
      ref="formRef"
      label-width="auto"
      :inline="true"
    >
      <el-form-item>
        <el-button type="primary" @click="getData()" style="width: 100px"
          >search</el-button
        >
      </el-form-item>
    </el-form>

    <gcTable
      :columns="Columns"
      :table-data="state"
      @sizeChange="setPageSize"
      @currentChange="setCurrentPage"
    >
      <template #operation="{ row }">
        <el-button
          type="warning"
          size="small"
          @click="onCancel(row)"
          v-if="row.editStat === 5"
          >Cancel</el-button
        >
      </template>
    </gcTable>
    <gcDialog width="600px" ref="dialogRef" @confirm="onSubmit(getData)">
      <div>
        <h4>Are you sure to cancel a contract ?</h4>
        <gcUpload
          @change="(list) => upLoadChange('infoUrl1', list)"
          :limit="3"
        />
      </div>
    </gcDialog>
  </div>
</template>

<script setup lang="ts" name="member">
import type { FormInstance } from 'element-plus';
import gcDialog from '@/components/gc-dialog.vue';
import { reactive, ref } from 'vue';
import { memberList } from '@/api/agency/member';
import { useFetchList } from '@/hooks/useFetchList';
import { EditStatList, PayType, Columns } from './data';
import { useCancel } from './hook';
import gcUpload, { UploadListItem } from '@/components/gc-upload.vue';

const formRef = ref<FormInstance>(null);

// 搜索查询
const form = reactive({
  content: '',
  editStat: '',
  payType: '',
});
const { state, getData, setCurrentPage, setPageSize } = useFetchList(
  memberList,
  form
);

//  取消
const dialogRef = ref<InstanceType<typeof gcDialog> | null>(null);
const { cancelForm, onSubmit, onCancel } = useCancel(dialogRef);

const upLoadChange = (key: string, list: UploadListItem[]) => {
  console.log(key, list);
};
</script>

<style scoped>
h4 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
