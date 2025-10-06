import { useMemo , useState } from 'react';
import { AppContainer, Divider, H2, Section } from './styled';
import RoleFilter from './components/RoleFilter';
import CustomerList from './components/CustomerList';
import useCustomers from './data/useCustomers';


function App() {

  const [role, setRole] = useState<'ADMIN' | 'MANAGER'>('ADMIN'); // default Admin per design
  const { customers, loading, error, refetch } = useCustomers();

  const visible = useMemo(() => {
    const items = customers ?? [];
    return items.filter((c) => c.role === role);
  }, [customers, role]);

  const AdjustRoleCasing = (text: "ADMIN" | "MANAGER") => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }


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
        {!loading && !error && <CustomerList customers={visible} />}
      </Section>
      <Divider />
    </AppContainer>
  );
}

export default App;
