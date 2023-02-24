export const EditStatList = [
  { key: 5, text: 'passed' },
  { key: 1, text: 'cancelled' },
  { key: 2, text: 'pending' },
  { key: 3, text: 'Failed' },
  { key: 4, text: 'anchor to be confirmed' },
  { key: 6, text: 'anchor refused' },
  { key: 'null', text: 'all' },
];

export const PayType = [
  { key: 0, text: 'No base salary' },
  { key: 1, text: 'Basic salary' },
  { key: 'null', text: 'all' },
];

export const Columns = [
  {
    prop: 'id',
    label: 'Agency ID',
    width: '100',
  },
  {
    prop: 'labelName',
    label: 'Agency name',
    width: '140',
  },
  {
    prop: 'memberId',
    label: 'Member ID',
    width: '120',
  },
  {
    prop: 'nickName',
    label: 'Name',
  },
  {
    prop: 'img',
    label: 'Avatar',
    width: '110',
    slot: true,
  },
  {
    prop: 'infoUrl1',
    label: 'Screenshots',
    width: '120',
    slot: true,
  },
  {
    prop: 'audioUrl',
    label: 'Audio',
    width: '200',
    slot: true,
  },
  {
    prop: 'videoUrl',
    label: 'Video',
    width: '200',
    slot: true,
  },
  {
    prop: 'editStat',
    label: 'Account Status',
    width: '140',
    slot: true,
  },
  {
    prop: 'payType',
    label: 'member type',
    width: '120',
    slot: true,
  },
  {
    prop: 'operation',
    label: 'Operation',
    width: '120',
    slot: true,
  },
];
