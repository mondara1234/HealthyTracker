/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import th from '_src/i18n/locales/th';
import en from '_src/i18n/locales/en';
import { DEFAULT_LOCALE } from '_src/common/constants';
import CommonText from '../components/CommonText';

I18n.fallbacks = true;
I18n.defaultLocale = DEFAULT_LOCALE;
I18n.translations = {th, en};

class Trans extends React.PureComponent {
    static tran(key, replace) {
        return I18n.t(key, replace);
    }

    static propTypes = {
        t: PropTypes.string.isRequired,
        replace: PropTypes.object
    };

    static defaultProps = {
        replace: {}
    };

    render() {
        return <CommonText {...this.props} text={I18n.t(this.props.t, this.props.replace)} />
    }
}

export default Trans;
