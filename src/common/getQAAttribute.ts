export type QA = {
  qa?: string;
};

export type RequiredQA = Required<QA>;

export const getQAAttribute = (rootName: string) => {
  return (subName?: string, state?: string[]): string => {
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
