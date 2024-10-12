export type QA = {
  /** data-qa аттрибут */
  qa?: string;
};

export type RequiredQA = Required<QA>;

/** Helper работы с data-qa */
export const getQAAttribute = (rootName: string) => {
  return (subName?: string | number, state?: Record<string, boolean>): string => {
    let name = rootName;

    if (subName) {
      name += `-${subName}`;
    }

    if (state) {
      for (const item in state) {
        if (state[item] === true) {
          name += ':' + item;
        }
      }
    }

    return name;
  };
};
