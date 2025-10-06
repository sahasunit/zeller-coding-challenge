import styled from 'styled-components';
import type { Customer } from '../data/useCustomers';
import { AdjustRoleCasing } from '../utils/AdjustRoleCasing';

const Row = styled.li`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 18px;
  padding: 18px;
  border-radius: 12px;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #e8f1fe;
  display: grid;
  place-items: center;
  font-weight: 600;
  color: #3b82f6;
`;

const Name = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const Role = styled.div`
  font-size: 12px;
  color: grey;
`;

type Props = { customer: Customer };

const CustomerItem = ({ customer }: Props) => {

  // Get the first letter for the Avatar block
  // prefers name -> falls back to email -> '?' if missing
  const letter = (customer?.name ?? customer?.email ?? '?').trim().charAt(0).toUpperCase();
  const role = customer?.role ? `${AdjustRoleCasing(customer.role)}` : '';
  
  return (
    <Row aria-label="customer-row">
      <Avatar>{letter || '•'}</Avatar>
      <div>
        <Name>{customer?.name ?? '-'}</Name>
        <Role>{role}</Role>
      </div>
    </Row>
  );
}

export default CustomerItem;
