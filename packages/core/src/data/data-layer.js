export class DataLayer {
  static instance;

  static getInstance(store) {
    if (!DataLayer.instance) {
      DataLayer.instance = store;
    }
    return DataLayer.instance;
  }
}

export async function setFlowConfig(flowConfig) {
  await DataLayer.instance.setData('flowConfig', JSON.stringify(flowConfig));
}

export async function getFlowConfig() {
  return JSON.parse(await DataLayer.instance.getData('flowConfig'));
}
