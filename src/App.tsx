import { useMemo , useState } from 'react';
import { AppContainer, Divider, H2, Section } from './styled';
import RoleFilter from './components/RoleFilter';
import CustomerList from './components/CustomerList';
import useCustomers from './data/useCustomers';
import { AdjustRoleCasing } from './utils/AdjustRoleCasing';

function App() {

  // useState used to track which user type been selected
  const [role, setRole] = useState<'ADMIN' | 'MANAGER'>('ADMIN');

  // Hook to fetch all customers from the GraphQL API
  // Gets customers, loading/error states, and a refetch function
  const { customers, loading, error, refetch } = useCustomers();

  // Memoized filter to only show customers matching the selected role
  // Recomputes only when 'customers' or 'role' changes
  const customerItems = useMemo(() => {
    const items = customers ?? [];
    return items.filter((c) => c.role === role);
  }, [customers, role]);

  return (
    <AppContainer>
      <Divider />
      <Section>
        <H2>User Types</H2>
        <RoleFilter value={role} onChange={setRole} />
      </Section>
      <Divider />
      <Section>
        <H2>{AdjustRoleCasing(role)} Users</H2>
        {loading && <div>Loading customers…</div>}
        {error && (
          <div role="alert">
            Error: {error} <button onClick={() => refetch()}>Retry</button>
          </div>
        )}
        {!loading && !error && <CustomerList customers={customerItems} />}
      </Section>
      <Divider />
    </AppContainer>
  );
}

export default App;
