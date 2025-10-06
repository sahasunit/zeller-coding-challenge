import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import RoleFilter from './components/RoleFilter';
import CustomerList from './components/CustomerList';
import { ListZellerCustomers } from './graphql/queries';
import awsconfig from './aws-exports';

/* LIVE ENDPOINT TEST */

const live = process.env.RUN_LIVE === '1' ? test : test.skip;

live(
    'LIVE: calls listZellerCustomers and returns items[]',
    async () => {
        const endpoint = awsconfig.aws_appsync_graphqlEndpoint;
        const apiKey = awsconfig.aws_appsync_apiKey;

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify({ query: ListZellerCustomers }),
        });

        expect(res.ok).toBe(true);
        const json = await res.json();

        expect(json).toHaveProperty('data.listZellerCustomers.items');
        const arr = json.data.listZellerCustomers.items;
        expect(Array.isArray(arr)).toBe(true);

        if (arr.length > 0) {
            const first = arr[0];
            expect(first).toHaveProperty('id');
            expect(first).toHaveProperty('name');
            expect(first).toHaveProperty('email');
            expect(first).toHaveProperty('role');
        }
    },
);

/* UNIT TESTING */

describe('RoleFilter (unit)', () => {
    test('toggles between Admin and Manager and calls onChange', () => {
        const onChange = jest.fn();
        render(<RoleFilter value="ADMIN" onChange={onChange} />);

        const admin = screen.getByLabelText('Admin') as HTMLInputElement;
        const manager = screen.getByLabelText('Manager') as HTMLInputElement;

        expect(admin.checked).toBe(true);
        expect(manager.checked).toBe(false);

        fireEvent.click(manager);
        expect(onChange).toHaveBeenCalledWith('MANAGER');
    });
});
  
describe('CustomerList (unit)', () => {
    test('shows empty state when no customers', () => {
      render(<CustomerList customers={[]} />);
      expect(screen.getByText(/No customers found/i)).toBeInTheDocument();
    });
  
    test('renders rows when customers exist', () => {
        const customers = [
            { id: '1', name: 'John Smith', email: 'john@x.com', role: 'Admin' },
            { id: '2', name: 'Adam Muller', email: 'adam@x.com', role: 'Admin' },
        ];
        render(<CustomerList customers={customers as any} />);
        const rows = screen.getAllByLabelText('customer-row');
        expect(rows.length).toBe(2);
        expect(screen.getByText('John Smith')).toBeInTheDocument();
        expect(screen.getByText('Adam Muller')).toBeInTheDocument();
    });
});