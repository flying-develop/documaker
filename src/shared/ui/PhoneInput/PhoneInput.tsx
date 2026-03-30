import { FocusEvent } from 'react';
// eslint-disable-next-line import/no-named-default
import { default as InputPhone } from 'react-phone-input-2';
import 'react-phone-input-2/lib/plain.css';

import './flags.css';
import './PhoneInput.scss';

interface PhoneInputProps {
    inputRef: Record<string, any>;
    readOnly: boolean;
    name: string;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | undefined | null;
}

const PhoneInput = ({
    onChange,
    onBlur,
    inputRef,
    readOnly,
    name,
    value,
}: PhoneInputProps): JSX.Element => {
    return (
        <InputPhone
            containerClass="input-phone"
            placeholder="Phone"
            enableSearch
            disableSearchIcon
            searchPlaceholder=""
            onChange={(_value, _country, event: React.ChangeEvent<HTMLInputElement>) => {
                onChange(event);
            }}
            onBlur={(event) => {
                onBlur(event);
            }}
            value={value}
            inputProps={{
                readOnly,
                name,
                ref: inputRef,
                autoFocus: false,
            }}
        />
    );
};

export default PhoneInput;
