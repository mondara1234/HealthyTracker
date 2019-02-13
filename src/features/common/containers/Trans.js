/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import th from '../../../i18n/locales/th';
import en from '../../../i18n/locales/en';
import { DEFAULT_LOCALE } from '../../../common/constants';
import CommonText from '../components/CommonText';

I18n.fallbacks = true;
I18n.translations = {th, en};
I18n.defaultLocale = DEFAULT_LOCALE;
//I18n.locale = 'en';
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
        const {user} = this.props.Users ;
        const Language = user.map((data) => {return data.Language});
        I18n.locale = `${Language}`;
        return <CommonText {...this.props} text={I18n.t(this.props.t, this.props.replace)} />
    }
}

function mapStateToProps(state) {
    return{
        Users: state.dataUser
    };
}

export default connect(
    mapStateToProps,
)(Trans);

