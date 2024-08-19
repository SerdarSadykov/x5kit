import { InputProps } from '../Input/types'
import { SelectProps, SelectOption } from './types'

export const getDifferentProps = ({
  id,
  label,
  name,
  size,
  required,
  stretch,
  error,
  textError,
  disabled,
  noWrap,
  preMatching,
  renderDropDownContent,
  unborder,
  caption,
  isAbsoluteCaption,
  placement = 'bottom-start',
  dropdownWidth,
  header,
  footer,
  hint,
  width,
}: SelectProps): {
  inputProps: Partial<InputProps> & { label: InputProps['label'] }
  selectBaseProps: Partial<SelectProps>
  commonProps: Partial<SelectProps>
} => {
  const inputProps = { id, label, name, required, unborder, textError, size, caption, isAbsoluteCaption, width }
  const selectBaseProps = { noWrap, preMatching, renderDropDownContent, placement, dropdownWidth }
  const commonProps = { error, disabled, stretch, header, footer, hint }
  return { inputProps, selectBaseProps, commonProps }
}

export const filterOptions = (options: SelectOption[], value: string): SelectOption[] => {
  return options.filter((item) => item.name.toLowerCase().match(value.toLowerCase().trim()))
}
