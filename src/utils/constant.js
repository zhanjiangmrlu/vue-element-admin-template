const keyValueFn = (arr) => {
  let keyVal = {};
  for (let i = 0; i < arr.length; i += 1) {
    keyVal = Object.assign(keyVal, { [arr[i].key]: arr[i].value });
  }
  return keyVal;
};

// 演练状态
export const rehearsalStateOptions = [
  {
    key: 0,
    value: "未开始",
  },
  {
    key: 1,
    value: "进行中",
  },
  {
    key: 2,
    value: "暂停中",
  },
  {
    key: 3,
    value: "已结束",
  },
];

export const rehearsalStateKeyValue = keyValueFn(rehearsalStateOptions);
