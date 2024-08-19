import {PropsWithChildren, useState} from 'react';

import {Banner} from 'banner';

export const Hint: React.FC<PropsWithChildren> = props => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen || !props.children) return null;

  const onClose = () => setIsOpen(false);

  return <Banner onClose={onClose} {...props} />;
};
