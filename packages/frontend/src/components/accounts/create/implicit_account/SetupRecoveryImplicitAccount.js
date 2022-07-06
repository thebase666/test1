import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import { validateEmail } from '../../../../utils/account';
import RecoveryOption from '../../../accounts/recovery_setup/RecoveryOption';
import FormButton from '../../../common/FormButton';
import Container from '../../../common/styled/Container.css';
import Tooltip from '../../../common/Tooltip';

const StyledContainer = styled(Container)`
    &&& {
        button {
            margin-top: 50px;
            width: 100%;
        }
    
        h4 {
            margin-top: 40px;
            font-weight: 600;
            font-size: 15px;
            display: flex;
            align-items: center;
        }
    }
`;

export default ({
    onClickSecureMyAccount,
    email,
    isInitializingRecoveryLink,
    setEmail
}) => {
    const [recoveryOption, setRecoveryOption] = useState('phrase');
    const [emailIsInvalid, setEmailisInvalid] = useState(false);

    const isValidInput = () => {
        switch (recoveryOption) {
            case 'email':
                return validateEmail(email);
            case 'phrase':
                return true;
            case 'ledger':
                return true;
            default:
                return false;
        }
    };

    return (
        <StyledContainer className='small-centered border'>
            <form onSubmit={(e) => {
                onClickSecureMyAccount({
                    recoveryOption,
                    email
                });
                e.preventDefault();
            }}>
                <h1><Translate id='setupRecovery.header' /></h1>
                {/* <h2><Translate id='setupRecovery.subHeader' /></h2> */}
                {/* <h4>
                    <Translate id='setupRecovery.advancedSecurity' />
                    <Tooltip translate='profile.security.mostSecureDesc' icon='icon-lg' />
                </h4> */}
                <RecoveryOption
                    onClick={() => setRecoveryOption('phrase')}
                    option='phrase'
                    active={recoveryOption}
                />
                {/* <RecoveryOption
                    onClick={() => setRecoveryOption('ledger')}
                    option='ledger'
                    active={recoveryOption}
                /> */}
                {/* <h4>
                    <Translate id='setupRecovery.basicSecurity' />
                    <Tooltip translate='profile.security.lessSecureDesc' icon='icon-lg' />
                </h4>
                <RecoveryOption
                    onClick={() => setRecoveryOption('email')}
                    option='email'
                    active={recoveryOption}
                    problem={recoveryOption === 'email' && emailIsInvalid}
                >
                    <Translate>
                        {({ translate }) => (
                            <input
                                type='email'
                                placeholder={translate('setupRecovery.emailPlaceholder')}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailisInvalid(false);
                                }}
                                onBlur={() => setEmailisInvalid(email !== '' && !isValidInput())}
                                tabIndex='1'
                            />
                        )}
                    </Translate>
                </RecoveryOption> */}
                <FormButton
                    color='blue'
                    type='submit'
                    disabled={!isValidInput() || isInitializingRecoveryLink}
                    sending={isInitializingRecoveryLink}
                    trackingId='SR Click submit button'
                    data-test-id="submitSelectedRecoveryOption"
                >
                    <Translate id='button.secureMyAccount' />
                </FormButton>
            </form>
        </StyledContainer >
    );
};
