import React from 'react';
import AccountOpeningForm from '../../../../components/AccountOpening/AccountOpeningForm';


const RDOpening: React.FC = () => {
  return (
    <div style={{ marginTop: 8 }}>
      <AccountOpeningForm defaultAccountType="RD" title="Deposit" />
    </div>
  );
};

export default RDOpening;