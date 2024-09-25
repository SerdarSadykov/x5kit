import {ArrowLeft} from './ArrowLeft';
import {ArrowRight} from './ArrowRight';
import {ArrowProps} from './types';

export const Arrow: React.FC<ArrowProps> = props => (
  <div>
    <ArrowLeft {...props} />
    <ArrowRight {...props} />
  </div>
);
