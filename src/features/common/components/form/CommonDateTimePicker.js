import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ViewPropTypes } from 'react-native';
import DatePicker from 'react-native-datepicker';
import themeVariables from '../../../../../native-base-theme/variables/platform';

class CommonDateTimePicker extends React.PureComponent {
    render () {
        const { input, ...inputProps } = this.props;

        return (
            <DatePicker
                {...inputProps}
                ref={(ref) => this.dataPickerRef = ref}
                placeholder={this.props.placeholder}
                confirmBtnText={this.props.confirmText}
                cancelBtnText={this.props.cancelText}
                onDateChange={(value) => input.onChange(value)}
                date={input.value}
                mode={this.props.mode}
                showIcon={false}
                style={themeVariables.combineStyles(styles.datePicker, inputProps.style)}
                customStyles={{
                    dateInput: [styles.dateInputStyle, this.props.dateInputStyle],
                    placeholderText: {
                        fontSize: themeVariables.inputFontSize,
                        color: this.props.placeholderColor
                    },
                    dateText: {
                        fontSize: themeVariables.inputFontSize,
                        color: this.props.dateTextColor
                    },
                }}
            />
        )
    }
}

CommonDateTimePicker.propTypes = {
    input: PropTypes.object,
    icon: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    mode: PropTypes.string,
    displayIcon: PropTypes.bool,
    dateInputStyle: ViewPropTypes.style,
    dateTextColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    elementStyleIcon: ViewPropTypes.style,
    colorIcon: PropTypes.string
};

CommonDateTimePicker.defaultProps = {
    input: {},
    icon: undefined,
    required: false,
    placeholder: undefined,
    confirmText: 'เลือก',
    cancelText: 'ปิด',
    mode: 'date',
    displayIcon: true,
    dateInputStyle: {},
    dateTextColor: themeVariables.textColor,
    placeholderColor: themeVariables.inputColorPlaceholder,
    elementStyleIcon: {},
    colorIcon: themeVariables.black
};

const styles = StyleSheet.create({
    datePicker: {
        flex: 1,
        width: '100%',
    },
    dateInputStyle: {
        borderRadius: themeVariables.inputBorderRadius,
        borderWidth: themeVariables.inputBorderWidth,
        alignItems: 'flex-start',
        paddingLeft: 14,
        borderColor: themeVariables.inputBorderColor
    },
});

export default CommonDateTimePicker;
