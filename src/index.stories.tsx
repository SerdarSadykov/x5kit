/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Meta} from '@storybook/react/*';

import badgeMeta, {Badge} from './badge/Badge.stories';
import badgeDotMeta, {BadgeDot} from './badge/BadgeDot.stories';
import bannerMeta, {Banner, WithAction, WithActionNewLine} from './banner/Banner.stories';
import buttonMeta, {Button} from './button/Button.stories';
import iconButtonMeta, {IconButton} from './button/IconButton.stories';
import calendarMeta, {Calendar} from './calendar/Calendar.stories';
import rangeCalendarMeta, {RangeCalendar} from './calendar/RangeCalendar.stories';
import captionMeta, {Caption} from './caption/Caption.stories';
import checkboxMeta, {Checkbox} from './checkbox/Checkbox.stories';
import checkboxTreeMeta, {CheckboxTree} from './checkboxTree/CheckboxTree.stories';
import chipMeta, {Chip} from './chip/Chip.stories';
import datepickerMeta, {Datepicker} from './datepicker/Datepicker.stories';
import rangeDatepickerMeta, {RangeDatepicker} from './datepicker/RangeDatepicker.stories';
import dropdownMeta, {Dropdown} from './dropdown/Dropdown.stories';
import fileUploaderMeta, {FileUploader} from './fileUploader/FileUploader.stories';
import iconsMeta, {Icons} from './icons/Icons.stories';
import inputMeta, {Input, MasketInput} from './input/Input.stories';
import linkMeta, {Link} from './link/Link.stories';
import loaderMeta, {Loader} from './loader/Loader.stories';
import modalMeta, {Modal, ModalPopup} from './modal/Modal.stories';
import passwordInputMeta, {PasswordInput} from './passwordInput/PasswordInput.stories';
import radioMeta, {Radio} from './radio/Radio.stories';
import searchInputMeta, {SearchInput} from './searchInput/SearchInput.stories';
import segmentedControlMeta, {SegmentedControl} from './segmentedControl/SegmentedControl.stories';
import selectMeta, {Select, SelectFetch, SelectTree, SelectVirtualized} from './select/Select.stories';
import snackbarMeta, {Snackbar} from './snackbar/Snackbar.stories';
import sidebarMeta, {SidebarMenu} from './sidebarMenu/SidebarMenu.stories';
import switchMeta, {Switch} from './switch/Switch.stories';
import tabsMeta, {Tabs, TabList} from './tabs/Tabs.stories';
import textareaMeta, {Textarea} from './textarea/Textarea.stories';
import tooltipMeta, {Tooltip} from './tooltip/Tooltip.stories';
import typographyMeta, {Typography} from './typography/Typography.stories';

export const All: React.FC = () => {
  return (
    <div style={{position: 'relative'}}>
      <SidebarMenu {...(sidebarMeta.args as any)} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          paddingLeft: 70,
          maxHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <div>
          <Typography variant="h2">Все компоненты</Typography>
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Badge
          </Typography>
          <Badge {...badgeMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            BadgeDot
          </Typography>
          <BadgeDot {...badgeDotMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Banner
          </Typography>
          <Banner {...bannerMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Banner with action
          </Typography>
          <Banner {...WithAction.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Banner with action new line
          </Typography>
          <Banner {...WithActionNewLine.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Button
          </Typography>
          <Button {...(buttonMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            IconButton
          </Typography>
          <IconButton {...(iconButtonMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Calendar
          </Typography>
          <Calendar {...(calendarMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            RangeCalendar
          </Typography>
          <RangeCalendar {...(rangeCalendarMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Caption
          </Typography>
          <Caption {...captionMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Checkbox
          </Typography>
          <Checkbox {...checkboxMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            CheckboxTree
          </Typography>
          <CheckboxTree {...(checkboxTreeMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Chip
          </Typography>
          <Chip {...chipMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Datepicker
          </Typography>
          <Datepicker {...(datepickerMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            RangeDatepicker
          </Typography>
          <RangeDatepicker {...(rangeDatepickerMeta.args as any)} />
        </div>
        <div>
          <Typography as="h2" variant="h2">
            Dropdown
          </Typography>
          <Dropdown {...(dropdownMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            FileUploader
          </Typography>
          <FileUploader {...(fileUploaderMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Input
          </Typography>
          <Input {...(inputMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Input + mask
          </Typography>
          <Input {...(MasketInput.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Link
          </Typography>
          <Link {...linkMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Loader
          </Typography>
          <Loader {...loaderMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Modal
          </Typography>
          <Modal {...(modalMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Modal Popup
          </Typography>
          <Modal {...(ModalPopup.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            PasswordInput
          </Typography>
          <PasswordInput {...(passwordInputMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Radio
          </Typography>
          <Radio {...radioMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            SearchInput
          </Typography>
          <SearchInput {...(searchInputMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            SegmentedControl
          </Typography>
          <SegmentedControl {...(segmentedControlMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Select
          </Typography>
          <Select {...(selectMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Select tree
          </Typography>
          <Select {...(SelectTree.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Select + async fetch options
          </Typography>
          <SelectFetch {...(selectMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Select + async fetch options
          </Typography>
          <Select {...(SelectVirtualized.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Snackbar
          </Typography>
          <Snackbar {...(snackbarMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Switch
          </Typography>
          <Switch {...switchMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Tabs
          </Typography>
          <Tabs {...(tabsMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Tabs Panel
          </Typography>
          <TabList {...(tabsMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Textarea
          </Typography>
          <Textarea {...(textareaMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Tooltip
          </Typography>
          <Tooltip {...(tooltipMeta.args as any)} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Typography
          </Typography>
          <Typography {...typographyMeta.args} />
        </div>
        <div style={{borderTop: '1px solid #ccc'}}>
          <Typography as="h2" variant="h2">
            Icons
          </Typography>
          <Icons {...iconsMeta.args} />
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof All> = {
  title: 'All',
  component: All,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
