export type QA = {
  qa?: string;
};

export type RequiredQA = Required<QA>;

export type GetQA = (subName?: string, state?: string[]) => string;

export const getQAAttribute = (rootName: string): GetQA => {
  return (subName, state) => {
    let name = rootName;

    if (subName) {
      name += `-${subName}`;
    }

    if (state?.length) {
      name += ':' + state.join(':');
    }

    return name;
  };
};
