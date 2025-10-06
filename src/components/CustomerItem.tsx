import styled from 'styled-components';
import type { Customer } from '../data/useCustomers';

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
  font-weight: 600;
  margin-bottom: 8px;
`;

const Role = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

type Props = { customer: Customer };

const CustomerItem = ({ customer }: Props) => {
  const letter = (customer?.name ?? customer?.email ?? '?').trim().charAt(0).toUpperCase();
  return (
    <Row aria-label="customer-row">
      <Avatar>{letter || '•'}</Avatar>
      <div>
        <Name>{customer?.name ?? '-'}</Name>
        <Role>{customer?.role ?? ''}</Role>
      </div>
    </Row>
  );
}

export default CustomerItem;
