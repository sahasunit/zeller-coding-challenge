import styled from 'styled-components';
import { List } from '../styled';
import CustomerItem from './CustomerItem';
import type { Customer } from '../data/useCustomers';

const Empty = styled.div`
  padding: 12px;
  color: #6b7280;
`;

type Props = {
  customers: Customer[];
};

const CustomerList = ({ customers }: Props) => {
    
  if (!customers?.length) return <Empty>No customers found.</Empty>;

  console.log("customers:", customers);

  return (
    <List>
      {customers.map((c) => (
        <CustomerItem key={c.id} customer={c} />
      ))}
    </List>
  );
}

export default CustomerList;
