import {Caption as BaseCaption} from 'caption';

import {FileUploaderProps} from '../types';

type UploaderCaptionProps = Pick<FileUploaderProps, 'error' | 'caption' | 'absoluteCaption'>;

export const Caption: React.FC<UploaderCaptionProps> = ({error, caption, absoluteCaption}) => {
  const children = error && typeof error === 'string' ? error : caption;

  const captionProps = {  
    children,
    error: !!error,
    absolute: absoluteCaption,
  };

  return <BaseCaption {...captionProps} />
}